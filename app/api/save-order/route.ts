/**
 * POST /api/save-order
 *
 * Persists a paid order to the Supabase `orders` table.
 * Called from checkout page after successful payment.
 *
 * Request body: { items, total, tax, grandTotal, customerInfo, paymentIntentId }
 * Response: { orderId: string } or { error: string }
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdminClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { items, total, tax, grandTotal, customerInfo, paymentIntentId } = await req.json()

    if (!items || !customerInfo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdminClient()

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          payment_intent_id: paymentIntentId,
          customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          items_json: items,
          subtotal: total,
          tax,
          total: grandTotal,
          status: 'confirmed',
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Error saving order:', error)
      return NextResponse.json(
        { error: 'Failed to save order' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      orderId: data?.[0]?.id,
    })
  } catch (error: any) {
    console.error('Error in save-order:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
