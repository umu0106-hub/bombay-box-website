/**
 * Server-side Stripe client.
 *
 * Imported only from server-side code (API routes / server components).
 * Never imported in client-side code or 'use client' components.
 */

import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
})
