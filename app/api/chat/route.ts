
export const maxDuration = 60
import axios from 'axios'
import { nanoid } from 'nanoid'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const q = request.nextUrl.searchParams.get('q')
  try {
    if (!q)
      return NextResponse.json({ error: 'No query provided' }, { status: 400 })
    console.log(process.env.COZE_TOKEN)
    console.log(process.env.COZE_BOT_ID)
    const result = await axios.post(
      `https://api.coze.com/open_api/v2/chat`,
      {
        bot_id: process.env.COZE_BOT_ID,
        query: q,
        user: 'LocLe1552001',
        stream: false
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COZE_TOKEN}`,
          'Content-Type': 'application/json',
          Connection: 'keep-alive',
          Accept: '*/*'
        }
      }
    )
// console.log(result)s
    const data = result.data
    let response = data
    if (Array.isArray(data.messages)) {
      response = data.messages
        .filter((v: any) => v.type === 'answer' || v.type === 'follow_up')
        .map((v: any) => ({ ...v, content: v.content }))
    }
    return NextResponse.json(response, {
      status: 200
    })
  } catch (err: any) {
    return NextResponse.json(
      { err },
      {
        status: err.statusCode || 500
      }
    )
  }
}
