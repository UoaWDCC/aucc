import { NextRequest, NextResponse } from 'next/server'

import { createSwim } from '@/queries/swims'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function validateSubmission(body: unknown) {
  const source = (body ?? {}) as Record<string, unknown>
  const errors: Record<string, string> = {}

  const memberName = asString(source.memberName)
  const date = asString(source.date)
  const tripName = asString(source.tripName)
  const email = asString(source.email)
  const river = asId(source.river)
  const image = asId(source.image)

  if (!memberName) {
    errors.memberName = 'Member name is required'
  } else if (memberName.length < 2) {
    errors.memberName = 'Member name must be at least 2 characters'
  }

  if (!date) {
    errors.date = 'Date is required'
  } else if (Number.isNaN(new Date(date).getTime())) {
    errors.date = 'Date is not a valid date'
  } else if (date.slice(0, 10) > todayISO()) {
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

  if (source.image !== undefined && source.image !== null && image === null) {
    errors.image = 'Image must be a valid media ID'
  }

  return {
    errors,
    values: { memberName, date, tripName, river, email, image },
  }
}

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Request body must be valid JSON' },
      { status: 400 },
    )
  }

  const { errors, values } = validateSubmission(body)

  if (Object.keys(errors).length > 0 || values.river === null) {
    return NextResponse.json(
      { error: 'Invalid swim submission', fields: errors },
      { status: 400 },
    )
  }

  try {
    const swim = await createSwim({
      memberName: values.memberName,
      date: values.date,
      tripName: values.tripName,
      river: values.river,
      email: values.email,
      ...(values.image !== null ? { image: values.image } : {}),
    })

    return NextResponse.json({ swim }, { status: 201 })
  } catch (error) {
    console.error('Failed to create swim', error)

    return NextResponse.json(
      { error: 'Could not save this swim. Please try again.' },
      { status: 500 },
    )
  }
}
