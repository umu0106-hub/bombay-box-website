'use client'

import { useEffect, useRef, useState } from 'react'
import { useCart } from './CartContext'
import { formatPrice, RESTAURANT } from '@/lib/menu'

export default function Cart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, tax, total } = useCart()
  const sheetRef = useRef<HTMLDivElement>(null)
  const [orderNumber, setOrderNumber] = useState<string>('')

  /* Generate order number on first load */
  useEffect(() => {
    if (!orderNumber && items.length > 0) {
      const num = `BB${Date.now().toString().slice(-6)}`
      setOrderNumber(num)
    }
  }, [items.length, orderNumber])

  /* Close on outside click */
  useEffect(() => {
    if (!isOpen) return
    const onClickOutside = (e: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        closeCart()
      }
    }
    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside)
  }, [isOpen, closeCart])

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        ref={sheetRef}
        style={{
          position: 'relative',
          width: '100%',
          maxHeight: '85vh',
          backgroundColor: 'var(--bg-secondary)',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 300ms var(--ease-smooth)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--cream)' }}>Your Order</h2>
          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--cream)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Items Scroll */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            gap: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {items.length === 0 ? (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Your cart is empty. Head to the menu to add something delicious!
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartId}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  alignItems: 'start',
                }}
              >
                <div>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: 'var(--cream)' }}>
                    {item.name}
                  </p>
                  {item.customizations.length > 0 && (
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {item.customizations.map((c) => c.name).join(', ')}
                    </p>
                  )}
                  <p style={{ margin: '0.5rem 0 0 0', fontWeight: '700', color: 'var(--saffron)' }}>
                    {formatPrice(item.price)}
                  </p>
                </div>

                {/* Qty Controls */}
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                  }}
                >
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: '1px solid var(--saffron)',
                      backgroundColor: 'transparent',
                      color: 'var(--saffron)',
                      cursor: 'pointer',
                      fontSize: '1rem',
                    }}
                  >
                    −
                  </button>
                  <span style={{ width: '24px', textAlign: 'center', color: 'var(--cream)' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: '1px solid var(--saffron)',
                      backgroundColor: 'transparent',
                      color: 'var(--saffron)',
                      cursor: 'pointer',
                      fontSize: '1rem',
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.cartId)}
                    style={{
                      marginLeft: '0.5rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'var(--rose)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals & Checkout */}
        {items.length > 0 && (
          <div
            style={{
              padding: '1.5rem',
              borderTop: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-tertiary)',
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
            }}
          >
            <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>NJ Tax ({(RESTAURANT.taxRate * 100).toFixed(2)}%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'var(--saffron)',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-color)',
                }}
              >
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <a
              href={total > 0 ? '/checkout' : '#'}
              onClick={(e) => {
                if (total <= 0) e.preventDefault()
              }}
              style={{
                display: 'block',
                padding: '1rem',
                backgroundColor: total > 0 ? 'var(--saffron)' : 'var(--text-secondary)',
                color: total > 0 ? 'var(--charcoal)' : 'var(--bg-primary)',
                textAlign: 'center',
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                fontWeight: '700',
                cursor: total > 0 ? 'pointer' : 'not-allowed',
                transition: 'all 200ms',
              }}
            >
              Proceed to Checkout
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
