'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '@/components/CartContext'
import Header from '@/components/Header'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main style={{
        minHeight: '100vh',
        backgroundColor: '#1a1a1a',
        padding: '40px 20px',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#f4a460',
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            Checkout
          </h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </main>
    </>
  )
}

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { items, total, tax, grandTotal, customerInfo, setCustomerInfo, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [clientSecret, setClientSecret] = useState<string>('')

  /* Create PaymentIntent on mount */
  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(grandTotal * 100), // cents
          metadata: {
            itemCount: items.length,
          },
        }),
      })
      const data = await response.json()
      if (data.error) {
        setMessage(data.error)
      } else {
        setClientSecret(data.client_secret)
      }
    }
    createPaymentIntent()
  }, [items.length, grandTotal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      setMessage('Payment system not ready')
      return
    }

    setLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      redirect: 'if_required',
      confirmParams: {
        return_url: `${window.location.origin}/confirmation`,
      },
    })

    if (error) {
      setMessage(error.message || 'Payment failed')
      setLoading(false)
    } else {
      // Save order to Supabase
      const res = await fetch('/api/save-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total,
          tax,
          grandTotal,
          customerInfo,
          paymentIntentId: (await stripe.retrievePaymentIntent(clientSecret)).paymentIntent?.id,
        }),
      })
      if (!res.ok) {
        setMessage('Failed to save order')
        setLoading(false)
      } else {
        clearCart()
        router.push(`/confirmation?payment_intent=${clientSecret}`)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    }}>
      {/* Order Summary */}
      <div style={{
        backgroundColor: '#2d2d2d',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #404040',
      }}>
        <h2 style={{ color: '#f4a460', marginBottom: '16px' }}>Order Summary</h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '16px',
        }}>
          {items.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
          <div style={{
            borderTop: '1px solid #404040',
            paddingTop: '12px',
            marginTop: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
          }}>
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Tax (6.625%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#f4a460',
          }}>
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div style={{
        backgroundColor: '#2d2d2d',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #404040',
      }}>
        <h2 style={{ color: '#f4a460', marginBottom: '16px' }}>Customer Info</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
        }}>
          <input
            type="text"
            placeholder="First Name"
            value={customerInfo.firstName}
            onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
            style={{
              padding: '12px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #404040',
              borderRadius: '8px',
              color: '#f0f0f0',
            }}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={customerInfo.lastName}
            onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
            style={{
              padding: '12px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #404040',
              borderRadius: '8px',
              color: '#f0f0f0',
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
            style={{
              padding: '12px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #404040',
              borderRadius: '8px',
              color: '#f0f0f0',
              gridColumn: '1 / -1',
            }}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            style={{
              padding: '12px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #404040',
              borderRadius: '8px',
              color: '#f0f0f0',
              gridColumn: '1 / -1',
            }}
            required
          />
        </div>
      </div>

      {/* Payment Element */}
      <div style={{
        backgroundColor: '#2d2d2d',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #404040',
      }}>
        <h2 style={{ color: '#f4a460', marginBottom: '16px' }}>Payment Method</h2>
        <PaymentElement />
      </div>

      {message && (
        <div style={{
          padding: '12px',
          backgroundColor: '#d64045',
          color: '#fff',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        style={{
          padding: '16px',
          backgroundColor: loading ? '#666' : '#f4a460',
          color: '#000',
          fontSize: '18px',
          fontWeight: '600',
          borderRadius: '12px',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 200ms ease-in-out',
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            (e.target as HTMLButtonElement).style.backgroundColor = '#fbbf24'
            ;(e.target as HTMLButtonElement).style.transform = 'translateY(-2px)'
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            (e.target as HTMLButtonElement).style.backgroundColor = '#f4a460'
            ;(e.target as HTMLButtonElement).style.transform = 'translateY(0)'
          }
        }}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  )
}
