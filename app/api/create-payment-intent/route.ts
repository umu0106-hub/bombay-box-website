/**
 * POST /api/create-payment-intent
 *
 * Creates a Stripe PaymentIntent for the given amount + currency.
 * Called from checkout page (client-side) before rendering PaymentElement.
 *
 * Request body: { amount: number (cents), metadata?: {...} }
 * Response: { client_secret: string } or { error: string }
 */

import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { amount, metadata } = await req.json()

    if (!amount || amount < 50) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: metadata || {},
    })

    return NextResponse.json({
      client_secret: paymentIntent.client_secret,
    })
  } catch (error: any) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
