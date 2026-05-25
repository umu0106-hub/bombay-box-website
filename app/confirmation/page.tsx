'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import BombayBoxLogo from '@/components/BombayBoxLogo'
import { RESTAURANT } from '@/lib/menu'

export default function ConfirmationPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <main className="container" style={{ padding: '4rem 1.25rem' }}>
            <div style={{ color: 'var(--cream-muted)' }}>Loading…</div>
          </main>
        }
      >
        <ConfirmationContent />
      </Suspense>
    </>
  )
}

function ConfirmationContent() {
  const params = useSearchParams()
  const orderNumber = params?.get('order') ?? generateFallbackOrder()
  const phone = params?.get('phone') ?? ''
  const [revealed, setRevealed] = useState(false)

  /* Trigger entrance animation on mount */
  useEffect(() => {
    const t = window.setTimeout(() => setRevealed(true), 80)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <main
      style={{
        minHeight: 'calc(100vh - 80px)',
        padding: '3rem 0 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background warm radial */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '900px',
          background:
            'radial-gradient(circle, rgba(255,172,48,0.18) 0%, rgba(255,107,26,0.05) 40%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(20px)',
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          maxWidth: '720px',
          textAlign: 'center',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s var(--ease-warm), transform 0.6s var(--ease-warm)',
        }}
      >
        {/* Animated checkmark */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(127,166,122,0.25) 0%, transparent 70%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
              <circle
                cx="36"
                cy="36"
                r="32"
                fill="rgba(127,166,122,0.12)"
                stroke="var(--sage)"
                strokeWidth="2.5"
                strokeDasharray="201"
                strokeDashoffset="201"
                style={{
                  animation: revealed ? 'checkCircle 0.7s var(--ease-warm) forwards' : 'none',
                  transformOrigin: 'center',
                  transform: 'rotate(-90deg)',
                }}
              />
              <path
                d="M 22 38 L 32 48 L 52 26"
                fill="none"
                stroke="var(--sage)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="48"
                strokeDashoffset="48"
                style={{
                  animation: revealed
                    ? 'checkDraw 0.5s var(--ease-warm) 0.5s forwards'
                    : 'none',
                }}
              />
            </svg>
            <style>{`
              @keyframes checkCircle {
                to { stroke-dashoffset: 0; }
              }
            `}</style>
          </div>
        </div>

        {/* Animated logo */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.8rem',
            transform: revealed ? 'scale(1)' : 'scale(0.85)',
            opacity: revealed ? 1 : 0,
            transition: 'all 0.6s var(--ease-warm) 0.2s',
          }}
        >
          <BombayBoxLogo variant="icon" size={88} energetic />
        </div>

        {/* Eyebrow */}
        <span
          className="f-mono"
          style={{
            fontSize: '0.75rem',
            color: 'var(--amber)',
            letterSpacing: '0.18em',
            display: 'block',
            marginBottom: '0.8rem',
          }}
        >
          ORDER #{orderNumber}
        </span>

        {/* Headline */}
        <h1
          className="f-display"
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            color: 'var(--cream)',
            margin: 0,
            marginBottom: '0.8rem',
            letterSpacing: '-0.01em',
            lineHeight: 1.05,
          }}
        >
          Your Bombay Box
          <br />
          is being packed!{' '}
          <span style={{ display: 'inline-block' }} aria-hidden="true">
            🔥
          </span>
        </h1>

        <p
          style={{
            fontFamily: 'var(--f-body)',
            color: 'var(--cream-muted)',
            fontSize: '1.1rem',
            lineHeight: 1.6,
            margin: '0 auto 2.5rem',
            maxWidth: '44ch',
          }}
        >
          We received your order and the kitchen is on it. Hot, fresh, and waiting for you in just a few minutes.
        </p>

        {/* Pickup details card */}
        <div
          className="card"
          style={{
            padding: '2rem 1.8rem',
            background:
              'linear-gradient(180deg, #2E2218 0%, #1C1410 100%)',
            border: '1px solid rgba(255,172,48,0.25)',
            boxShadow: 'var(--glow-amber)',
            textAlign: 'left',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem 2rem',
              alignItems: 'flex-start',
            }}
          >
            <DetailBlock
              icon="⏱"
              label="READY IN"
              value="20–25 min"
              accent
            />
            <DetailBlock
              icon="📍"
              label="PICK UP AT"
              value={RESTAURANT.location}
              sub={RESTAURANT.inside}
            />
            <DetailBlock
              icon="📞"
              label="QUESTIONS?"
              value={RESTAURANT.phone}
              isLink
              href={`tel:${RESTAURANT.phone}`}
            />
          </div>

          {phone && (
            <div
              style={{
                marginTop: '1.6rem',
                paddingTop: '1.4rem',
                borderTop: '1px solid rgba(255,245,230,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                flexWrap: 'wrap',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--saffron)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--f-body)',
                  fontSize: '0.95rem',
                  color: 'var(--cream)',
                }}
              >
                We&apos;ll text you at{' '}
                <span
                  className="f-bold"
                  style={{ color: 'var(--saffron)' }}
                >
                  {phone}
                </span>{' '}
                when your order is ready.
              </span>
            </div>
          )}
        </div>

        {/* Map link */}
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT.location)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.8rem 1.4rem',
            background: 'transparent',
            border: '1.5px solid rgba(255,172,48,0.4)',
            borderRadius: '999px',
            color: 'var(--amber)',
            fontFamily: 'var(--f-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '2.5rem',
            transition: 'all 0.25s var(--ease-warm)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,172,48,0.1)'
            e.currentTarget.style.borderColor = 'var(--amber)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(255,172,48,0.4)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Get Directions
        </a>

        {/* Helpful tips */}
        <div
          style={{
            display: 'grid',
            gap: '0.8rem',
            gridTemplateColumns: '1fr',
            maxWidth: '500px',
            margin: '0 auto 2.5rem',
            textAlign: 'left',
          }}
          className="tips-grid"
        >
          <style>{`
            @media (min-width: 640px) {
              .tips-grid { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>
          <TipRow icon="🛍️" text="Walk into Subzi Bazar and look for our counter" />
          <TipRow icon="📱" text="Show order #" highlight={orderNumber} />
          <TipRow icon="🆔" text="Have your name ready" />
          <TipRow icon="🌶️" text="Eat while it's hot" />
        </div>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.85rem',
            justifyContent: 'center',
          }}
        >
          <Link href="/menu" className="btn btn-primary">
            Order Again
          </Link>
          <Link href="/" className="btn btn-ghost">
            Back to Home
          </Link>
        </div>

        {/* Thank you */}
        <p
          className="f-mono"
          style={{
            fontSize: '0.7rem',
            color: 'var(--cream-faint)',
            letterSpacing: '0.16em',
            marginTop: '3rem',
            lineHeight: 1.8,
          }}
        >
          THANK YOU FOR CHOOSING BOMBAY BOX
          <br />
          MADE FRESH DAILY · ROCHELLE PARK, NJ
        </p>
      </div>
    </main>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function DetailBlock({
  icon,
  label,
  value,
  sub,
  accent,
  isLink,
  href,
}: {
  icon: string
  label: string
  value: string
  sub?: string
  accent?: boolean
  isLink?: boolean
  href?: string
}) {
  return (
    <div style={{ flex: '1 1 180px', minWidth: 0 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginBottom: '0.4rem',
        }}
      >
        <span style={{ fontSize: '1rem' }} aria-hidden="true">
          {icon}
        </span>
        <span
          className="f-mono"
          style={{
            fontSize: '0.65rem',
            color: 'var(--cream-faint)',
            letterSpacing: '0.14em',
          }}
        >
          {label}
        </span>
      </div>
      {isLink && href ? (
        <a
          href={href}
          className="f-bold"
          style={{
            fontSize: '1.1rem',
            color: accent ? 'var(--saffron)' : 'var(--cream)',
            letterSpacing: '0.01em',
            display: 'block',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--amber)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = accent ? 'var(--saffron)' : 'var(--cream)'
          }}
        >
          {value}
        </a>
      ) : (
        <div
          className="f-bold"
          style={{
            fontSize: accent ? '1.3rem' : '1.05rem',
            color: accent ? 'var(--saffron)' : 'var(--cream)',
            letterSpacing: '0.01em',
            lineHeight: 1.3,
            wordBreak: 'break-word',
          }}
        >
          {value}
        </div>
      )}
      {sub && (
        <div
          style={{
            fontFamily: 'var(--f-body)',
            fontSize: '0.85rem',
            color: 'var(--cream-muted)',
            marginTop: '2px',
          }}
        >
          {sub}
        </div>
      )}
    </div>
  )
}

function TipRow({
  icon,
  text,
  highlight,
}: {
  icon: string
  text: string
  highlight?: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        padding: '0.75rem 1rem',
        background: 'rgba(255,245,230,0.03)',
        border: '1px solid rgba(255,245,230,0.06)',
        borderRadius: '12px',
      }}
    >
      <span style={{ fontSize: '1.2rem', flexShrink: 0 }} aria-hidden="true">
        {icon}
      </span>
      <span
        style={{
          fontFamily: 'var(--f-body)',
          fontSize: '0.9rem',
          color: 'var(--cream-muted)',
          lineHeight: 1.4,
        }}
      >
        {text}
        {highlight && (
          <>
            {' '}
            <span
              className="f-bold"
              style={{
                color: 'var(--saffron)',
                fontSize: '0.9rem',
              }}
            >
              #{highlight}
            </span>
          </>
        )}
      </span>
    </div>
  )
}

function generateFallbackOrder(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}