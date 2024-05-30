export const maxDuration = 60
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import stream from 'stream'

export const POST = async (request: NextRequest) => {
  const q = request.nextUrl.searchParams.get('q')
  try {
    if (!q)
      return NextResponse.json({ error: 'No query provided' }, { status: 400 })
    console.log(process.env.COZE_TOKEN)
    console.log(process.env.COZE_BOT_ID)
   axios.post(
      `https://api.coze.com/open_api/v2/chat`,
      {
        bot_id: process.env.COZE_BOT_ID,
        query: q,
        user: 'LocLe1552001',
        stream: true
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COZE_TOKEN}`,
          'Content-Type': 'application/json',
          Connection: 'keep-alive',
          Accept: '*/*'
        },
        responseType: 'stream'
      }
    )
.then(streamResponse=>{
streamResponse.data.pipe(NextResponse)
}).catch(err=>{
   return NextResponse.json(
      { err },
      {
        status: err.statusCode || 500
      }
    )
})
    //  NextResponse

    // const data = result.data
    // let response = data
    // if (Array.isArray(data.messages)) {
    //   response = data.messages
    //     .filter((v: any) => v.type === 'answer' || v.type === 'follow_up')
    //     .map((v: any) => ({ ...v, content: v.content }))
    // }

 
   


    return new NextResponse("cook", {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
      }
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
