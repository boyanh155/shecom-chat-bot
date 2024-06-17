export const maxDuration = 60
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const q = request.nextUrl.searchParams.get('q')
  try {
    if (!q)
      return NextResponse.json({ error: 'No query provided' }, { status: 400 })
    const result = await axios.post(
      `https://api.coze.com/open_api/v2/chat`,
      {
        bot_id: process.env.NEXT_PUBLIC_COZE_BOT_ID,
        query: q,
        user: 'LocLe1552001',
        stream: false
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_COZE_TOKEN}`,
          'Content-Type': 'application/json',
          Connection: 'keep-alive',
          Accept: '*/*'
        }
      }
    )
    //  NextResponse
    const data = result.data
    console.log(data.msg)
    if (data?.code == 702232007) throw new Error(data.msg)
    console.log(data)
    let response = data
    if (Array.isArray(data.messages)) {
      response = data.messages
        .filter((v: any) => v.type === 'answer' || v.type === 'follow_up')
        .map((v: any) => ({ ...v, content: v.content }))
    }

    return new NextResponse(response, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
      }
    })
  } catch (err: any) {
    return NextResponse.json(
      { err: err.message },
      {
        status: err.statusCode || 500
      }
    )
  }
}
