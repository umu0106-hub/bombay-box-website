'use client'

/**
 * BombayBoxLogo — "The Bombay Lantern"
 *
 * A geometric lantern with an inner glow that gently pulses, and three
 * steam/light wisps that draw themselves upward and fade. The lantern's
 * "window" cutout reveals the glow — like food glowing from inside a box.
 *
 * variants:
 *   "full"     — icon + stacked BOMBAY/BOX wordmark + tagline
 *   "compact"  — icon + "BB" monogram
 *   "icon"     — icon only (favicon-safe)
 *
 * `energetic` boosts wisp amplitude/speed (used on confirmation page).
 */

import { useId } from 'react'

interface Props {
  variant?: 'full' | 'compact' | 'icon'
  size?: number
  energetic?: boolean
  className?: string
}

export default function BombayBoxLogo({
  variant = 'full',
  size = 64,
  energetic = false,
  className,
}: Props) {
  const uid = useId().replace(/:/g, '')
  const glowId = `bb-glow-${uid}`
  const innerGradId = `bb-inner-${uid}`
  const windowGradId = `bb-window-${uid}`

  /* Wisps — three sinuous paths rising from the lantern top. */
  const wispD1 = 'M50 14 C 46 6, 54 -2, 50 -12'
  const wispD2 = 'M40 18 C 36 10, 44 4, 38 -6'
  const wispD3 = 'M60 18 C 64 10, 56 4, 62 -6'

  const wispDur = energetic ? '1.6s' : '2.5s'
  const pulseDur = energetic ? '1.2s' : '2s'

  const Icon = (
    <svg
      viewBox="-20 -30 140 130"
      width={size}
      height={size}
      role="img"
      aria-label="Bombay Box"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Outer warm halo behind lantern */}
        <radialGradient id={glowId} cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#FFAC30" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#FF6B1A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FF6B1A" stopOpacity="0" />
        </radialGradient>

        {/* Inner pulsing glow inside the lantern */}
        <radialGradient id={innerGradId} cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#FFE9B8" />
          <stop offset="50%" stopColor="#FFAC30" />
          <stop offset="100%" stopColor="#FF6B1A" />
        </radialGradient>

        {/* Window cutout — bright hot center */}
        <linearGradient id={windowGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE9B8" />
          <stop offset="100%" stopColor="#FF6B1A" />
        </linearGradient>
      </defs>

      {/* Warm halo behind lantern */}
      <ellipse cx="50" cy="50" rx="55" ry="48" fill={`url(#${glowId})`} />

      {/* Steam / light wisps */}
      <g
        stroke="#FFAC30"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      >
        <path
          d={wispD1}
          strokeDasharray="100"
          strokeDashoffset="100"
          style={{
            animation: `steamRise ${wispDur} ease-out infinite`,
            animationDelay: '0s',
          }}
        />
        <path
          d={wispD2}
          strokeDasharray="100"
          strokeDashoffset="100"
          style={{
            animation: `steamRise ${wispDur} ease-out infinite`,
            animationDelay: '0.4s',
          }}
        />
        <path
          d={wispD3}
          strokeDasharray="100"
          strokeDashoffset="100"
          style={{
            animation: `steamRise ${wispDur} ease-out infinite`,
            animationDelay: '0.8s',
          }}
        />
      </g>

      {/* Lantern knob/handle at top */}
      <rect x="46" y="10" width="8" height="6" rx="1.5" fill="#FFF5E6" />
      <rect x="42" y="14" width="16" height="3" rx="1" fill="#FFF5E6" />

      {/* Lantern body — hexagonal silhouette, tapered upward */}
      {/* Path: top-left → top-right → upper-right shoulder → bottom-right →
                bottom-left → upper-left shoulder → close */}
      <path
        d="M30 22 L70 22 L80 38 L78 78 L22 78 L20 38 Z"
        fill="#1C1410"
        stroke="#FFF5E6"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Inner glow circle — pulses opacity */}
      <circle
        cx="50"
        cy="52"
        r="18"
        fill={`url(#${innerGradId})`}
        style={{
          animation: `glowPulse ${pulseDur} ease-in-out infinite alternate`,
          transformOrigin: '50px 52px',
        }}
      />

      {/* Window cutout — rectangular slit revealing inner glow */}
      <rect
        x="40"
        y="44"
        width="20"
        height="18"
        rx="2"
        fill={`url(#${windowGradId})`}
        stroke="#FFF5E6"
        strokeWidth="1.4"
      />

      {/* Vertical bars on window — gives it the lantern look */}
      <line x1="46" y1="44" x2="46" y2="62" stroke="#1C1410" strokeWidth="1.2" />
      <line x1="50" y1="44" x2="50" y2="62" stroke="#1C1410" strokeWidth="1.2" />
      <line x1="54" y1="44" x2="54" y2="62" stroke="#1C1410" strokeWidth="1.2" />

      {/* Decorative bottom band */}
      <line
        x1="24"
        y1="70"
        x2="76"
        y2="70"
        stroke="#FFAC30"
        strokeWidth="1"
        opacity="0.55"
      />
      <line
        x1="26"
        y1="74"
        x2="74"
        y2="74"
        stroke="#FFAC30"
        strokeWidth="0.8"
        opacity="0.35"
      />
    </svg>
  )

  if (variant === 'icon') {
    return <span className={className}>{Icon}</span>
  }

  if (variant === 'compact') {
    return (
      <span
        className={className}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}
      >
        {Icon}
        <span
          style={{
            fontFamily: 'var(--f-bold)',
            fontSize: '1.5rem',
            color: '#FF6B1A',
            letterSpacing: '0.02em',
            lineHeight: 1,
          }}
        >
          BB
        </span>
      </span>
    )
  }

  /* Full variant */
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.85rem' }}
    >
      {Icon}
      <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: 'var(--f-display)',
            fontSize: `${size * 0.28}px`,
            color: '#FFF5E6',
            letterSpacing: '0.06em',
            lineHeight: 1,
          }}
        >
          BOMBAY
        </span>
        <span
          style={{
            fontFamily: 'var(--f-bold)',
            fontSize: `${size * 0.45}px`,
            color: '#FF6B1A',
            letterSpacing: '0.01em',
            lineHeight: 0.95,
            marginTop: '2px',
          }}
        >
          BOX
        </span>
        <span
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: `${Math.max(8, size * 0.115)}px`,
            color: '#FFAC30',
            letterSpacing: '0.18em',
            marginTop: '6px',
            opacity: 0.85,
          }}
        >
          FRESH · DAILY · ROCHELLE PARK
        </span>
      </span>
    </span>
  )
}
