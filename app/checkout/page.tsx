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
  const { items, subtotal, tax, total, updateQuantity } = useCart()
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
  })
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [intentError, setIntentError] = useState<string | null>(null)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => setHasMounted(true), [])

  /* Create PaymentIntent once cart total is known + customer name entered */
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
          colorPrimary: '#FF6B1A',
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
            borderColor: '#FF6B1A',
            boxShadow: '0 0 0 4px rgba(255,107,26,0.18)',
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
            borderColor: '#FF6B1A',
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
                color: 'var(--amber)',
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
              Pickup at {RESTAURANT.address}
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

            {/* LEFT — Your Order */}
            <div className="order-summary">
              <SummaryCard
                items={items}
                subtotal={subtotal}
                tax={tax}
                total={total}
                updateQuantity={updateQuantity}
              />
            </div>

            {/* RIGHT — Payment */}
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
                      color: 'var(--spice)',
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

                {canCreateIntent && !clientSecret && !intentError && (
                  <div
                    style={{
                      padding: '1.5rem',
                      textAlign: 'center',
                      color: 'var(--cream-muted)',
                      fontFamily: 'var(--f-mono)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.12em',
                    }}
                  >
                    PREPARING SECURE CHECKOUT…
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '1.5rem',
                    paddingTop: '1.2rem',
                    borderTop: '1px solid rgba(255,245,230,0.08)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--cream-faint)' }} aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span
                    className="f-mono"
                    style={{
                      fontSize: '0.65rem',
                      color: 'var(--cream-faint)',
                      letterSpacing: '0.14em',
                    }}
                  >
                    PAYMENTS SECURED BY STRIPE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function SummaryCard({
  items,
  subtotal,
  tax,
  total,
  updateQuantity,
}: {
  items: ReturnType<typeof useCart>['items']
  subtotal: number
  tax: number
  total: number
  updateQuantity: ReturnType<typeof useCart>['updateQuantity']
}) {
  return (
    <div className="card" style={{ padding: '1.8rem', background: 'var(--charcoal-2)' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.4rem',
        }}
      >
        <h2
          className="f-display"
          style={{
            fontSize: '1.6rem',
            color: 'var(--cream)',
            margin: 0,
          }}
        >
          Your Order
        </h2>
        <Link
          href="/menu"
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '0.7rem',
            color: 'var(--saffron)',
            letterSpacing: '0.12em',
          }}
        >
          EDIT ORDER →
        </Link>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(255,245,230,0.06)',
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                className="f-bold"
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--cream)',
                  letterSpacing: '0.02em',
                  marginBottom: '4px',
                }}
              >
                {item.name}
              </div>
              {item.customizations && (
                <div
                  className="f-mono"
                  style={{
                    fontSize: '0.65rem',
                    color: 'var(--cream-muted)',
                    letterSpacing: '0.05em',
                    lineHeight: 1.6,
                  }}
                >
                  {item.customizations.sauces && item.customizations.sauces.length > 0 && (
                    <div>SAUCES · {item.customizations.sauces.join(', ').toUpperCase()}</div>
                  )}
                  {item.customizations.extraSauces && item.customizations.extraSauces.length > 0 && (
                    <div style={{ color: 'var(--amber)' }}>
                      +EXTRA · {item.customizations.extraSauces.join(', ').toUpperCase()}
                    </div>
                  )}
                  {item.customizations.toppings && item.customizations.toppings.length > 0 && (
                    <div>TOPPINGS · {item.customizations.toppings.length} ADDED</div>
                  )}
                </div>
              )}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1px solid rgba(255,245,230,0.14)',
                  borderRadius: '999px',
                  padding: '2px',
                  marginTop: '0.6rem',
                }}
              >
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease"
                  style={qtyBtnStyle}
                >
                  −
                </button>
                <span
                  style={{
                    minWidth: '28px',
                    textAlign: 'center',
                    fontFamily: 'var(--f-bold)',
                    fontSize: '0.85rem',
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase"
                  style={qtyBtnStyle}
                >
                  +
                </button>
              </div>
            </div>
            <span
              className="f-bold"
              style={{ color: 'var(--saffron)', fontSize: '1.05rem' }}
            >
              {formatPrice(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <TotalRow label="Subtotal" value={formatPrice(subtotal)} />
        <TotalRow label="NJ Sales Tax (6.625%)" value={formatPrice(tax)} muted />
        <TotalRow label="Total" value={formatPrice(total)} emphasized />
      </div>

      <div
        style={{
          marginTop: '1.4rem',
          padding: '1rem 1.1rem',
          background: 'rgba(255,172,48,0.08)',
          border: '1px solid rgba(255,172,48,0.2)',
          borderRadius: '12px',
          fontFamily: 'var(--f-body)',
          fontSize: '0.9rem',
          color: 'var(--cream-muted)',
          lineHeight: 1.55,
        }}
      >
        ⏱{' '}
        <span style={{ color: 'var(--cream)' }}>
          Ready in 20–25 minutes
        </span>{' '}
        at {RESTAURANT.address}
      </div>
    </div>
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
  items: ReturnType<typeof useCart>['items']
  subtotal: number
  tax: number
  onSuccess: (orderNumber: string) => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const { clearCart } = useCart()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setSubmitting(true)
    setError(null)

    /* Confirm payment without redirect — we handle the success state ourselves */
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: `${window.location.origin}/confirmation`,
        receipt_email: customer.email,
      },
    })

    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed. Please try again.')
      setSubmitting(false)
      return
    }

    /* Generate a 6-digit order number for display + save record */
    const orderNumber = String(Math.floor(100000 + Math.random() * 900000))

    try {
      await fetch('/api/save-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber,
          customer,
          items,
          subtotal,
          tax,
          total,
          stripePaymentIntentId: paymentIntent?.id ?? null,
        }),
      })
    } catch {
      /* Order is paid; saving is best-effort. Don't block confirmation. */
    }

    clearCart()
    onSuccess(orderNumber)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <PaymentElement
        options={{
          layout: { type: 'tabs', defaultCollapsed: false },
        }}
      />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          margin: '1rem 0',
          alignItems: 'center',
        }}
      >
        <CardBadge label="VISA" />
        <CardBadge label="MASTERCARD" />
        <CardBadge label="AMEX" />
        <CardBadge label="APPLE PAY" />
        <CardBadge label="G PAY" />
      </div>

      {error && (
        <p
          style={{
            color: 'var(--spice)',
            background: 'rgba(192,57,43,0.1)',
            border: '1px solid rgba(192,57,43,0.3)',
            padding: '0.8rem 1rem',
            borderRadius: '10px',
            fontSize: '0.9rem',
            marginTop: '1rem',
          }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="btn btn-primary"
        style={{
          width: '100%',
          padding: '1.15rem',
          fontSize: '1rem',
          marginTop: '1.5rem',
          opacity: submitting ? 0.6 : 1,
          cursor: submitting ? 'wait' : 'pointer',
        }}
      >
        {submitting
          ? 'Processing…'
          : `Place Order & Pay ${formatPrice(total)} →`}
      </button>
    </form>
  )
}

function CardBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--f-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.12em',
        padding: '0.3rem 0.55rem',
        border: '1px solid rgba(255,245,230,0.14)',
        borderRadius: '6px',
        color: 'var(--cream-muted)',
      }}
    >
      {label}
    </span>
  )
}

function TotalRow({
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
        alignItems: 'baseline',
        paddingTop: emphasized ? '0.7rem' : 0,
        borderTop: emphasized ? '1px solid rgba(255,245,230,0.1)' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: emphasized ? 'var(--f-bold)' : 'var(--f-mono)',
          fontSize: emphasized ? '1rem' : '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: muted ? 'var(--cream-faint)' : 'var(--cream)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--f-bold)',
          fontSize: emphasized ? '1.6rem' : '1rem',
          color: emphasized ? 'var(--saffron)' : muted ? 'var(--cream-muted)' : 'var(--cream)',
        }}
      >
        {value}
      </span>
    </div>
  )
}

const qtyBtnStyle: React.CSSProperties = {
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--cream)',
  fontFamily: 'var(--f-bold)',
  fontSize: '1rem',
}
