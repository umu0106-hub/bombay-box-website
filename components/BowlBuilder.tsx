'use client'

/**
 * BowlBuilder — interactive 4-step bowl configurator.
 *
 * Step 1: Base (always Basmati — informational)
 * Step 2: Protein (one of three) — required to advance
 * Step 3: Sauces (any 2 free; +$1.50 each beyond)
 * Step 4: Toppings (all included)
 *
 * Live price + visual bowl preview update as user selects.
 */

import { useMemo, useState } from 'react'
import {
  bowlBase,
  bowlBasePrice,
  bowlProteins,
  bowlSauces,
  bowlToppings,
  EXTRA_SAUCE_PRICE,
  formatPrice,
} from '@/lib/menu'
import { useCart } from './CartContext'

type StepIdx = 1 | 2 | 3 | 4

export default function BowlBuilder() {
  const { addItem, openCart } = useCart()
  const [step, setStep] = useState<StepIdx>(1)
  const [protein, setProtein] = useState<string | null>(null)
  const [sauces, setSauces] = useState<string[]>([])
  const [toppings, setToppings] = useState<string[]>(
    bowlToppings.map((t) => t.id), // all included by default
  )

  const proteinComplete = protein !== null
  const saucesComplete = sauces.length >= 1
  const stepCompletion = {
    1: true,
    2: proteinComplete,
    3: saucesComplete,
    4: true,
  } as const

  /* Pricing */
  const price = useMemo(() => {
    if (!protein) return 11.99
    const base = bowlBasePrice(protein)
    const extras = Math.max(0, sauces.length - 2) * EXTRA_SAUCE_PRICE
    return Math.round((base + extras) * 100) / 100
  }, [protein, sauces])

  /* Sauce selection toggle */
  const toggleSauce = (id: string) => {
    setSauces((cur) =>
      cur.includes(id) ? cur.filter((s) => s !== id) : [...cur, id],
    )
  }
  const toggleTopping = (id: string) => {
    setToppings((cur) =>
      cur.includes(id) ? cur.filter((s) => s !== id) : [...cur, id],
    )
  }

  const canAddToCart = proteinComplete && saucesComplete

  const handleAddBowl = () => {
    if (!canAddToCart || !protein) return
    const proteinName = bowlProteins.find((p) => p.id === protein)?.name ?? ''
    const sauceNames = bowlSauces
      .filter((s) => sauces.includes(s.id))
      .map((s) => s.name)
    const toppingNames = bowlToppings
      .filter((t) => toppings.includes(t.id))
      .map((t) => t.name)
    const extraSauces = sauces.slice(2).map((id) => {
      return bowlSauces.find((s) => s.id === id)?.name ?? ''
    })

    addItem({
      menuItemId: `bowl-${protein}`,
      name: `${proteinName} Bowl`,
      price,
      quantity: 1,
      customizations: {
        protein: proteinName,
        sauces: sauceNames,
        toppings: toppingNames,
        extraSauces: extraSauces.length > 0 ? extraSauces : undefined,
      },
    })
    openCart()
  }

  return (
    <section
      aria-label="Build your bowl"
      style={{
        display: 'grid',
        gap: '2.5rem',
        gridTemplateColumns: '1fr',
      }}
      className="bowl-builder-grid"
    >
      <style>{`
        @media (min-width: 960px) {
          .bowl-builder-grid {
            grid-template-columns: 1.3fr 1fr !important;
            align-items: start;
          }
          .bowl-preview-sticky { position: sticky; top: 140px; }
        }
      `}</style>

      {/* LEFT: Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <StepCard
          number="01"
          title="Base"
          active={step === 1}
          complete={stepCompletion[1]}
          onActivate={() => setStep(1)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '12px',
                background:
                  'linear-gradient(135deg, #FFEBC4 0%, #E89B3F 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
              }}
              aria-hidden="true"
            >
              🍚
            </div>
            <div>
              <div style={{ fontFamily: 'var(--f-bold)', fontSize: '1rem', color: 'var(--cream)' }}>
                {bowlBase.name}
              </div>
              <div style={{ fontFamily: 'var(--f-body)', color: 'var(--cream-muted)', fontSize: '0.9rem' }}>
                {bowlBase.description}
              </div>
              <span
                className="badge badge-outline"
                style={{ marginTop: '0.5rem' }}
              >
                Always Included
              </span>
            </div>
          </div>
        </StepCard>

        <StepCard
          number="02"
          title="Protein · Choose 1"
          active={step === 2}
          complete={stepCompletion[2]}
          onActivate={() => setStep(2)}
        >
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            {bowlProteins.map((p) => {
              const selected = protein === p.id
              return (
                <OptionRow
                  key={p.id}
                  label={p.name}
                  description={p.description}
                  selected={selected}
                  rightSlot={
                    p.upcharge > 0 ? (
                      <span style={{ color: 'var(--amber)', fontFamily: 'var(--f-bold)', fontSize: '0.85rem' }}>
                        +{formatPrice(p.upcharge)}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--cream-faint)', fontFamily: 'var(--f-mono)', fontSize: '0.7rem' }}>
                        INCLUDED
                      </span>
                    )
                  }
                  onClick={() => {
                    setProtein(p.id)
                    setStep(3)
                  }}
                />
              )
            })}
          </div>
        </StepCard>

        <StepCard
          number="03"
          title="Sauces · Choose 2 free"
          subtitle={`+${formatPrice(EXTRA_SAUCE_PRICE)} per extra sauce`}
          active={step === 3}
          complete={stepCompletion[3]}
          locked={!proteinComplete}
          onActivate={() => proteinComplete && setStep(3)}
        >
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            {bowlSauces.map((s) => {
              const selected = sauces.includes(s.id)
              const index = sauces.indexOf(s.id)
              const isExtra = selected && index >= 2
              return (
                <OptionRow
                  key={s.id}
                  label={s.name}
                  description={s.description}
                  selected={selected}
                  rightSlot={
                    isExtra ? (
                      <span style={{ color: 'var(--amber)', fontFamily: 'var(--f-bold)', fontSize: '0.85rem' }}>
                        +{formatPrice(EXTRA_SAUCE_PRICE)}
                      </span>
                    ) : selected ? (
                      <span style={{ color: 'var(--sage)', fontFamily: 'var(--f-mono)', fontSize: '0.7rem' }}>
                        ✓ SELECTED
                      </span>
                    ) : (
                      <span style={{ color: 'var(--cream-faint)', fontFamily: 'var(--f-mono)', fontSize: '0.7rem' }}>
                        FREE
                      </span>
                    )
                  }
                  onClick={() => toggleSauce(s.id)}
                  multi
                />
              )
            })}
            {sauces.length > 0 && (
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--cream-muted)',
                  letterSpacing: '0.08em',
                  marginTop: '0.3rem',
                }}
              >
                {sauces.length} of 2 free selected
                {sauces.length > 2 && ` · ${sauces.length - 2} extra`}
              </div>
            )}
          </div>
        </StepCard>

        <StepCard
          number="04"
          title="Toppings · All included"
          active={step === 4}
          complete={stepCompletion[4]}
          locked={!saucesComplete}
          onActivate={() => saucesComplete && setStep(4)}
        >
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            {bowlToppings.map((t) => {
              const selected = toppings.includes(t.id)
              return (
                <OptionRow
                  key={t.id}
                  label={t.name}
                  description={t.description}
                  selected={selected}
                  rightSlot={
                    selected ? (
                      <span style={{ color: 'var(--sage)', fontFamily: 'var(--f-mono)', fontSize: '0.7rem' }}>
                        ✓ ADDED
                      </span>
                    ) : (
                      <span style={{ color: 'var(--cream-faint)', fontFamily: 'var(--f-mono)', fontSize: '0.7rem' }}>
                        TAP TO ADD
                      </span>
                    )
                  }
                  onClick={() => toggleTopping(t.id)}
                  multi
                />
              )
            })}
          </div>
        </StepCard>
      </div>

      {/* RIGHT: Live bowl preview + price */}
      <div className="bowl-preview-sticky">
        <div
          className="card"
          style={{
            padding: '1.6rem',
            background:
              'linear-gradient(180deg, #2E2218 0%, #1C1410 100%)',
            border: '1px solid rgba(255,172,48,0.2)',
            boxShadow: 'var(--glow-amber)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: 'var(--amber)',
              marginBottom: '0.5rem',
            }}
          >
            YOUR BOWL · LIVE PREVIEW
          </div>

          <BowlPreview
            protein={protein}
            sauceCount={sauces.length}
            toppingCount={toppings.length}
          />

          {/* Selection summary */}
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <SummaryLine label="Base" value={bowlBase.name} />
            <SummaryLine
              label="Protein"
              value={
                protein
                  ? bowlProteins.find((p) => p.id === protein)?.name ?? ''
                  : 'Choose one'
              }
              pending={!protein}
            />
            <SummaryLine
              label="Sauces"
              value={
                sauces.length === 0
                  ? 'Choose up to 2'
                  : sauces
                      .map((id) => bowlSauces.find((s) => s.id === id)?.name)
                      .filter(Boolean)
                      .join(', ')
              }
              pending={sauces.length === 0}
            />
            <SummaryLine
              label="Toppings"
              value={
                toppings.length === 0
                  ? 'None'
                  : `${toppings.length} selected`
              }
            />
          </div>

          {/* Price + CTA */}
          <div
            style={{
              marginTop: '1.4rem',
              paddingTop: '1.4rem',
              borderTop: '1px solid rgba(255,245,230,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  color: 'var(--cream-muted)',
                }}
              >
                YOUR PRICE
              </span>
              <span
                style={{
                  fontFamily: 'var(--f-bold)',
                  fontSize: '2.2rem',
                  color: 'var(--saffron)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {formatPrice(price)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleAddBowl}
              disabled={!canAddToCart}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '1.1rem',
                fontSize: '1rem',
                opacity: canAddToCart ? 1 : 0.5,
                cursor: canAddToCart ? 'pointer' : 'not-allowed',
                pointerEvents: canAddToCart ? 'auto' : 'none',
              }}
            >
              {canAddToCart
                ? `Build My Bowl · ${formatPrice(price)}`
                : protein
                  ? 'Pick at least 1 sauce'
                  : 'Pick your protein'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function StepCard({
  number,
  title,
  subtitle,
  active,
  complete,
  locked,
  onActivate,
  children,
}: {
  number: string
  title: string
  subtitle?: string
  active: boolean
  complete: boolean
  locked?: boolean
  onActivate: () => void
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        background: active ? 'var(--charcoal-3)' : 'var(--charcoal-2)',
        border: active
          ? '1px solid rgba(255,172,48,0.4)'
          : '1px solid rgba(255,245,230,0.1)',
        borderLeft: active
          ? '4px solid var(--saffron)'
          : '4px solid transparent',
        borderRadius: '18px',
        padding: '1.3rem 1.4rem',
        transform: active ? 'translateY(-2px)' : 'none',
        transition: 'all 0.35s var(--ease-warm)',
        opacity: locked ? 0.55 : 1,
        pointerEvents: locked ? 'none' : 'auto',
      }}
    >
      <button
        type="button"
        onClick={onActivate}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          marginBottom: '1rem',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--f-bold)',
            fontSize: '1.4rem',
            color: active ? 'var(--saffron)' : 'var(--cream-faint)',
            letterSpacing: '0.02em',
            lineHeight: 1,
          }}
        >
          {number}
        </span>
        <span style={{ flex: 1 }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--f-bold)',
              fontSize: '1rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--cream)',
            }}
          >
            {title}
          </span>
          {subtitle && (
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--f-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
                color: 'var(--cream-muted)',
                marginTop: '2px',
              }}
            >
              {subtitle}
            </span>
          )}
        </span>
        {complete && (
          <span
            aria-hidden="true"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--sage)',
              color: 'var(--charcoal)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--f-bold)',
              fontSize: '0.85rem',
            }}
          >
            ✓
          </span>
        )}
      </button>
      <div>{children}</div>
    </div>
  )
}

