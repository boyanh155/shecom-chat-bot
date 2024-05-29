import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { email, password } = body
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }
  } catch (err: any) {
    return NextResponse.json(
      { err },
      {
        status: err.statusCode || 500
      }
    )
  }
}
