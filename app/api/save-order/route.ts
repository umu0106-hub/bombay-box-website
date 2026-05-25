/**
 * POST /api/save-order
 *
 * Persists a paid order to the Supabase `orders` table.
 * Called after a successful Stripe payment.
 *
 * Body shape:
 *   {
 *     orderNumber: string,
 *     customer: { name, phone, email },
 *     items: CartItem[],
 *     subtotal, tax, total: number,
 *     stripePaymentIntentId: string | null
 *   }
 *
 * Response:
 *   200 { ok: true, id: string }
 *   4xx/5xx { error: string }
 */

import { NextResponse } from 'next/server'
import { getSupabaseAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface RequestBody {
  orderNumber: string
  customer: {
    name: string
    phone: string
    email: string
  }
  items: Array<{
    id: string
    menuItemId: string
    name: string
    price: number
    quantity: number
    customizations?: unknown
  }>
  subtotal: number
  tax: number
  total: number
  stripePaymentIntentId: string | null
}

export async function POST(req: Request) {
  let body: RequestBody
  try {
    body = (await req.json()) as RequestBody
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 },
    )
  }

  /* Basic validation */
  if (!body.orderNumber || typeof body.orderNumber !== 'string') {
    return NextResponse.json(
      { error: 'orderNumber required' },
      { status: 400 },
    )
  }
  if (!body.customer?.name || !body.customer?.phone || !body.customer?.email) {
    return NextResponse.json(
      { error: 'Customer name, phone, and email required' },
      { status: 400 },
    )
  }
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json(
      { error: 'Order must contain at least one item' },
      { status: 400 },
    )
  }

  const supabase = getSupabaseAdminClient()
  if (!supabase) {
    /* Supabase not configured — fail gracefully so the customer's
       order completion isn't blocked. Logged on the server. */
    return NextResponse.json(
      { ok: false, warning: 'Database not configured' },
      { status: 200 },
    )
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        order_number: body.orderNumber,
        customer_name: body.customer.name,
        customer_phone: body.customer.phone,
        customer_email: body.customer.email,
        items: body.items,
        subtotal: body.subtotal,
        tax: body.tax,
        total: body.total,
        stripe_payment_intent_id: body.stripePaymentIntentId,
        status: 'received',
      })
      .select('id')
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, id: data?.id })
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to save order'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