function OptionRow({
  label,
  description,
  selected,
  rightSlot,
  onClick,
  multi,
}: {
  label: string
  description: string
  selected: boolean
  rightSlot?: React.ReactNode
  onClick: () => void
  multi?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.9rem',
        padding: '0.85rem 1rem',
        borderRadius: '12px',
        background: selected ? 'rgba(255,107,26,0.12)' : 'rgba(255,245,230,0.03)',
        border: selected
          ? '1.5px solid var(--saffron)'
          : '1.5px solid rgba(255,245,230,0.1)',
        textAlign: 'left',
        width: '100%',
        transition: 'all 0.25s var(--ease-warm)',
        minHeight: '60px',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = 'rgba(255,172,48,0.4)'
          e.currentTarget.style.background = 'rgba(255,172,48,0.05)'
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = 'rgba(255,245,230,0.1)'
          e.currentTarget.style.background = 'rgba(255,245,230,0.03)'
        }
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: '22px',
          height: '22px',
          borderRadius: multi ? '6px' : '50%',
          border: selected ? '2px solid var(--saffron)' : '2px solid rgba(255,245,230,0.3)',
          background: selected ? 'var(--saffron)' : 'transparent',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.2s',
        }}
      >
        {selected && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1C1410" strokeWidth="4" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span style={{ flex: 1 }}>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--f-bold)',
            fontSize: '0.9rem',
            color: 'var(--cream)',
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </span>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--f-body)',
            fontSize: '0.85rem',
            color: 'var(--cream-muted)',
            marginTop: '2px',
            lineHeight: 1.4,
          }}
        >
          {description}
        </span>
      </span>
      {rightSlot && <span style={{ flexShrink: 0 }}>{rightSlot}</span>}
    </button>
  )
}

