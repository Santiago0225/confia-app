import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { opcion } = await req.json()

    if (!opcion) {
      return NextResponse.json({ error: 'Falta el campo opcion' }, { status: 400 })
    }

    const res = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/respuestas`,
      {
        method: 'POST',
        headers: {
          'apikey':        process.env.SUPABASE_SECRET_KEY!,
          'Authorization': `Bearer ${process.env.SUPABASE_SECRET_KEY}`,
          'Content-Type':  'application/json',
          'Prefer':        'return=minimal',
        },
        body: JSON.stringify({ opcion }),
      }
    )

    if (!res.ok) {
      const err = await res.text()
      console.error('Supabase error:', err)
      return NextResponse.json({ error: 'Error al guardar' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
