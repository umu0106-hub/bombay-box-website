'use client'

import Link from 'next/link'
import { useCart } from './CartContext'

export default function Cart() {
  const { items, total, tax, grandTotal, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div style={{
        backgroundColor: '#2d2d2d',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #404040',
        textAlign: 'center',
      }}>
        <p style={{ color: '#a0a0a0' }}>Your cart is empty</p>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: '#2d2d2d',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #404040',
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#f4a460',
        marginBottom: '16px',
      }}>
        🛒 Cart ({items.length})
      </h3>

      {/* Items List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '16px',
        maxHeight: '300px',
        overflowY: 'auto',
      }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #404040',
            }}
          >
            <div>
              <p style={{ color: '#f0f0f0', fontSize: '14px', fontWeight: '500' }}>
                {item.name}
              </p>
              <p style={{ color: '#a0a0a0', fontSize: '12px' }}>
                ${item.price.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              style={{
                padding: '4px 8px',
                backgroundColor: 'transparent',
                border: '1px solid #d64045',
                color: '#d64045',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'all 200ms ease-in-out',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#d64045'
                ;(e.target as HTMLButtonElement).style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'transparent'
                ;(e.target as HTMLButtonElement).style.color = '#d64045'
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div style={{
        borderTop: '2px solid #404040',
        paddingTop: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '16px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          color: '#a0a0a0',
        }}>
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          color: '#a0a0a0',
        }}>
          <span>Tax (6.625%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#f4a460',
          paddingTop: '8px',
        }}>
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link href="/checkout" style={{
        display: 'block',
        width: '100%',
        padding: '12px',
        backgroundColor: '#f4a460',
        color: '#000',
        textAlign: 'center',
        borderRadius: '8px',
        fontWeight: '600',
        textDecoration: 'none',
        transition: 'all 200ms ease-in-out',
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget
        target.style.backgroundColor = '#fbbf24'
        target.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget
        target.style.backgroundColor = '#f4a460'
        target.style.transform = 'translateY(0)'
      }}
      >
        Proceed to Checkout
      </Link>
    </div>
  )
}
