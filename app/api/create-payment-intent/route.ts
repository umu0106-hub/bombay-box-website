import { stripe } from '@/lib/stripe'
import { getSupabaseAdminClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      amount: number
      customerInfo: {
        name: string
        phone: string
        email: string
      }
    }

    if (!body.amount || !body.customerInfo?.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const stripeIntent = await stripe.paymentIntents.create({
      amount: Math.round(body.amount * 100), // Stripe expects cents
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        customer_name: body.customerInfo.name,
        customer_phone: body.customerInfo.phone,
        customer_email: body.customerInfo.email,
      },
    })

    return NextResponse.json({
      clientSecret: stripeIntent.client_secret,
    })
  } catch (err) {
    console.error('[POST /api/create-payment-intent]', err)
    return NextResponse.json(
      { error: 'Payment setup failed' },
      { status: 500 },
    )
  }
}
