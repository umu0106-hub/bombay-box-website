/**
 * Server-side Stripe client.
 *
 * Imported only from server-side code (API routes / server components).
 * Never expose the secret key to the client.
 */

import Stripe from 'stripe'

const secretKey = process.env.STRIPE_SECRET_KEY

if (!secretKey) {
  /* Don't throw at module load — keep dev experience friendly.
     The API route surfaces the error to the caller instead. */
  // eslint-disable-next-line no-console
  console.warn(
    '[stripe] STRIPE_SECRET_KEY is not set. /api/create-payment-intent will fail.',
  )
}

export const stripe = new Stripe(secretKey ?? 'sk_test_missing', {
  apiVersion: '2024-06-20',
  typescript: true,
  appInfo: {
    name: 'Bombay Box',
    version: '1.0.0',
    url: 'https://eatbombaybox.com',
  },
})
