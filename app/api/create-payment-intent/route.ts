/**
 * POST /api/create-payment-intent
 *
 * Creates a Stripe PaymentIntent for the given amount + customer info
 * and returns its client_secret so the browser can mount Stripe Elements.
 *
 * Body shape:
 *   { amount: number (USD, e.g. 32.45), customerInfo?: { name, phone, email } }
 *
 * Response:
 *   200 { clientSecret: string }
 *   4xx { error: string }
 */

import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface RequestBody {
  amount: number
  customerInfo?: {
    name?: string
    phone?: string
    email?: string
  }
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

  const amount = Number(body?.amount)
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { error: 'Amount must be a positive number' },
      { status: 400 },
    )
  }

  /* Stripe expects amounts in cents */
  const amountInCents = Math.round(amount * 100)

  /* Stripe minimum charge in USD is 50 cents */
  if (amountInCents < 50) {
    return NextResponse.json(
      { error: 'Order minimum is $0.50' },
      { status: 400 },
    )
  }

  try {
    const intent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      description: 'Bombay Box online order',
      receipt_email: body.customerInfo?.email || undefined,
      metadata: {
        restaurant: 'bombay-box',
        customer_name: body.customerInfo?.name ?? '',
        customer_phone: body.customerInfo?.phone ?? '',
        customer_email: body.customerInfo?.email ?? '',
      },
    })

    return NextResponse.json({ clientSecret: intent.client_secret })
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to create payment intent'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
