'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  loadStripe,
  type Stripe as StripeJS,
  type StripeElements,
} from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import Header from '@/components/Header'
import { useCart } from '@/components/CartContext'
import { formatPrice, RESTAURANT } from '@/lib/menu'

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
const stripePromise: Promise<StripeJS | null> = stripeKey
  ? loadStripe(stripeKey)
  : Promise.resolve(null)

interface CustomerInfo {
  name: string
  phone: string
  email: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, tax, total } = useCart()
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
  })
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [intentError, setIntentError] = useState<string | null>(null)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => setHasMounted(true), [])

  const canCreateIntent =
    items.length > 0 && customer.name.length > 1 && total > 0

  useEffect(() => {
    if (!canCreateIntent || clientSecret) return
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: total, customerInfo: customer }),
        })
        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || 'Payment setup failed')
        }
        const data = (await res.json()) as { clientSecret: string }
        if (!cancelled) setClientSecret(data.clientSecret)
      } catch (err) {
        if (!cancelled) {
          setIntentError(
            err instanceof Error ? err.message : 'Payment setup failed',
          )
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [canCreateIntent, total, customer, clientSecret])

  const elementsOptions = useMemo(() => {
    if (!clientSecret) return undefined
    return {
      clientSecret,
      appearance: {
        theme: 'night' as const,
        variables: {
          colorPrimary: '#A54E27',
          colorBackground: '#241A12',
          colorText: '#FFF5E6',
          colorDanger: '#C0392B',
          fontFamily: 'Lora, Georgia, serif',
          borderRadius: '12px',
          fontSizeBase: '16px',
        },
        rules: {
          '.Input': {
            backgroundColor: '#241A12',
            border: '1.5px solid rgba(255,245,230,0.12)',
            color: '#FFF5E6',
            padding: '12px 14px',
          },
          '.Input:focus': {
            borderColor: '#A54E27',
            boxShadow: '0 0 0 4px rgba(165,78,39,0.18)',
          },
          '.Label': {
            color: 'rgba(255,245,230,0.72)',
            fontFamily: 'DM Mono, monospace',
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          },
          '.Tab': {
            backgroundColor: '#241A12',
            border: '1px solid rgba(255,245,230,0.12)',
          },
          '.Tab--selected': {
            backgroundColor: '#2E2218',
            borderColor: '#A54E27',
          },
        },
      },
    }
  }, [clientSecret])

  if (!hasMounted) {
    return (
      <>
        <Header />
        <main className="container" style={{ padding: '4rem 1.25rem' }}>
          <div style={{ color: 'var(--cream-muted)' }}>Loading…</div>
        </main>
      </>
    )
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="container" style={{ padding: '5rem 1.25rem', textAlign: 'center' }}>
          <h1
            className="f-display"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'var(--cream)',
              marginBottom: '1rem',
            }}
          >
            Your bowl is empty
          </h1>
          <p style={{ color: 'var(--cream-muted)', marginBottom: '2rem' }}>
            Head to the menu and add something delicious first.
          </p>
          <Link href="/menu" className="btn btn-primary">
            See the Menu
          </Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main style={{ paddingBottom: '5rem' }}>
        <section style={{ padding: '3rem 0 1.5rem', textAlign: 'center' }}>
          <div className="container">
            <span
              className="f-mono"
              style={{
                fontSize: '0.7rem',
                color: 'var(--gold)',
                letterSpacing: '0.16em',
              }}
            >
              ALMOST THERE
            </span>
            <h1
              className="f-display"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                color: 'var(--cream)',
                margin: '0.5rem 0 0.5rem',
              }}
            >
              Complete Your Order
            </h1>
            <p
              style={{
                color: 'var(--cream-muted)',
                fontFamily: 'var(--f-body)',
                fontSize: '1rem',
              }}
            >
              Pickup at {RESTAURANT.location}
            </p>
          </div>
        </section>

        <div className="container">
          <div
            className="checkout-grid"
            style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr' }}
          >
            <style>{`
              @media (min-width: 960px) {
                .checkout-grid { grid-template-columns: 1fr 1fr !important; gap: 3rem !important; align-items: start; }
                .order-summary { position: sticky; top: 100px; }
              }
            `}</style>

            <div className="order-summary">
              <SummaryCard
                items={items}
                subtotal={subtotal}
                tax={tax}
                total={total}
              />
            </div>

            <div>
              <div
                className="card"
                style={{
                  padding: '1.8rem',
                  background: 'var(--charcoal-2)',
                }}
              >
                <h2
                  className="f-display"
                  style={{
                    fontSize: '1.6rem',
                    color: 'var(--cream)',
                    margin: 0,
                    marginBottom: '1.4rem',
                  }}
                >
                  Your Details
                </h2>

                <label className="field">
                  <span className="field-label">Full Name *</span>
                  <input
                    className="field-input"
                    type="text"
                    required
                    autoComplete="name"
                    value={customer.name}
                    onChange={(e) =>
                      setCustomer((c) => ({ ...c, name: e.target.value }))
                    }
                    placeholder="Jane Doe"
                  />
                </label>

                <label className="field">
                  <span className="field-label">Phone Number *</span>
                  <input
                    className="field-input"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer((c) => ({ ...c, phone: e.target.value }))
                    }
                    placeholder="(201) 555-0100"
                  />
                  <span className="field-hint">
                    We&apos;ll text you when your order is ready
                  </span>
                </label>

                <label className="field">
                  <span className="field-label">Email Address *</span>
                  <input
                    className="field-input"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={customer.email}
                    onChange={(e) =>
                      setCustomer((c) => ({ ...c, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                  />
                  <span className="field-hint">Receipt sent here</span>
                </label>

                <hr className="divider" style={{ margin: '1.4rem 0' }} />

                <h3
                  className="f-bold"
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--cream)',
                    letterSpacing: '0.05em',
                    marginBottom: '1rem',
                  }}
                >
                  💳 Payment
                </h3>

                {!canCreateIntent && (
                  <p
                    style={{
                      fontFamily: 'var(--f-body)',
                      color: 'var(--cream-faint)',
                      fontSize: '0.9rem',
                      padding: '1rem',
                      background: 'rgba(255,245,230,0.03)',
                      borderRadius: '10px',
                      textAlign: 'center',
                    }}
                  >
                    Enter your name above to continue to payment.
                  </p>
                )}

                {intentError && (
                  <p
                    style={{
                      color: 'var(--terracotta)',
                      background: 'rgba(192,57,43,0.1)',
                      border: '1px solid rgba(192,57,43,0.3)',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                    }}
                  >
                    {intentError}
                  </p>
                )}

                {canCreateIntent && clientSecret && elementsOptions && (
                  <Elements stripe={stripePromise} options={elementsOptions}>
                    <PaymentForm
                      customer={customer}
                      total={total}
                      items={items}
                      subtotal={subtotal}
                      tax={tax}
                      onSuccess={(orderNumber) =>
                        router.push(`/confirmation?order=${orderNumber}&phone=${encodeURIComponent(customer.phone)}`)
                      }
                    />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function PaymentForm({
  customer,
  total,
  items,
  subtotal,
  tax,
  onSuccess,
}: {
  customer: CustomerInfo
  total: number
  items: any[]
  subtotal: number
  tax: number
  onSuccess: (orderNumber: string) => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setIsProcessing(true)
    setSubmitError(null)

    try {
      const { error: submitError, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      })

      if (submitError) {
        setSubmitError(submitError.message || 'Payment failed')
        setIsProcessing(false)
        return
      }

      if (paymentIntent?.status === 'succeeded') {
        const orderNumber = `BB-${Date.now()}`
        onSuccess(orderNumber)
      } else {
        setSubmitError('Payment did not complete. Please try again.')
        setIsProcessing(false)
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'An error occurred'
      )
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />
      {submitError && (
        <p
          style={{
            color: 'var(--terracotta)',
            background: 'rgba(192,57,43,0.1)',
            border: '1px solid rgba(192,57,43,0.3)',
            padding: '0.8rem 1rem',
            borderRadius: '10px',
            fontSize: '0.9rem',
            marginTop: '1rem',
          }}
        >
          {submitError}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn btn-primary"
        style={{
          width: '100%',
          marginTop: '1.4rem',
          padding: '1.1rem',
          fontSize: '1rem',
          opacity: isProcessing ? 0.7 : 1,
          cursor: isProcessing ? 'not-allowed' : 'pointer',
        }}
      >
        {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
      </button>
    </form>
  )
}

function SummaryCard({
  items,
  subtotal,
  tax,
  total,
}: {
  items: any[]
  subtotal: number
  tax: number
  total: number
}) {
  return (
    <div
      className="card"
      style={{
        padding: '1.8rem',
        background: 'var(--charcoal-2)',
      }}
    >
      <h2
        className="f-display"
        style={{
          fontSize: '1.6rem',
          color: 'var(--cream)',
          margin: 0,
          marginBottom: '1.4rem',
        }}
      >
        Your Order
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.4rem' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '0.8rem',
              borderBottom: '1px solid rgba(255,245,230,0.06)',
            }}
          >
            <div>
              <div
                style={{
                  color: 'var(--cream)',
                  fontWeight: 600,
                  marginBottom: '0.2rem',
                }}
              >
                {item.name}
              </div>
              {item.quantity > 1 && (
                <div
                  style={{
                    color: 'var(--cream-muted)',
                    fontSize: '0.85rem',
                  }}
                >
                  Qty: {item.quantity}
                </div>
              )}
            </div>
            <div
              style={{
                color: 'var(--gold)',
                fontWeight: 700,
                fontSize: '1.05rem',
              }}
            >
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      <hr className="divider" style={{ margin: '1.4rem 0' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <TotalLine label="Subtotal" value={formatPrice(subtotal)} />
        <TotalLine label="Tax (6.625%)" value={formatPrice(tax)} muted />
        <TotalLine label="Total" value={formatPrice(total)} emphasized />
      </div>
    </div>
  )
}

function TotalLine({
  label,
  value,
  muted,
  emphasized,
}: {
  label: string
  value: string
  muted?: boolean
  emphasized?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: emphasized ? '0.6rem' : 0,
        borderTop: emphasized ? '1px solid rgba(255,245,230,0.1)' : 'none',
      }}
    >
      <span
        style={{
          fontSize: emphasized ? '1rem' : '0.9rem',
          color: muted ? 'var(--cream-faint)' : 'var(--cream)',
          fontFamily: emphasized ? 'var(--f-bold)' : 'var(--f-body)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: emphasized ? '1.4rem' : '1rem',
          color: emphasized ? 'var(--gold)' : muted ? 'var(--cream-muted)' : 'var(--cream)',
          fontFamily: 'var(--f-bold)',
        }}
      >
        {value}
      </span>
    </div>
  )
}