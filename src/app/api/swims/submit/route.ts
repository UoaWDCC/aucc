import { randomUUID } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'

import { SWIM_PHOTO_PREFIX } from '@/collections/_hooks/delete-swim-photo'
import { todayInNZ } from '@/lib/utils/nz-date'
import { clientIp } from '@/lib/utils/rate-limit'
import { validateSwimPhoto } from '@/lib/utils/swim-photo'
import {
  countRecentSwimsByEmail,
  createSwim,
  createSwimPhoto,
  deleteSwimPhoto,
} from '@/queries/swims'
import {
  EMAIL_LIMIT,
  EMAIL_WINDOW_MS,
  swimSubmitIpLimiter,
  TOO_MANY_SUBMISSIONS,
} from './rate-limit'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const PHOTO_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function asId(value: unknown): number | null {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
    return value
  }

  if (typeof value === 'string' && /^\d+$/.test(value.trim())) {
    return Number(value.trim())
  }

  return null
}

/**
 * The local API skips relationship validation, so a river ID that doesn't
 * exist reaches Postgres and fails as a foreign key violation (code 23503).
 * The driver error may arrive directly or as the cause of a wrapper.
 */
function isForeignKeyViolation(error: unknown): boolean {
  const codeOf = (value: unknown) =>
    typeof value === 'object' && value !== null
      ? (value as { code?: unknown }).code
      : undefined

  return (
    codeOf(error) === '23503' ||
    (typeof error === 'object' &&
      error !== null &&
      codeOf((error as { cause?: unknown }).cause) === '23503')
  )
}

function isTicked(value: unknown): boolean {
  return value === true || value === 'true' || value === 'on'
}

/**
 * The form posts multipart/form-data (so it can carry a photo). Plain JSON
 * is still accepted for submissions without a photo.
 */
async function readSubmission(
  request: NextRequest,
): Promise<{ fields: Record<string, unknown>; photo: File | null } | null> {
  const contentType = request.headers.get('content-type') ?? ''

  try {
    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData()
      const fields: Record<string, unknown> = {}
      let photo: File | null = null

      for (const [key, value] of form.entries()) {
        if (key === 'photo') {
          if (typeof value !== 'string' && value.size > 0) photo = value
        } else if (typeof value === 'string') {
          fields[key] = value
        }
      }

      return { fields, photo }
    }

    const body = await request.json()
    if (typeof body !== 'object' || body === null) return null
    return { fields: body as Record<string, unknown>, photo: null }
  } catch {
    return null
  }
}

function validateSubmission(
  source: Record<string, unknown>,
  photo: File | null,
) {
  const errors: Record<string, string> = {}

  const memberName = asString(source.memberName)
  const date = asString(source.date)
  const tripName = asString(source.tripName)
  const email = asString(source.email)
  const river = asId(source.river)

  if (!memberName) {
    errors.memberName = 'Member name is required'
  } else if (memberName.length < 2) {
    errors.memberName = 'Member name must be at least 2 characters'
  }

  if (!date) {
    errors.date = 'Date is required'
  } else if (Number.isNaN(new Date(date).getTime())) {
    errors.date = 'Date is not a valid date'
  } else if (date.slice(0, 10) > todayInNZ()) {
    errors.date = 'Date cannot be in the future'
  }

  if (!tripName) {
    errors.tripName = 'Trip name is required'
  }

  if (river === null) {
    errors.river = 'River is required and must be a valid river ID'
  }

  if (!email) {
    errors.email = 'Email is required'
  } else if (!emailPattern.test(email)) {
    errors.email = 'Email is not a valid email address'
  }

  if (photo) {
    const photoError = validateSwimPhoto(photo, isTicked(source.photoConsent))
    if (photoError) errors.photo = photoError
  }

  return {
    errors,
    values: { memberName, date, tripName, river, email },
  }
}

function tooManySubmissions(retryAfterSeconds: number) {
  return NextResponse.json(
    { error: TOO_MANY_SUBMISSIONS },
    { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
  )
}

/**
 * Whether this email has already logged EMAIL_LIMIT swims within the window.
 * Counted in the database, so it holds across serverless instances. If the
 * count fails, let the submission through rather than block real members.
 */
async function emailOverLimit(email: string): Promise<boolean> {
  try {
    const since = new Date(Date.now() - EMAIL_WINDOW_MS)
    return (await countRecentSwimsByEmail(email, since)) >= EMAIL_LIMIT
  } catch (error) {
    console.error('Failed to count recent swims for rate limiting', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  // Checked first, before reading a body that may carry a photo
  const ipCheck = swimSubmitIpLimiter.check(clientIp(request.headers))
  if (!ipCheck.allowed) return tooManySubmissions(ipCheck.retryAfterSeconds)

  const submission = await readSubmission(request)

  if (!submission) {
    return NextResponse.json(
      { error: 'Request body must be valid JSON or form data' },
      { status: 400 },
    )
  }

  const { fields, photo } = submission

  // Spam trap: real users never see the honeypot input, so any value means a
  // bot. Reject before validating so bots learn nothing about the fields.
  const honeypot = fields.honeypot
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return NextResponse.json({ error: 'Submission rejected' }, { status: 400 })
  }

  const { errors, values } = validateSubmission(fields, photo)

  if (Object.keys(errors).length > 0 || values.river === null) {
    return NextResponse.json(
      { error: 'Invalid swim submission', fields: errors },
      { status: 400 },
    )
  }

  if (await emailOverLimit(values.email)) {
    return tooManySubmissions(Math.ceil(EMAIL_WINDOW_MS / 1000))
  }

  let photoId: number | null = null

  try {
    if (photo) {
      photoId = await createSwimPhoto(
        {
          data: Buffer.from(await photo.arrayBuffer()),
          mimetype: photo.type,
          // Never trust the uploaded file name. Random, so a photo awaiting
          // approval can't be found by guessing its URL.
          name: `${SWIM_PHOTO_PREFIX}${randomUUID()}.${PHOTO_EXTENSIONS[photo.type]}`,
          size: photo.size,
        },
        `${values.tripName} (${values.date})`,
      )
    }

    const swim = await createSwim({
      memberName: values.memberName,
      date: values.date,
      tripName: values.tripName,
      river: values.river,
      email: values.email,
      ...(photoId !== null ? { image: photoId } : {}),
    })

    return NextResponse.json({ swim }, { status: 201 })
  } catch (error) {
    const unknownRiver = isForeignKeyViolation(error)
    if (!unknownRiver) console.error('Failed to create swim', error)

    if (photoId !== null) {
      try {
        await deleteSwimPhoto(photoId)
      } catch (cleanupError) {
        console.error('Failed to remove orphaned swim photo', cleanupError)
      }
    }

    // The river is the only relationship the submitter controls, so this is
    // their mistake to fix, not a server fault.
    if (unknownRiver) {
      return NextResponse.json(
        {
          error: 'Invalid swim submission',
          fields: { river: 'That river does not exist' },
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { error: 'Could not save this swim. Please try again.' },
      { status: 500 },
    )
  }
}
