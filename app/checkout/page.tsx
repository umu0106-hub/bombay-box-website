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
import { RESTAURANT } from '@/lib/menu'

const CheckoutPage = () => {
  const router = useRouter()
  const { items, clearCart, subtotal, tax, total } = useCart()
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const stripePromise = stripeKey ? loadStripe(stripeKey) : null

  useEffect(() => {
    if (!stripePromise || total <= 0) return

    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: Math.round(total * 100),
            customerInfo: { name, email, phone },
          }),
        })

        if (!response.ok) {
          const err = await response.json()
          setError(err.message || 'Failed to create payment intent')
          return
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    }

    createPaymentIntent()
  }, [stripePromise, total, name, email, phone])

  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', padding: '40px 20px', backgroundColor: '#1a1a1a' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Page Title */}
          <h1 style={{ fontSize: '48px', marginBottom: '40px', color: '#f4a460', textAlign: 'center' }}>
            Checkout
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {/* LEFT: Order Summary */}
            <section>
              <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#f4a460' }}>Order Summary</h2>

              {items.length === 0 ? (
                <p style={{ color: '#aaa' }}>Your cart is empty</p>
              ) : (
                <div style={{ backgroundColor: '#2d2d2d', padding: '20px', borderRadius: '8px' }}>
                  {items.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #444' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#fff' }}>
                          {item.name} x {item.quantity}
                        </span>
                        <span style={{ color: '#f4a460' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      {item.customizations && item.customizations.length > 0 && (
                        <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>
                          {item.customizations.map((cust) => cust.name).join(', ')}
                        </div>
                      )}
                    </div>
                  ))}

                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #f4a460' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#aaa' }}>Subtotal:</span>
                      <span style={{ color: '#fff' }}>${subtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#aaa' }}>Tax (6.625%):</span>
                      <span style={{ color: '#fff' }}>${tax.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
                      <span style={{ color: '#f4a460' }}>Total:</span>
                      <span style={{ color: '#f4a460' }}>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Pickup Location */}
                  <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#1a1a1a', borderRadius: '4px', borderLeft: '3px solid #f4a460' }}>
                    <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>PICKUP AT:</p>
                    <p style={{ color: '#fff', margin: '0', fontSize: '14px', fontWeight: 'bold' }}>
                      Pickup at {RESTAURANT.location}
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* RIGHT: Payment Form */}
            <section>
              <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#f4a460' }}>Payment Details</h2>

              {error && (
                <div style={{ backgroundColor: '#8B3A3A', padding: '12px', borderRadius: '4px', marginBottom: '20px', color: '#fff' }}>
                  {error}
                </div>
              )}

              {items.length === 0 ? (
                <p style={{ color: '#aaa' }}>Add items to your cart to proceed</p>
              ) : (
                <form onSubmit={(e) => e.preventDefault()}>
                  {/* Customer Info */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', color: '#aaa', marginBottom: '4px' }}>Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#2d2d2d',
                        border: '1px solid #444',
                        borderRadius: '4px',
                        color: '#fff',
                        fontSize: '14px',
                      }}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', color: '#aaa', marginBottom: '4px' }}>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#2d2d2d',
                        border: '1px solid #444',
                        borderRadius: '4px',
                        color: '#fff',
                        fontSize: '14px',
                      }}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#aaa', marginBottom: '4px' }}>Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(201) 546-1558"
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#2d2d2d',
                        border: '1px solid #444',
                        borderRadius: '4px',
                        color: '#fff',
                        fontSize: '14px',
                      }}
                      required
                    />
                  </div>

                  {/* Stripe Payment Element */}
                  {stripePromise && clientSecret ? (
                    <Elements
                      stripe={stripePromise}
                      options={{ clientSecret, appearance: { theme: 'dark' } }}
                    >
                      <PaymentForm items={items} subtotal={subtotal} tax={tax} clearCart={clearCart} />
                    </Elements>
                  ) : (
                    <p style={{ color: '#aaa' }}>Loading payment system...</p>
                  )}
                </form>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

interface PaymentFormProps {
  items: any[]
  subtotal: number
  tax: number
  clearCart: () => void
}

const PaymentForm: React.FC<PaymentFormProps> = ({ items, subtotal, tax, clearCart }) => {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      setError('Payment system not ready')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      })

      if (paymentError) {
        setError(paymentError.message || 'Payment failed')
        setLoading(false)
        return
      }

      if (paymentIntent?.status === 'succeeded') {
        // Save order to Supabase
        const total = subtotal + tax

        await fetch('/api/save-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items,
            stripePaymentIntentId: paymentIntent.id,
            total,
          }),
        })

        clearCart()
        router.push('/confirmation')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && (
        <div style={{ marginTop: '16px', color: '#ff6b6b', fontSize: '14px' }}>
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        style={{
          width: '100%',
          padding: '12px',
          marginTop: '20px',
          backgroundColor: loading ? '#666' : '#f4a460',
          color: '#000',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Processing...' : `Pay $${(subtotal + tax).toFixed(2)}`}
      </button>
    </form>
  )
}

export default CheckoutPage
