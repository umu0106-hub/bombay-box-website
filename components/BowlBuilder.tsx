'use client'

import { useState } from 'react'
import { proteins, sauces, proteinNames, sauceNames, proteinPrices, saucePrices } from '@/lib/menu'
import type { Protein, Sauce } from '@/lib/menu'
import { useCart } from './CartContext'

export default function BowlBuilder() {
  const { addItem } = useCart()
  const [selectedProtein, setSelectedProtein] = useState<Protein>('chicken')
  const [selectedSauce, setSelectedSauce] = useState<Sauce>('tikka')
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')

  const basePrice = 11.99
  const proteinPrice = proteinPrices[selectedProtein]
  const saucePrice = saucePrices[selectedSauce]
  const totalPrice = basePrice + proteinPrice + saucePrice

  const handleAddToCart = () => {
    const itemName = `Custom ${proteinNames[selectedProtein]} ${sauceNames[selectedSauce]} Bowl`
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `custom-bowl-${Date.now()}-${i}`,
        name: itemName,
        price: totalPrice,
      })
    }
    setMessage('Added to cart!')
    setTimeout(() => setMessage(''), 2000)
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
        🥣 Build Your Bowl
      </h3>

      {/* Protein Selection */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          color: '#f0f0f0',
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '8px',
        }}>
          Protein
        </label>
        <select
          value={selectedProtein}
          onChange={(e) => setSelectedProtein(e.target.value as Protein)}
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: '#1a1a1a',
            border: '1px solid #404040',
            borderRadius: '6px',
            color: '#f0f0f0',
          }}
        >
          {proteins.map((protein) => (
            <option key={protein} value={protein}>
              {proteinNames[protein]} (+${proteinPrices[protein].toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      {/* Sauce Selection */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          color: '#f0f0f0',
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '8px',
        }}>
          Sauce
        </label>
        <select
          value={selectedSauce}
          onChange={(e) => setSelectedSauce(e.target.value as Sauce)}
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: '#1a1a1a',
            border: '1px solid #404040',
            borderRadius: '6px',
            color: '#f0f0f0',
          }}
        >
          {sauces.map((sauce) => (
            <option key={sauce} value={sauce}>
              {sauceNames[sauce]} (+${saucePrices[sauce].toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      {/* Quantity */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          color: '#f0f0f0',
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '8px',
        }}>
          Quantity
        </label>
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}>
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #404040',
              color: '#f0f0f0',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            −
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            style={{
              flex: 1,
              padding: '8px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #404040',
              borderRadius: '4px',
              color: '#f0f0f0',
              textAlign: 'center',
            }}
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #404040',
              color: '#f0f0f0',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Price */}
      <div style={{
        padding: '12px',
        backgroundColor: '#1a1a1a',
        borderRadius: '6px',
        marginBottom: '16px',
        textAlign: 'center',
      }}>
        <p style={{ color: '#a0a0a0', fontSize: '12px', marginBottom: '4px' }}>Bowl Price</p>
        <p style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#f4a460',
        }}>
          ${totalPrice.toFixed(2)}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#f4a460',
          color: '#000',
          fontWeight: '600',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 200ms ease-in-out',
          marginBottom: message ? '8px' : '0',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#fbbf24'
          ;(e.target as HTMLButtonElement).style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#f4a460'
          ;(e.target as HTMLButtonElement).style.transform = 'translateY(0)'
        }}
      >
        Add to Cart
      </button>

      {message && (
        <p style={{
          color: '#f4a460',
          textAlign: 'center',
          fontSize: '14px',
        }}>
          ✓ {message}
        </p>
      )}
    </div>
  )
}
