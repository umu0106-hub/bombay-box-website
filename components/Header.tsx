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
        background: scrolled
          ? 'rgba(28, 20, 16, 0.92)'
          : 'rgba(28, 20, 16, 0.4)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: scrolled
          ? '1px solid rgba(255,245,230,0.08)'
          : '1px solid transparent',
        transition: 'background 0.3s var(--ease-warm), border-color 0.3s var(--ease-warm)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '0.7rem 1.25rem' : '1.1rem 1.25rem',
          transition: 'padding 0.3s var(--ease-warm)',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Bombay Box — home"
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <span className="header-logo-full">
            <BombayBoxLogo variant="full" size={56} />
          </span>
          <span className="header-logo-compact">
            <BombayBoxLogo variant="compact" size={44} />
          </span>
        </Link>

        {/* Nav links — desktop only */}
        <nav
          className="header-nav"
          aria-label="Primary"
          style={{
            display: 'none',
            gap: '2.2rem',
            alignItems: 'center',
          }}
        >
          <Link href="/" className="header-link">Home</Link>
          <Link href="/menu" className="header-link">Menu</Link>
          <a href={`tel:+12015461558`} className="header-link">Call</a>
          <a
            href="https://maps.google.com/?q=194+Rt+17+N+Rochelle+Park+NJ"
            target="_blank"
            rel="noopener noreferrer"
            className="header-link"
          >
            Directions
          </a>
        </nav>

        {/* Cart trigger */}
        <button
          type="button"
          onClick={openCart}
          aria-label={`Cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            padding: '0.6rem 1rem',
            borderRadius: '999px',
            border: '1.5px solid rgba(255,245,230,0.18)',
            background: 'rgba(28,20,16,0.6)',
            color: 'var(--cream)',
            fontFamily: 'var(--f-bold)',
            fontSize: '0.82rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            minHeight: '44px',
            transition: 'all 0.3s var(--ease-warm)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 107, 26, 0.18)'
            e.currentTarget.style.borderColor = '#FF6B1A'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(28,20,16,0.6)'
            e.currentTarget.style.borderColor = 'rgba(255,245,230,0.18)'
          }}
        >
          {/* Cart icon — animates on bump */}
          <span
            key={shake}
            style={{
              display: 'inline-block',
              animation: shake > 0 ? 'cartShake 0.6s ease' : 'none',
              transformOrigin: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h2l2.5 12h11l2.5-9H6.5" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>
          </span>
          <span className="cart-label">Cart</span>
          {itemCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                minWidth: '22px',
                height: '22px',
                padding: '0 6px',
                borderRadius: '999px',
                background: 'var(--saffron)',
                color: 'var(--charcoal)',
                fontFamily: 'var(--f-bold)',
                fontSize: '0.72rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px -4px rgba(255,107,26,0.6)',
              }}
            >
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {/* Local style for header responsiveness */}
      <style>{`
        .header-logo-full { display: inline-flex; }
        .header-logo-compact { display: none; }
        .cart-label { display: inline; }
        @media (max-width: 640px) {
          .header-logo-full { display: none; }
          .header-logo-compact { display: inline-flex; }
          .cart-label { display: none; }
        }
        @media (min-width: 880px) {
          .header-nav { display: inline-flex !important; }
        }
        .header-link {
          font-family: var(--f-mono);
          font-size: 0.75rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--cream-muted);
          transition: color 0.2s;
          padding: 0.5rem 0;
        }
        .header-link:hover { color: var(--saffron); }
      `}</style>
    </header>
  )
}
