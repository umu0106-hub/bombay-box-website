'use client'

import { useState } from 'react'
import { useCart } from './CartContext'
import type { MenuItem } from '@/lib/menu'

interface MenuCardProps {
  item: MenuItem
}

export default function MenuCard({ item }: MenuCardProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      price: item.price,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const spiceIndicator = '🌶️'.repeat(item.spiceLevel)

  return (
    <div
      style={{
        backgroundColor: '#2d2d2d',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #404040',
        transition: 'all 200ms ease-in-out',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = '#f4a460'
        el.style.boxShadow = '0 10px 25px rgba(244, 164, 96, 0.1)'
        el.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = '#404040'
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Image Placeholder */}
      <div style={{
        width: '100%',
        height: '200px',
        backgroundColor: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '64px',
      }}>
        🍛
      </div>

      {/* Content */}
      <div style={{
        padding: '16px',
      }}>
        {/* Title */}
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#f0f0f0',
          marginBottom: '8px',
        }}>
          {item.name}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '14px',
          color: '#a0a0a0',
          marginBottom: '12px',
          lineHeight: '1.4',
        }}>
          {item.description}
        </p>

        {/* Meta */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '12px',
          fontSize: '12px',
          color: '#a0a0a0',
        }}>
          {item.vegetarian && <span>🥬 Vegetarian</span>}
          <span>{spiceIndicator}</span>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#f4a460',
          }}>
            ${item.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            style={{
              padding: '8px 12px',
              backgroundColor: added ? '#2d5a2d' : '#f4a460',
              color: '#000',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 150ms ease-in-out',
              fontSize: '14px',
            }}
            onMouseEnter={(e) => {
              if (!added) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#fbbf24'
              }
            }}
            onMouseLeave={(e) => {
              if (!added) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f4a460'
              }
            }}
          >
            {added ? '✓ Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
