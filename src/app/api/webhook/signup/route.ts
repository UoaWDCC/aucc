import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
})

export async function POST(req: NextRequest) {
  const key = 'placeholder'
  if (req.headers.get('apikey') != key) {
    return NextResponse.json({ message: 'Incorrect apikey' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 })
    }
    console.log(body)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
  return NextResponse.json({ message: 'Success' }, { status: 200 })
}
