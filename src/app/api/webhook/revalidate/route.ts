import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const key = process.env.API_KEY
  if (req.headers.get('apikey') != key) {
    return NextResponse.json({ message: 'Incorrect apikey' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const path = body.path
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, path }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { revalidated: false, error: error },
      { status: 500 },
    )
  }
}
