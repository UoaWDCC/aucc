import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/lib/payload'
import type { User } from '@/payload-types'

export type RequireAdminResult =
  | { ok: true; user: User }
  | { ok: false; response: NextResponse }

export async function requireAdmin(req: Request): Promise<RequireAdminResult> {
  try {
    const payload = await getPayloadClient()
    const { user } = await payload.auth({ headers: req.headers })

    if (user) {
      return { ok: true, user: user as User }
    }
  } catch {}
  return {
    ok: false,
    response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
  }
}
