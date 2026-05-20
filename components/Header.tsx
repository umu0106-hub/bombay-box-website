'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import BombayBoxLogo from './BombayBoxLogo'
import { useCart } from './CartContext'

export default function Header() {
  const { itemCount, openCart, bumpKey } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [shake, setShake] = useState(0)

  /* Compact header after scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Trigger shake animation when item added */
  useEffect(() => {
    if (bumpKey > 0) setShake((s) => s + 1)
  }, [bumpKey])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
        backgroundColor: scrolled ? 'rgba(28, 20, 16, 0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255, 107, 26, 0.2)' : 'none',
        transition: 'all 300ms var(--ease-smooth)',
        padding: scrolled ? '0.75rem 1rem' : '1rem',
      }}
    >
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          gap: '1rem',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <BombayBoxLogo compact={scrolled} />
        </Link>

        {/* Nav Links */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Link
            href="/menu"
            style={{
              color: 'var(--cream)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '500',
              transition: 'color 200ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saffron)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--cream)')}
          >
            Menu
          </Link>
          <a
            href="tel:201-546-1558"
            style={{
              color: 'var(--amber)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '600',
              transition: 'color 200ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saffron)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--amber)')}
          >
            📞 201-546-1558
          </a>
        </div>

        {/* Cart Button */}
        <button
          onClick={openCart}
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: '2px solid var(--saffron)',
            backgroundColor: 'transparent',
            color: 'var(--saffron)',
            fontSize: '1.25rem',
            cursor: 'pointer',
            transition: 'all 200ms var(--ease-smooth)',
            animation: shake > 0 ? `headerCartShake 400ms ease-out` : 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--saffron)'
            e.currentTarget.style.color = 'var(--charcoal)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = 'var(--saffron)'
          }}
        >
          🛒
          {itemCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'var(--rose)',
                color: 'var(--cream)',
                fontSize: '0.7rem',
                fontWeight: '700',
              }}
            >
              {itemCount}
            </span>
          )}
        </button>
      </nav>

      <style>{`
        @keyframes headerCartShake {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(5deg); }
        }
      `}</style>
    </header>
  )
}
