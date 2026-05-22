'use client'

import { useState } from 'react'
import {
  categories,
  formatPrice,
  getBadgeLabel,
  type MenuItem,
} from '@/lib/menu'
import { useCart } from './CartContext'

interface Props {
  item: MenuItem
}

export default function MenuCard({ item }: Props) {
  const { addItem, openCart } = useCart()
  const [pulsing, setPulsing] = useState(false)

  const catMeta = categories.find((c) => c.key === item.category)
  const bandColor = catMeta?.bandColor ?? '#FF6B1A'
  const emoji = item.emoji ?? catMeta?.emoji ?? '🍽️'

  const handleAdd = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    })
    setPulsing(true)
    setTimeout(() => setPulsing(false), 700)
  }

  return (
    <article
      className="card card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* Colored header band */}
      <div
        style={{
          background: `linear-gradient(135deg, ${bandColor} 0%, ${shade(bandColor, -18)} 100%)`,
          padding: '0.95rem 1.1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          minHeight: '60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 100% 0%, rgba(255,245,230,0.18) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <span
          aria-hidden="true"
          style={{ fontSize: '1.4rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
        >
          {emoji}
        </span>
        <h3
          style={{
            fontFamily: 'var(--f-bold)',
            fontSize: '0.95rem',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            color: 'var(--cream)',
            lineHeight: 1.2,
            margin: 0,
            textShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }}
        >
          {item.name}
        </h3>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          padding: '1.15rem 1.2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
        }}
      >
        {/* Badges */}
        {item.badges && item.badges.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {item.badges.map((b) => {
              const meta = getBadgeLabel(b)
              return (
                <span key={b} className={`badge ${meta.cls}`}>
                  {meta.label}
                </span>
              )
            })}
          </div>
        )}

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--f-body)',
            color: 'var(--cream-muted)',
            fontSize: '0.95rem',
            lineHeight: 1.55,
            margin: 0,
            flex: 1,
          }}
        >
          {item.description}
        </p>

        {item.servedWith && (
          <p
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--amber)',
              margin: 0,
            }}
          >
            {item.servedWith}
          </p>
        )}

        {/* Footer: price + add */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            marginTop: '0.4rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid rgba(255,245,230,0.08)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--f-bold)',
              fontSize: '1.45rem',
              color: 'var(--saffron)',
              letterSpacing: '-0.01em',
            }}
          >
            {formatPrice(item.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${item.name} to order`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.6rem 1.05rem',
              borderRadius: '999px',
              background: pulsing ? 'var(--amber)' : 'var(--saffron)',
              color: 'var(--charcoal)',
              fontFamily: 'var(--f-bold)',
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              minHeight: '40px',
              transition: 'all 0.25s var(--ease-warm)',
              animation: pulsing ? 'pulseSaffron 0.7s ease' : 'none',
              boxShadow: '0 6px 18px -6px rgba(255,107,26,0.55)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </article>
  )
}

/** Shade a hex color by percentage (negative darkens). */
function shade(hex: string, pct: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  let r = (num >> 16) & 0xff
  let g = (num >> 8) & 0xff
  let b = num & 0xff
  const factor = pct / 100
  r = clamp(Math.round(r + r * factor))
  g = clamp(Math.round(g + g * factor))
  b = clamp(Math.round(b + b * factor))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
function clamp(n: number) { return Math.max(0, Math.min(255, n)) }
