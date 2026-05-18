'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get('payment_intent')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!paymentIntentId) {
        setStatus('error')
        return
      }

      try {
        // In a real app, you'd verify the payment on the server
        // For now, we'll consider any payment_intent as successful
        const mockOrder = {
          id: paymentIntentId,
          status: 'confirmed',
          estimatedTime: '15-20 mins',
          total: sessionStorage.getItem('lastTotal') || '$0.00',
        }
        setOrderDetails(mockOrder)
        setStatus('success')
      } catch (error) {
        setStatus('error')
      }
    }

    checkPaymentStatus()
  }, [paymentIntentId])

  return (
    <>
      <Header />
      <main style={{
        minHeight: '100vh',
        backgroundColor: '#1a1a1a',
        padding: '40px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%',
        }}>
          {status === 'loading' && (
            <div style={{
              textAlign: 'center',
              color: '#f0f0f0',
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '24px',
              }}>⏳</div>
              <p style={{ fontSize: '18px' }}>Confirming your order...</p>
            </div>
          )}

          {status === 'success' && (
            <div style={{
              backgroundColor: '#2d2d2d',
              padding: '40px',
              borderRadius: '16px',
              border: '1px solid #404040',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '64px',
                marginBottom: '24px',
              }}>✅</div>
              <h1 style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#f4a460',
                marginBottom: '16px',
              }}>
                Order Confirmed!
              </h1>
              <p style={{
                fontSize: '18px',
                color: '#a0a0a0',
                marginBottom: '32px',
              }}>
                Thank you for your order. Your food will be ready soon.
              </p>
              {orderDetails && (
                <div style={{
                  backgroundColor: '#1a1a1a',
                  padding: '24px',
                  borderRadius: '12px',
                  marginBottom: '32px',
                  textAlign: 'left',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                  }}>
                    <span style={{ color: '#a0a0a0' }}>Order ID</span>
                    <span style={{ color: '#f0f0f0', fontFamily: 'monospace' }}>
                      {orderDetails.id.slice(0, 12)}...
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                  }}>
                    <span style={{ color: '#a0a0a0' }}>Estimated Time</span>
                    <span style={{ color: '#f0f0f0' }}>{orderDetails.estimatedTime}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid #404040',
                  }}>
                    <span style={{ color: '#a0a0a0' }}>Total</span>
                    <span style={{ color: '#f4a460', fontWeight: 'bold' }}>
                      {orderDetails.total}
                    </span>
                  </div>
                </div>
              )}
              <a href="/menu" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 48px',
                backgroundColor: '#f4a460',
                color: '#000',
                fontSize: '18px',
                fontWeight: '600',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 200ms ease-in-out',
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement
                target.style.backgroundColor = '#fbbf24'
                target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement
                target.style.backgroundColor = '#f4a460'
                target.style.transform = 'translateY(0)'
              }}
              >
                Order Again
              </a>
            </div>
          )}

          {status === 'error' && (
            <div style={{
              backgroundColor: '#2d2d2d',
              padding: '40px',
              borderRadius: '16px',
              border: '1px solid #404040',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '64px',
                marginBottom: '24px',
              }}>❌</div>
              <h1 style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#d64045',
                marginBottom: '16px',
              }}>
                Order Failed
              </h1>
              <p style={{
                fontSize: '18px',
                color: '#a0a0a0',
                marginBottom: '32px',
              }}>
                There was an issue processing your order. Please try again.
              </p>
              <a href="/checkout" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 48px',
                backgroundColor: '#f4a460',
                color: '#000',
                fontSize: '18px',
                fontWeight: '600',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 200ms ease-in-out',
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement
                target.style.backgroundColor = '#fbbf24'
                target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement
                target.style.backgroundColor = '#f4a460'
                target.style.transform = 'translateY(0)'
              }}
              >
                Back to Checkout
              </a>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}
