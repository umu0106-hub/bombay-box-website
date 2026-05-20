import { getSupabaseAdminClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      order_number: string
      customer_name: string
      customer_phone: string
      customer_email: string
      items: unknown[]
      subtotal: number
      tax: number
      total: number
      stripe_payment_intent_id: string
    }

    const supabase = getSupabaseAdminClient()
    if (!supabase) {
      console.warn('[save-order] Supabase not configured')
      return NextResponse.json({ success: true }) // Graceful degradation
    }

    const { error } = await supabase.from('orders').insert({
      order_number: body.order_number,
      customer_name: body.customer_name,
      customer_phone: body.customer_phone,
      customer_email: body.customer_email,
      items: body.items,
      subtotal: body.subtotal,
      tax: body.tax,
      total: body.total,
      stripe_payment_intent_id: body.stripe_payment_intent_id,
      status: 'received',
    })

    if (error) {
      console.error('[save-order]', error)
      return NextResponse.json(
        { error: 'Failed to save order' },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[POST /api/save-order]', err)
    return NextResponse.json(
      { error: 'Order save failed' },
      { status: 500 },
    )
  }
}
