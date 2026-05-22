'use client'

/**
 * HeroAnimation — magazine-cover food visual.
 *
 * A deep bowl seen in 3/4 perspective, filled with layered illustrated
 * "food" (rice, sauce, toppings). Steam wisps rise from the surface.
 * A warm radial glow beneath the bowl, and a faint tile pattern behind.
 *
 * Pure CSS/SVG — no images.
 */

import { useId } from 'react'

export default function HeroAnimation() {
  const uid = useId().replace(/:/g, '')
  const bowlGradId = `hero-bowl-${uid}`
  const riceGradId = `hero-rice-${uid}`
  const sauceGradId = `hero-sauce-${uid}`
  const innerGlowId = `hero-inner-${uid}`
  const tableShadowId = `hero-shadow-${uid}`
  const tileId = `hero-tile-${uid}`

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      {/* Tile pattern behind */}
      <svg
        viewBox="0 0 400 400"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.04,
        }}
      >
        <defs>
          <pattern
            id={tileId}
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="30" cy="30" r="22" fill="none" stroke="#FF6B1A" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="22" fill="none" stroke="#FF6B1A" strokeWidth="1.2" />
            <circle cx="60" cy="0" r="22" fill="none" stroke="#FF6B1A" strokeWidth="1.2" />
            <circle cx="0" cy="60" r="22" fill="none" stroke="#FF6B1A" strokeWidth="1.2" />
            <circle cx="60" cy="60" r="22" fill="none" stroke="#FF6B1A" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${tileId})`} />
      </svg>

      {/* Amber glow behind bowl */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '58%',
          transform: 'translate(-50%, -50%)',
          width: '85%',
          height: '60%',
          background:
            'radial-gradient(ellipse at center, rgba(255,172,48,0.30) 0%, rgba(255,107,26,0.12) 40%, transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      {/* Drift wrapper */}
      <div
        className="drift"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          aspectRatio: '1 / 1',
        }}
      >
        <svg
          viewBox="0 0 400 400"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            {/* Bowl outer gradient — dark ceramic with warm rim light */}
            <linearGradient id={bowlGradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a2e1c" />
              <stop offset="55%" stopColor="#2a1a10" />
              <stop offset="100%" stopColor="#0d0805" />
            </linearGradient>

            {/* Rice — warm cream with orange tint */}
            <radialGradient id={riceGradId} cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFEBC4" />
              <stop offset="60%" stopColor="#FFD98A" />
              <stop offset="100%" stopColor="#E89B3F" />
            </radialGradient>

            {/* Sauce pool — rich tomato cream */}
            <radialGradient id={sauceGradId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF8A3D" />
              <stop offset="60%" stopColor="#D4521F" />
              <stop offset="100%" stopColor="#8B2A0C" />
            </radialGradient>

            {/* Inner bowl shadow */}
            <radialGradient id={innerGlowId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000" stopOpacity="0" />
              <stop offset="70%" stopColor="#000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.6" />
            </radialGradient>

            <radialGradient id={tableShadowId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Drop shadow ellipse under bowl */}
          <ellipse
            cx="200"
            cy="345"
            rx="160"
            ry="20"
            fill={`url(#${tableShadowId})`}
          />

          {/* Steam — 5 wisps rising from bowl surface */}
          <g
            stroke="#FFF5E6"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          >
            <path
              d="M150 130 C 140 100, 160 80, 145 40"
              strokeDasharray="120"
              strokeDashoffset="120"
              style={{ animation: 'steamRise 2.6s ease-out infinite', animationDelay: '0s' }}
            />
            <path
              d="M180 120 C 170 90, 190 70, 175 30"
              strokeDasharray="120"
              strokeDashoffset="120"
              style={{ animation: 'steamRise 2.6s ease-out infinite', animationDelay: '0.4s' }}
            />
            <path
              d="M210 115 C 220 85, 200 60, 215 20"
              strokeDasharray="120"
              strokeDashoffset="120"
              style={{ animation: 'steamRise 2.6s ease-out infinite', animationDelay: '0.8s' }}
            />
            <path
              d="M240 120 C 250 90, 230 65, 245 25"
              strokeDasharray="120"
              strokeDashoffset="120"
              style={{ animation: 'steamRise 2.6s ease-out infinite', animationDelay: '1.2s' }}
            />
            <path
              d="M270 130 C 260 105, 280 80, 265 45"
              strokeDasharray="120"
              strokeDashoffset="120"
              style={{ animation: 'steamRise 2.6s ease-out infinite', animationDelay: '1.6s' }}
            />
          </g>

          {/* Bowl body — outer ceramic */}
          {/* Top ellipse rim slightly larger than bowl bottom for 3/4 perspective */}
          <path
            d="M 60 175
               Q 60 320, 200 335
               Q 340 320, 340 175
               Z"
            fill={`url(#${bowlGradId})`}
            stroke="#5a3a22"
            strokeWidth="2"
          />

          {/* Inside of bowl — opening ellipse */}
          <ellipse cx="200" cy="175" rx="140" ry="35" fill="#1a0e07" />

          {/* Rice layer (bottom) */}
          <ellipse cx="200" cy="172" rx="128" ry="30" fill={`url(#${riceGradId})`} />

          {/* Rice texture grains */}
          <g fill="#FFD98A" opacity="0.85">
            <ellipse cx="160" cy="168" rx="3" ry="1.4" />
            <ellipse cx="175" cy="174" rx="3" ry="1.4" transform="rotate(15 175 174)" />
            <ellipse cx="195" cy="166" rx="3" ry="1.4" transform="rotate(-10 195 166)" />
            <ellipse cx="220" cy="172" rx="3" ry="1.4" transform="rotate(25 220 172)" />
            <ellipse cx="240" cy="168" rx="3" ry="1.4" />
            <ellipse cx="155" cy="178" rx="3" ry="1.4" transform="rotate(-20 155 178)" />
            <ellipse cx="230" cy="180" rx="3" ry="1.4" transform="rotate(10 230 180)" />
          </g>

          {/* Sauce pool — sits in the middle */}
          <ellipse cx="200" cy="170" rx="80" ry="18" fill={`url(#${sauceGradId})`} opacity="0.92" />

          {/* Sauce swirl highlights */}
          <path
            d="M 155 168 Q 180 162, 200 168 Q 220 174, 245 168"
            stroke="#FFEBC4"
            strokeWidth="1.4"
            fill="none"
            opacity="0.5"
          />

          {/* Toppings — colored dots scattered on surface */}
          {/* Chickpea (cream-amber) */}
          <circle cx="170" cy="162" r="5.5" fill="#E8C079" />
          <circle cx="175" cy="160" r="2" fill="#fff" opacity="0.5" />
          <circle cx="225" cy="165" r="5.5" fill="#E8C079" />
          <circle cx="228" cy="163" r="2" fill="#fff" opacity="0.5" />
          <circle cx="200" cy="158" r="5.5" fill="#E8C079" />
          <circle cx="203" cy="156" r="2" fill="#fff" opacity="0.5" />

          {/* Green herb flecks */}
          <ellipse cx="160" cy="172" rx="2.5" ry="1" fill="#7FA67A" transform="rotate(30 160 172)" />
          <ellipse cx="185" cy="175" rx="2.5" ry="1" fill="#7FA67A" transform="rotate(-15 185 175)" />
          <ellipse cx="215" cy="170" rx="2.5" ry="1" fill="#7FA67A" transform="rotate(45 215 170)" />
          <ellipse cx="240" cy="174" rx="2.5" ry="1" fill="#7FA67A" />
          <ellipse cx="195" cy="178" rx="2.5" ry="1" fill="#7FA67A" transform="rotate(20 195 178)" />

          {/* Cream drizzle squiggle */}
          <path
            d="M 165 170 Q 180 164, 195 170 Q 210 176, 225 170 Q 235 165, 245 172"
            stroke="#FFF5E6"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.92"
          />

          {/* Papad chip sticking up */}
          <path
            d="M 240 155 L 260 148 L 262 158 L 244 165 Z"
            fill="#E8B96F"
            stroke="#8B5A1E"
            strokeWidth="0.8"
          />
          <path
            d="M 145 158 L 160 145 L 168 153 L 152 168 Z"
            fill="#E8B96F"
            stroke="#8B5A1E"
            strokeWidth="0.8"
          />

          {/* Inner bowl shadow vignette */}
          <ellipse cx="200" cy="175" rx="140" ry="35" fill={`url(#${innerGlowId})`} opacity="0.7" />

          {/* Rim highlight on bowl */}
          <path
            d="M 65 175 Q 65 165, 200 160 Q 335 165, 335 175"
            fill="none"
            stroke="#FFAC30"
            strokeWidth="1.5"
            opacity="0.6"
          />

          {/* Right-side bowl warm rim highlight */}
          <path
            d="M 335 175 Q 333 240, 290 305"
            stroke="#FF6B1A"
            strokeWidth="2"
            fill="none"
            opacity="0.55"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
