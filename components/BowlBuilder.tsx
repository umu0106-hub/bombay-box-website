'use client'

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

const STEP_LABELS: Record<StepIdx, string> = {
  1: 'Base',
  2: 'Protein',
  3: 'Sauce',
  4: 'Toppings',
}

export default function BowlBuilder() {
  const { addItem } = useCart()
  const [step, setStep] = useState<StepIdx>(1)
  const [protein, setProtein] = useState<string | null>(null)
  const [sauces, setSauces] = useState<string[]>([])
  const [toppings, setToppings] = useState<string[]>(
    bowlToppings.map((t) => t.id)
  )

  // Calculate price based on selections
  const proteinPrice = protein ? bowlBasePrice(protein) : 0
  const extraSaucePrice = sauces.length > 2 ? (sauces.length - 2) * EXTRA_SAUCE_PRICE : 0
  const toppingPrice = toppings.reduce((sum, id) => {
    const topping = bowlToppings.find((t) => t.id === id)
    return sum + (topping?.upcharge || 0)
  }, 0)

  const basePrice = 12.99
  const totalPrice = basePrice + proteinPrice + extraSaucePrice + toppingPrice

  // Build summary text
  const summary = useMemo(() => {
    const parts = [bowlBase.name]
    if (protein) {
      const p = bowlProteins.find((x) => x.id === protein)
      if (p) parts.push(p.name)
    }
    if (sauces.length > 0) {
      const sauceNames = sauces
        .map((id) => bowlSauces.find((s) => s.id === id)?.name)
        .filter(Boolean)
      parts.push(`${sauceNames.length} sauce${sauceNames.length > 1 ? 's' : ''}`)
    }
    return parts.join(' + ')
  }, [protein, sauces])

  const handleAddToCart = () => {
    if (!protein) return

    const customizations = {
      protein,
      sauces,
      toppings,
    }

    addItem({
      menuItemId: 'custom-bowl',
      name: `Custom Bowl`,
      price: totalPrice,
      quantity: 1,
      customizations,
    })
  }

  const toggleTopping = (id: string) => {
    setToppings((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const toggleSauce = (id: string) => {
    setSauces((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const canAdvance =
    (step === 1) || // Base always ready
    (step === 2 && protein) ||
    (step === 3 && sauces.length > 0)

  return (
    <section style={{ paddingTop: '3rem', paddingBottom: '3rem', background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.05), transparent)' }}>
      <div className="container">
        <style>{`
          .bowl-builder {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: start;
          }

          @media (max-width: 960px) {
            .bowl-builder {
              grid-template-columns: 1fr;
              gap: 2rem;
            }
          }

          .bowl-steps {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .step-indicator {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 2rem;
          }

          .step-dot {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--f-bold);
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s var(--ease-soft);
            border: 2px solid var(--cream-line);
            background: var(--white);
            color: var(--charcoal);
          }

          .step-dot.active {
            background: var(--terracotta);
            color: var(--white);
            border-color: var(--terracotta);
            transform: scale(1.1);
          }

          .step-dot.completed {
            background: var(--gold);
            color: var(--charcoal);
            border-color: var(--gold);
          }

          .step-content {
            background: var(--white);
            border-radius: 12px;
            padding: 2rem;
            border: 1px solid var(--cream-line);
            box-shadow: var(--shadow-light);
          }

          .step-title {
            font-size: 1.5rem;
            color: var(--charcoal);
            margin-bottom: 1.5rem;
            font-family: var(--f-display);
          }

          .option-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .option-button {
            padding: 1rem;
            border: 2px solid var(--cream-line);
            border-radius: 8px;
            background: var(--white);
            cursor: pointer;
            transition: all 0.2s var(--ease-soft);
            text-align: center;
          }

          .option-button:hover {
            border-color: var(--terracotta);
            box-shadow: var(--shadow-light);
          }

          .option-button.selected {
            border-color: var(--terracotta);
            background: rgba(165, 78, 39, 0.08);
            color: var(--terracotta);
            font-weight: 600;
          }

          .option-image {
            width: 100%;
            height: 100px;
            object-fit: cover;
            border-radius: 6px;
            margin-bottom: 0.5rem;
          }

          .option-name {
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--charcoal);
          }

          .option-upcharge {
            font-size: 0.75rem;
            color: var(--terracotta);
            margin-top: 0.25rem;
          }

          .step-nav {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
          }

          .step-nav button {
            flex: 1;
            padding: 0.875rem 1.5rem;
            border-radius: 8px;
            border: none;
            font-family: var(--f-bold);
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s var(--ease-soft);
          }

          .btn-prev {
            background: var(--cream-dark);
            color: var(--charcoal);
          }

          .btn-prev:hover {
            background: var(--gold-light);
          }

          .btn-next {
            background: var(--terracotta);
            color: var(--white);
          }

          .btn-next:hover:not(:disabled) {
            background: var(--terracotta-light);
            box-shadow: var(--glow-terracotta);
          }

          .btn-next:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .bowl-summary {
            background: var(--white);
            border-radius: 12px;
            padding: 2rem;
            border: 1px solid var(--cream-line);
            box-shadow: var(--shadow-light);
            position: sticky;
            top: 100px;
          }

          .bowl-visual {
            width: 100%;
            aspect-ratio: 1;
            background: linear-gradient(135deg, rgba(212, 165, 116, 0.15), rgba(165, 78, 39, 0.08));
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            overflow: hidden;
            border: 1px solid var(--cream-line);
            position: relative;
          }

          .bowl-visual img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
          }

          .summary-title {
            font-size: 1.2rem;
            color: var(--charcoal);
            margin-bottom: 1rem;
            font-family: var(--f-display);
          }

          .summary-text {
            font-size: 0.95rem;
            color: var(--charcoal);
            margin-bottom: 1.5rem;
            line-height: 1.5;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid var(--cream-line);
          }

          .summary-ingredients {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
          }

          .ingredient-item {
            display: flex;
            justify-content: space-between;
            color: var(--charcoal);
          }

          .ingredient-label {
            font-weight: 600;
          }

          .ingredient-value {
            color: var(--terracotta);
          }

          .summary-price {
            font-size: 1.8rem;
            font-family: var(--f-bold);
            color: var(--terracotta);
            margin-bottom: 1.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid var(--cream-line);
          }

          .btn-add-cart {
            width: 100%;
            padding: 1rem;
            background: var(--terracotta);
            color: var(--white);
            border: none;
            border-radius: 8px;
            font-family: var(--f-bold);
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s var(--ease-soft);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .btn-add-cart:hover:not(:disabled) {
            background: var(--terracotta-light);
            box-shadow: var(--glow-terracotta);
            transform: translateY(-2px);
          }

          .btn-add-cart:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}</style>

        <h2 style={{ marginBottom: '2rem', color: 'var(--charcoal)' }}>
          Build Your <span style={{ color: 'var(--terracotta)' }}>Custom Bowl</span>
        </h2>

        <div className="bowl-builder">
          {/* LEFT: Step by Step Builder */}
          <div className="bowl-steps">
            {/* Step Indicators */}
            <div className="step-indicator">
              {[1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  className={`step-dot ${step === (s as StepIdx) ? 'active' : ''} ${
                    s < step ? 'completed' : ''
                  }`}
                  onClick={() => s < step && setStep(s as StepIdx)}
                  title={STEP_LABELS[s as StepIdx]}
                >
                  {s < step ? '✓' : s}
                </button>
              ))}
            </div>

            {/* Step Content */}
            <div className="step-content">
              {/* STEP 1: Base */}
              {step === 1 && (
                <>
                  <h3 className="step-title">Choose Your Base</h3>
                  <p style={{ color: 'var(--charcoal)', marginBottom: '1.5rem' }}>
                    Every bowl starts with fragrant basmati rice. It's included and delicious.
                  </p>
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.1), rgba(165, 78, 39, 0.05))',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      textAlign: 'center',
                      marginBottom: '2rem',
                    }}
                  >
                    <img
                      src={bowlBase.image || 'https://images.unsplash.com/photo-1505521918220-278ce9c8d70f?w=300&q=80'}
                      alt="Basmati Rice"
                      style={{ width: '100%', maxWidth: '150px', height: 'auto', borderRadius: '6px', marginBottom: '0.75rem' }}
                    />
                    <h4 style={{ color: 'var(--charcoal)', marginBottom: '0.25rem' }}>{bowlBase.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--charcoal)' }}>
                      {bowlBase.description}
                    </p>
                  </div>
                  <div className="step-nav">
                    <button className="btn-next" onClick={() => setStep(2)}>
                      Next: Choose Protein →
                    </button>
                  </div>
                </>
              )}

              {/* STEP 2: Protein */}
              {step === 2 && (
                <>
                  <h3 className="step-title">Pick Your Protein</h3>
                  <p style={{ color: 'var(--charcoal)', marginBottom: '1.5rem' }}>
                    Select one protein to complete your foundation.
                  </p>
                  <div className="option-grid">
                    {bowlProteins.map((p) => (
                      <button
                        key={p.id}
                        className={`option-button ${protein === p.id ? 'selected' : ''}`}
                        onClick={() => setProtein(p.id)}
                      >
                        <img
                          src={p.image || 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=200&q=80'}
                          alt={p.name}
                          className="option-image"
                        />
                        <div className="option-name">{p.name}</div>
                        {p.upcharge > 0 && (
                          <div className="option-upcharge">+{formatPrice(p.upcharge)}</div>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="step-nav">
                    <button className="btn-prev" onClick={() => setStep(1)}>
                      ← Back
                    </button>
                    <button
                      className="btn-next"
                      disabled={!canAdvance}
                      onClick={() => setStep(3)}
                    >
                      Next: Sauces →
                    </button>
                  </div>
                </>
              )}

              {/* STEP 3: Sauces */}
              {step === 3 && (
                <>
                  <h3 className="step-title">Choose Your Sauces</h3>
                  <p style={{ color: 'var(--charcoal)', marginBottom: '1.5rem' }}>
                    Pick up to 2 sauces free. Extra sauces are ${formatPrice(EXTRA_SAUCE_PRICE)} each.
                  </p>
                  <div className="option-grid">
                    {bowlSauces.map((s) => (
                      <button
                        key={s.id}
                        className={`option-button ${sauces.includes(s.id) ? 'selected' : ''}`}
                        onClick={() => toggleSauce(s.id)}
                      >
                        <img
                          src={s.image || 'https://images.unsplash.com/photo-1596040694635-d18c6ba70b3e?w=200&q=80'}
                          alt={s.name}
                          className="option-image"
                        />
                        <div className="option-name">{s.name}</div>
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--charcoal)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                    Selected: {sauces.length} sauce{sauces.length !== 1 ? 's' : ''}
                  </p>
                  <div className="step-nav">
                    <button className="btn-prev" onClick={() => setStep(2)}>
                      ← Back
                    </button>
                    <button
                      className="btn-next"
                      disabled={sauces.length === 0}
                      onClick={() => setStep(4)}
                    >
                      Next: Toppings →
                    </button>
                  </div>
                </>
              )}

              {/* STEP 4: Toppings */}
              {step === 4 && (
                <>
                  <h3 className="step-title">Add Your Toppings</h3>
                  <p style={{ color: 'var(--charcoal)', marginBottom: '1.5rem' }}>
                    All toppings are included. Mix and match freely.
                  </p>
                  <div className="option-grid">
                    {bowlToppings.map((t) => (
                      <button
                        key={t.id}
                        className={`option-button ${toppings.includes(t.id) ? 'selected' : ''}`}
                        onClick={() => toggleTopping(t.id)}
                      >
                        <img
                          src={t.image || 'https://images.unsplash.com/photo-1589985620652-a8fd7c4c9c11?w=200&q=80'}
                          alt={t.name}
                          className="option-image"
                        />
                        <div className="option-name">{t.name}</div>
                        {t.upcharge > 0 && (
                          <div className="option-upcharge">+{formatPrice(t.upcharge)}</div>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="step-nav">
                    <button className="btn-prev" onClick={() => setStep(3)}>
                      ← Back
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT: Summary & Add to Cart */}
          <div className="bowl-summary">
            <div className="bowl-visual">
              <img
                src="https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=400&q=80"
                alt="Your Custom Bowl"
                loading="lazy"
              />
            </div>

            <h3 className="summary-title">Your Bowl</h3>
            <p className="summary-text">{summary}</p>

            <div className="summary-ingredients">
              <div className="ingredient-item">
                <span className="ingredient-label">Base:</span>
                <span className="ingredient-value">{bowlBase.name}</span>
              </div>
              {protein && (
                <div className="ingredient-item">
                  <span className="ingredient-label">Protein:</span>
                  <span className="ingredient-value">
                    {bowlProteins.find((p) => p.id === protein)?.name}
                  </span>
                </div>
              )}
              {sauces.length > 0 && (
                <div className="ingredient-item">
                  <span className="ingredient-label">Sauces:</span>
                  <span className="ingredient-value">{sauces.length}</span>
                </div>
              )}
              {toppings.length > 0 && (
                <div className="ingredient-item">
                  <span className="ingredient-label">Toppings:</span>
                  <span className="ingredient-value">{toppings.length}</span>
                </div>
              )}
            </div>

            <div className="summary-price">{formatPrice(totalPrice)}</div>

            <button
              className="btn-add-cart"
              disabled={!protein || sauces.length === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
