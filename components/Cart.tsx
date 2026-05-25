'use client'

/**
 * Cart — slide-in panel (right on desktop, bottom sheet on mobile).
 *
 * Shows line items with customizations, qty controls, subtotal/tax/total,
 * and a checkout CTA. Closes on backdrop click, Escape, or after navigating
 * to checkout.
 */

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { formatPrice, RESTAURANT } from '@/lib/menu'
import { useCart } from './CartContext'

export default function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    tax,
    total,
    itemCount,
    isOpen,
    closeCart,
  } = useCart()

  const panelRef = useRef<HTMLDivElement>(null)

  /* Lock body scroll while open + close on Escape */
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, closeCart])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        aria-hidden={!isOpen}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s var(--ease-warm)',
          zIndex: 200,
        }}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        aria-hidden={!isOpen}
        className="cart-panel"
        style={{
          position: 'fixed',
          zIndex: 210,
          background: 'var(--charcoal-2)',
          color: 'var(--cream)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-20px 0 60px -20px rgba(0,0,0,0.8)',
          transition: 'transform 0.4s var(--ease-warm), opacity 0.3s',
        }}
      >
        <style>{`
          .cart-panel {
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            max-width: 460px;
            transform: ${isOpen ? 'translateX(0)' : 'translateX(100%)'};
          }
          @media (max-width: 640px) {
            .cart-panel {
              top: auto;
              left: 0;
              right: 0;
              bottom: 0;
              max-width: 100%;
              max-height: 88vh;
              border-radius: 20px 20px 0 0;
              transform: ${isOpen ? 'translateY(0)' : 'translateY(100%)'};
            }
          }
        `}</style>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.4rem 1.5rem',
            borderBottom: '1px solid rgba(255,245,230,0.08)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                color: 'var(--gold)',
              }}
            >
              YOUR ORDER
            </div>
            <h2
              style={{
                fontFamily: 'var(--f-display)',
                fontSize: '1.6rem',
                margin: 0,
                marginTop: '4px',
              }}
            >
              {itemCount === 0
                ? 'Your bowl is empty'
                : `${itemCount} item${itemCount === 1 ? '' : 's'}`}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255,245,230,0.06)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cream)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,245,230,0.12)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,245,230,0.06)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>
        </div>

        {/* Body — scrollable */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '3rem 1rem',
                gap: '1rem',
              }}
            >
              <div style={{ fontSize: '3rem' }} aria-hidden="true">🍱</div>
              <div
                style={{
                  fontFamily: 'var(--f-body)',
                  color: 'var(--cream-muted)',
                  fontSize: '1rem',
                  maxWidth: '280px',
                  lineHeight: 1.6,
                }}
              >
                Nothing here yet. Head to the menu and start building something delicious.
              </div>
              <Link
                href="/menu"
                onClick={closeCart}
                className="btn btn-primary"
                style={{ marginTop: '0.8rem' }}
              >
                See the Menu
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--charcoal)',
                  border: '1px solid rgba(255,245,230,0.08)',
                  borderRadius: '14px',
                  padding: '1rem 1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--f-bold)',
                      fontSize: '0.95rem',
                      color: 'var(--cream)',
                      letterSpacing: '0.02em',
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--f-bold)',
                      color: 'var(--gold)',
                      fontSize: '1rem',
                      flexShrink: 0,
                    }}
                  >
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                {item.customizations && (
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                    }}
                  >
                    {item.customizations.sauces && item.customizations.sauces.length > 0 && (
                      <li style={lineMono}>Sauces · {item.customizations.sauces.join(', ')}</li>
                    )}
                    {item.customizations.extraSauces && item.customizations.extraSauces.length > 0 && (
                      <li style={{ ...lineMono, color: 'var(--gold)' }}>
                        Extra · {item.customizations.extraSauces.join(', ')}
                      </li>
                    )}
                    {item.customizations.toppings && item.customizations.toppings.length > 0 && (
                      <li style={lineMono}>
                        Toppings · {item.customizations.toppings.length} added
                      </li>
                    )}
                  </ul>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '0.3rem',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      border: '1px solid rgba(255,245,230,0.14)',
                      borderRadius: '999px',
                      padding: '2px',
                    }}
                  >
                    <QtyBtn
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      label="Decrease quantity"
                    >−</QtyBtn>
                    <span
                      style={{
                        minWidth: '34px',
                        textAlign: 'center',
                        fontFamily: 'var(--f-bold)',
                        fontSize: '0.95rem',
                      }}
                    >
                      {item.quantity}
                    </span>
                    <QtyBtn
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      label="Increase quantity"
                    >+</QtyBtn>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--cream-muted)',
                      padding: '0.4rem 0.7rem',
                      minHeight: '36px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--terracotta)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cream-muted)' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / totals */}
        {items.length > 0 && (
          <div
            style={{
              padding: '1.4rem 1.5rem',
              borderTop: '1px solid rgba(255,245,230,0.08)',
              background: 'var(--charcoal)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
            }}
          >
            <TotalRow label="Subtotal" value={formatPrice(subtotal)} />
            <TotalRow label="NJ Sales Tax (6.625%)" value={formatPrice(tax)} muted />
            <TotalRow label="Total" value={formatPrice(total)} emphasized />

            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '1.1rem',
                fontSize: '1rem',
                marginTop: '0.6rem',
              }}
            >
              Proceed to Checkout →
            </Link>
            <p
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: 'var(--cream-faint)',
                textAlign: 'center',
                margin: 0,
                marginTop: '0.3rem',
              }}
            >
              PICKUP AT {RESTAURANT.address.toUpperCase()}
            </p>
          </div>
        )}
      </aside>
    </>
  )
}

const lineMono: React.CSSProperties = {
  fontFamily: 'var(--f-mono)',
  fontSize: '0.7rem',
  color: 'var(--cream-muted)',
  letterSpacing: '0.04em',
  lineHeight: 1.5,
}

function QtyBtn({
  onClick,
  label,
  children,
}: {
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--cream)',
        fontFamily: 'var(--f-bold)',
        fontSize: '1.1rem',
        transition: 'background 0.2s, color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--terracotta)'
        e.currentTarget.style.color = 'var(--white)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = 'var(--cream)'
      }}
    >
      {children}
    </button>
  )
}

function TotalRow({
  label,
  value,
  muted,
  emphasized,
}: {
  label: string
  value: string
  muted?: boolean
  emphasized?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingTop: emphasized ? '0.6rem' : 0,
        borderTop: emphasized ? '1px solid rgba(255,245,230,0.1)' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: emphasized ? 'var(--f-bold)' : 'var(--f-mono)',
          fontSize: emphasized ? '1rem' : '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: muted ? 'var(--cream-faint)' : 'var(--cream)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--f-bold)',
          fontSize: emphasized ? '1.5rem' : '0.95rem',
          color: emphasized ? 'var(--gold)' : muted ? 'var(--cream-muted)' : 'var(--cream)',
        }}
      >
        {value}
      </span>
    </div>
  )
}