function SummaryLine({
  label,
  value,
  pending,
}: {
  label: string
  value: string
  pending?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--f-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          color: 'var(--cream-faint)',
          textTransform: 'uppercase',
          flexShrink: 0,
          paddingTop: '2px',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--f-body)',
          fontSize: '0.9rem',
          color: pending ? 'var(--cream-faint)' : 'var(--cream)',
          textAlign: 'right',
          fontStyle: pending ? 'italic' : 'normal',
        }}
      >
        {value}
      </span>
    </div>
  )
}

/** CSS-only bowl preview that fills as selections are made. */
function BowlPreview({
  protein,
  sauceCount,
  toppingCount,
}: {
  protein: string | null
  sauceCount: number
  toppingCount: number
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4 / 3',
        background:
          'radial-gradient(circle at center, rgba(255,172,48,0.15) 0%, transparent 60%)',
        borderRadius: '14px',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 300"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
        }}
      >
        {/* Bowl outer */}
        <path
          d="M 70 130 Q 70 270, 200 285 Q 330 270, 330 130 Z"
          fill="#1a0f08"
          stroke="#5a3a22"
          strokeWidth="2"
        />
        {/* Bowl inside */}
        <ellipse cx="200" cy="130" rx="130" ry="32" fill="#0d0805" />

        {/* Layer 1: rice (always shown) */}
        <ellipse
          cx="200"
          cy="128"
          rx="120"
          ry="28"
          fill="url(#bp-rice)"
          style={{
            opacity: 1,
            transition: 'opacity 0.6s',
          }}
        />

        {/* Layer 2: protein color hint */}
        <g
          style={{
            opacity: protein ? 1 : 0,
            transition: 'opacity 0.6s',
            transform: protein ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          {protein === 'protein-chicken' && (
            <>
              <ellipse cx="170" cy="123" rx="14" ry="8" fill="#C97A3A" />
              <ellipse cx="225" cy="125" rx="14" ry="8" fill="#C97A3A" />
              <ellipse cx="200" cy="120" rx="12" ry="7" fill="#D88A4A" />
            </>
          )}
          {protein === 'protein-paneer' && (
            <>
              <rect x="160" y="118" width="18" height="12" rx="2" fill="#FFF5E6" />
              <rect x="195" y="116" width="18" height="12" rx="2" fill="#FFF5E6" />
              <rect x="225" y="120" width="18" height="12" rx="2" fill="#FFF0D6" />
            </>
          )}
          {protein === 'protein-egg' && (
            <>
              <ellipse cx="180" cy="122" rx="12" ry="9" fill="#FFF5E6" />
              <ellipse cx="180" cy="122" rx="6" ry="5" fill="#FFAC30" />
              <ellipse cx="220" cy="124" rx="12" ry="9" fill="#FFF5E6" />
              <ellipse cx="220" cy="124" rx="6" ry="5" fill="#FFAC30" />
            </>
          )}
        </g>

        {/* Layer 3: sauce pool */}
        <ellipse
          cx="200"
          cy="124"
          rx="70"
          ry="14"
          fill="url(#bp-sauce)"
          style={{
            opacity: sauceCount > 0 ? Math.min(1, sauceCount * 0.4) : 0,
            transition: 'opacity 0.6s',
          }}
        />

        {/* Layer 4: toppings */}
        <g
          style={{
            opacity: toppingCount > 0 ? 1 : 0,
            transition: 'opacity 0.6s',
          }}
        >
          {toppingCount >= 1 && (
            <>
              <circle cx="165" cy="118" r="3.5" fill="#E8C079" />
              <circle cx="235" cy="120" r="3.5" fill="#E8C079" />
            </>
          )}
          {toppingCount >= 2 && (
            <>
              <ellipse cx="180" cy="125" rx="2" ry="1" fill="#7FA67A" />
              <ellipse cx="215" cy="125" rx="2" ry="1" fill="#7FA67A" />
            </>
          )}
          {toppingCount >= 3 && (
            <>
              <circle cx="195" cy="115" r="2.5" fill="#D85A3A" />
              <circle cx="210" cy="118" r="2.5" fill="#D85A3A" />
            </>
          )}
          {toppingCount >= 4 && (
            <path
              d="M 165 125 Q 185 119, 200 125 Q 215 131, 235 125"
              stroke="#FFF5E6"
              strokeWidth="1.5"
              fill="none"
              opacity="0.85"
            />
          )}
          {toppingCount >= 5 && (
            <>
              <path d="M 240 110 L 252 105 L 254 113 L 244 118 Z" fill="#E8B96F" />
              <path d="M 148 113 L 158 105 L 162 112 L 152 120 Z" fill="#E8B96F" />
            </>
          )}
        </g>

        {/* Rim highlight */}
        <path
          d="M 75 130 Q 75 122, 200 118 Q 325 122, 325 130"
          fill="none"
          stroke="#FFAC30"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Steam — only when bowl has stuff */}
        {protein && (
          <g
            stroke="#FFF5E6"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          >
            <path
              d="M 170 100 Q 165 80, 175 60"
              strokeDasharray="80"
              strokeDashoffset="80"
              style={{ animation: 'steamRise 2.4s ease-out infinite' }}
            />
            <path
              d="M 200 95 Q 205 75, 195 55"
              strokeDasharray="80"
              strokeDashoffset="80"
              style={{ animation: 'steamRise 2.4s ease-out infinite', animationDelay: '0.6s' }}
            />
            <path
              d="M 230 100 Q 225 78, 235 60"
              strokeDasharray="80"
              strokeDashoffset="80"
              style={{ animation: 'steamRise 2.4s ease-out infinite', animationDelay: '1.2s' }}
            />
          </g>
        )}

        <defs>
          <radialGradient id="bp-rice" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFEBC4" />
            <stop offset="60%" stopColor="#FFD98A" />
            <stop offset="100%" stopColor="#E89B3F" />
          </radialGradient>
          <radialGradient id="bp-sauce" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF8A3D" />
            <stop offset="60%" stopColor="#D4521F" />
            <stop offset="100%" stopColor="#8B2A0C" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}
