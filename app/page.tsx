'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import HeroAnimation from '@/components/HeroAnimation'
import MarqueeStrip from '@/components/MarqueeStrip'
import BombayBoxLogo from '@/components/BombayBoxLogo'
import Cart from '@/components/Cart'
import { RESTAURANT } from '@/lib/menu'

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        {/* =====================================================
            A. HERO
            ===================================================== */}
        <section
          style={{
            position: 'relative',
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            paddingTop: '2rem',
            paddingBottom: '4rem',
          }}
        >
          <div
            className="container"
            style={{
              display: 'grid',
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            <style>{`
              .hero-grid { grid-template-columns: 1fr; }
              @media (min-width: 960px) {
                .hero-grid { grid-template-columns: 55fr 45fr !important; gap: 3rem !important; }
              }
              .hero-headline { font-size: clamp(3rem, 9vw, 6.5rem) !important; }
              .hero-glow-word { animation: hero-word-glow 4s ease-in-out infinite; }
              @keyframes hero-word-glow {
                0%, 100% { text-shadow: 0 0 30px rgba(255,107,26,0.4); }
                50% { text-shadow: 0 0 50px rgba(255,107,26,0.8), 0 0 80px rgba(255,172,48,0.3); }
              }
              .hero-stagger-1 { animation: fadeUpBlur 0.9s var(--ease-warm) 0.0s both; }
              .hero-stagger-2 { animation: fadeUpBlur 0.9s var(--ease-warm) 0.15s both; }
              .hero-stagger-3 { animation: fadeUpBlur 0.9s var(--ease-warm) 0.3s both; }
              .hero-stagger-4 { animation: fadeUpBlur 0.9s var(--ease-warm) 0.45s both; }
              .hero-stagger-5 { animation: fadeUpBlur 1.2s var(--ease-warm) 0.6s both; }
            `}</style>

            <div className="hero-grid" style={{ display: 'grid' }}>
              {/* LEFT — copy + CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
                <div className="hero-stagger-1">
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.45rem 0.9rem',
                      borderRadius: '999px',
                      border: '1px solid rgba(255,172,48,0.4)',
                      background: 'rgba(255,172,48,0.08)',
                      color: 'var(--amber)',
                      fontFamily: 'var(--f-mono)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}
                  >
                    🔥 Fresh · Made Daily · Rochelle Park NJ
                  </span>
                </div>

                <h1
                  className="hero-headline hero-stagger-2 f-display"
                  style={{
                    color: 'var(--cream)',
                    margin: 0,
                    fontWeight: 400,
                    lineHeight: 0.98,
                    letterSpacing: '-0.02em',
                  }}
                >
                  TASTE THE
                  <br />
                  BOMBAY
                  <br />
                  <span
                    className="hero-glow-word"
                    style={{ color: 'var(--saffron)' }}
                  >
                    DIFFERENCE
                  </span>
                </h1>

                <p
                  className="hero-stagger-3"
                  style={{
                    fontFamily: 'var(--f-body)',
                    fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                    color: 'rgba(255,245,230,0.7)',
                    lineHeight: 1.6,
                    maxWidth: '46ch',
                    margin: 0,
                  }}
                >
                  Fast Indian takeout made with fresh ingredients every single day.
                  Inside Subzi Bazar, Rochelle Park NJ.
                </p>

                <div
                  className="hero-stagger-4"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.8rem',
                    marginTop: '0.4rem',
                  }}
                >
                  <Link href="/menu" className="btn btn-primary">
                    Order Now →
                  </Link>
                  <Link href="/menu" className="btn btn-ghost">
                    See the Menu
                  </Link>
                </div>

                {/* Trust strip */}
                <div
                  className="hero-stagger-5"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1.4rem',
                    marginTop: '1.4rem',
                    paddingTop: '1.4rem',
                    borderTop: '1px solid rgba(255,245,230,0.1)',
                  }}
                >
                  <TrustItem label="Made Daily" value="Fresh" />
                  <TrustItem label="Halal" value="Available" />
                  <TrustItem label="Pickup" value="20–25 min" />
                </div>
              </div>

              {/* RIGHT — hero visual */}
              <div
                className="hero-stagger-5"
                style={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <HeroAnimation />
              </div>
            </div>
          </div>

          {/* Bottom scroll indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.3rem',
              animation: 'bounceChevron 2s ease-in-out infinite',
            }}
            aria-hidden="true"
          >
            <span
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                color: 'var(--amber)',
              }}
            >
              KEEP SCROLLING
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFAC30" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </section>

        {/* =====================================================
            B. Scrolling Hunger Strip
            ===================================================== */}
        <MarqueeStrip
          items={[
            'BUILD YOUR BOWL',
            'DAILY TIFFIN',
            'STREET TACOS',
            'DESI QUESADILLAS',
            'TANDOORI CHICKEN',
            'BIRYANI',
            'SAMOSA PAV',
            'DABELI',
            'ROSE LASSI',
          ]}
          duration={36}
        />

        {/* =====================================================
            C. How It Works
            ===================================================== */}
        <section className="section">
          <div className="container">
            <SectionHeader
              eyebrow="HOW IT WORKS"
              title="Order in 3 steps"
            />

            <div
              className="howit-grid"
              style={{
                display: 'grid',
                gap: '1.5rem',
                marginTop: '3rem',
                position: 'relative',
              }}
            >
              <style>{`
                .howit-grid { grid-template-columns: 1fr; }
                @media (min-width: 768px) {
                  .howit-grid { grid-template-columns: repeat(3, 1fr) !important; }
                  .howit-line {
                    position: absolute;
                    top: 70px;
                    left: 16.6%;
                    right: 16.6%;
                    height: 2px;
                    background: linear-gradient(to right, transparent, var(--amber-soft), transparent);
                    z-index: 0;
                  }
                }
              `}</style>
              <div className="howit-line" aria-hidden="true" />

              <StepCard
                number="01"
                title="Browse the Menu"
                description="Explore bowls, tiffins, street fusion, biryani and more. Pick what's calling you."
                icon={
                  <svg width="40" height="40" viewBox="0 0 60 60" fill="none">
                    <rect x="10" y="6" width="40" height="48" rx="3" fill="#1C1410" stroke="#FFAC30" strokeWidth="2" />
                    <line x1="18" y1="18" x2="42" y2="18" stroke="#FFAC30" strokeWidth="2" />
                    <line x1="18" y1="26" x2="42" y2="26" stroke="#FF6B1A" strokeWidth="2" />
                    <line x1="18" y1="34" x2="36" y2="34" stroke="#FFAC30" strokeWidth="2" />
                    <line x1="18" y1="42" x2="42" y2="42" stroke="#FFAC30" strokeWidth="2" />
                  </svg>
                }
              />
              <StepCard
                number="02"
                title="Order & Pay Online"
                description="Secure checkout. Card or digital wallet. Your order goes straight to our kitchen."
                icon={
                  <svg width="40" height="40" viewBox="0 0 60 60" fill="none">
                    <rect x="14" y="6" width="32" height="48" rx="5" fill="#1C1410" stroke="#FFAC30" strokeWidth="2" />
                    <line x1="22" y1="44" x2="38" y2="44" stroke="#FFAC30" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="30" cy="48" r="1.5" fill="#FF6B1A" />
                    <rect x="20" y="14" width="20" height="22" rx="2" fill="#FF6B1A" opacity="0.2" />
                    <path d="M 22 22 L 28 28 L 38 18" stroke="#FF6B1A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              />
              <StepCard
                number="03"
                title="Pick Up Your Box"
                description="Skip the line. Walk in, grab your order, you're done. Hot, fresh, fast."
                icon={
                  <svg width="40" height="40" viewBox="0 0 60 60" fill="none">
                    <path d="M 10 22 L 30 12 L 50 22 L 50 48 L 10 48 Z" fill="#1C1410" stroke="#FFAC30" strokeWidth="2" />
                    <line x1="10" y1="22" x2="50" y2="22" stroke="#FFAC30" strokeWidth="2" />
                    <line x1="30" y1="12" x2="30" y2="48" stroke="#FFAC30" strokeWidth="2" opacity="0.5" />
                    <path d="M 24 8 Q 22 4, 26 2 M 30 8 Q 28 4, 32 2 M 36 8 Q 34 4, 38 2" stroke="#FF6B1A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                }
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            D. Featured Dishes — What People Are Craving
            ===================================================== */}
        <section className="section" style={{ background: 'var(--charcoal)' }}>
          <div className="container">
            <SectionHeader
              eyebrow="WHAT PEOPLE ARE CRAVING"
              title="Most ordered. Every day."
            />

            <div
              className="craving-grid"
              style={{
                display: 'grid',
                gap: '1.5rem',
                marginTop: '3rem',
              }}
            >
              <style>{`
                .craving-grid { grid-template-columns: 1fr; }
                @media (min-width: 768px) {
                  .craving-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.75rem !important; }
                }
              `}</style>

              <CravingCard
                badge="⭐ MOST POPULAR"
                badgeClass="badge-amber"
                title="The Chicken Bowl"
                price="$14.98"
                copy="Your bowl, your way. Fluffy basmati, tender halal chicken, two bold sauces, and all the toppings."
                visual={<ChickenBowlVisual />}
              />
              <CravingCard
                badge="🔥 STAFF FAVORITE"
                badgeClass="badge-saffron"
                title="Chicken Biryani"
                price="$15.99"
                copy="Dum-cooked. Whole spices. The kind of biryani that ruins all others."
                visual={<BiryaniVisual />}
              />
              <CravingCard
                badge="✨ NEW"
                badgeClass="badge-sage"
                title="Chicken Tikka Taco"
                price="$10.99"
                copy="Smoky tikka meets cool mint chutney. One is never enough."
                visual={<TacoVisual />}
              />
              <CravingCard
                badge="👨‍🍳 CHEF'S SELECTION"
                badgeClass="badge-spice"
                title="Daily Tiffin Box"
                price="from $13.99"
                copy="Four curries, dal, roti, rice, salad. The whole meal. Daily fresh."
                visual={<TiffinVisual />}
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            E. Why Bombay Box — Appetite Promise
            ===================================================== */}
        <section
          style={{
            background: 'var(--saffron)',
            color: 'var(--charcoal)',
            padding: '6rem 0',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          {/* Decorative tile pattern */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.08,
              backgroundImage:
                'radial-gradient(circle at 25% 25%, #1C1410 1.5px, transparent 1.5px), radial-gradient(circle at 75% 75%, #1C1410 1.5px, transparent 1.5px)',
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 20px 20px',
            }}
          />
          <div
            className="container"
            style={{ textAlign: 'center', position: 'relative' }}
          >
            <span
              className="f-mono"
              style={{
                fontSize: '0.75rem',
                color: 'var(--charcoal)',
                opacity: 0.7,
                letterSpacing: '0.14em',
              }}
            >
              THE BOMBAY BOX PROMISE
            </span>
            <h2
              className="f-display"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                margin: '1rem 0 2.5rem',
                color: 'var(--charcoal)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              Made fresh. Every single day.
            </h2>

            <div
              className="pillars"
              style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: '1fr',
                maxWidth: '900px',
                margin: '0 auto 3rem',
              }}
            >
              <style>{`
                @media (min-width: 768px) {
                  .pillars { grid-template-columns: repeat(3, 1fr) !important; }
                }
              `}</style>
              <Pillar emoji="🌿" title="Fresh Ingredients" desc="No frozen shortcuts. Ever." />
              <Pillar emoji="⚡" title="Fast Pickup" desc="In and out in minutes." />
              <Pillar emoji="🥘" title="Real Recipes" desc="Family recipes, professional kitchen." />
            </div>

            <div
              style={{
                fontFamily: 'var(--f-bold)',
                fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                lineHeight: 1.5,
                marginBottom: '1.8rem',
                color: 'var(--charcoal)',
                letterSpacing: '0.02em',
              }}
            >
              Find us at {RESTAURANT.address}
              <br />
              {RESTAURANT.addressDetail} · {RESTAURANT.type}
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark"
              style={{ background: 'var(--charcoal)', color: 'var(--cream)' }}
            >
              Get Directions →
            </a>
          </div>
        </section>

        {/* =====================================================
            F. Allergy strip
            ===================================================== */}
        <section
          style={{
            background: 'var(--charcoal)',
            padding: '1.6rem 0',
            borderTop: '1px solid rgba(255,245,230,0.06)',
          }}
        >
          <div className="container" style={{ textAlign: 'center' }}>
            <p
              className="f-mono"
              style={{
                fontSize: '0.7rem',
                color: 'var(--cream-faint)',
                letterSpacing: '0.12em',
                margin: 0,
                lineHeight: 1.8,
              }}
            >
              {RESTAURANT.dietary} · May contain: Gluten · Dairy · Nuts
              <br />
              Always inform our staff of allergies. Shared kitchen — veg &amp; non-veg.
            </p>
          </div>
        </section>

        {/* =====================================================
            FOOTER
            ===================================================== */}
        <Footer />
      </main>
      <Cart />
    </>
  )
}

/* =========================================================
   Sub-components
   ========================================================= */

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
      <span
        className="f-mono"
        style={{
          fontSize: '0.75rem',
          color: 'var(--amber)',
          letterSpacing: '0.18em',
          display: 'block',
          marginBottom: '0.9rem',
        }}
      >
        {eyebrow}
      </span>
      <h2
        className="f-display"
        style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          color: 'var(--cream)',
          margin: 0,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h2>
    </div>
  )
}

function TrustItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="f-mono"
        style={{ fontSize: '0.65rem', color: 'var(--cream-faint)', letterSpacing: '0.12em' }}
      >
        {label}
      </div>
      <div
        className="f-bold"
        style={{
          fontSize: '0.95rem',
          color: 'var(--cream)',
          marginTop: '2px',
          letterSpacing: '0.04em',
        }}
      >
        {value}
      </div>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: string
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div
      className="card card-hover"
      style={{
        padding: '2.2rem 1.8rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        background: 'var(--charcoal-2)',
      }}
    >
      <div
        className="f-bold"
        style={{
          fontSize: '5rem',
          color: 'var(--saffron)',
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
          marginBottom: '0.5rem',
          opacity: 0.95,
        }}
      >
        {number}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
        {icon}
      </div>
      <h3
        className="f-bold"
        style={{
          fontSize: '1.05rem',
          color: 'var(--cream)',
          marginBottom: '0.6rem',
          letterSpacing: '0.04em',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--f-body)',
          color: 'var(--cream-muted)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  )
}

function CravingCard({
  badge,
  badgeClass,
  title,
  price,
  copy,
  visual,
}: {
  badge: string
  badgeClass: string
  title: string
  price: string
  copy: string
  visual: React.ReactNode
}) {
  return (
    <article
      className="card card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--charcoal-2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '5 / 3',
          background: 'linear-gradient(135deg, #2a1a10 0%, #1a0e07 100%)',
          overflow: 'hidden',
        }}
      >
        {visual}
        <span
          className={`badge ${badgeClass}`}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
          }}
        >
          {badge}
        </span>
      </div>
      <div style={{ padding: '1.4rem 1.5rem 1.6rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '1rem',
            marginBottom: '0.6rem',
          }}
        >
          <h3
            className="f-display"
            style={{
              fontSize: '1.5rem',
              color: 'var(--cream)',
              margin: 0,
            }}
          >
            {title}
          </h3>
          <span
            className="f-bold"
            style={{ color: 'var(--saffron)', fontSize: '1.2rem' }}
          >
            {price}
          </span>
        </div>
        <p
          style={{
            fontFamily: 'var(--f-body)',
            color: 'var(--cream-muted)',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            margin: 0,
            marginBottom: '1.2rem',
          }}
        >
          {copy}
        </p>
        <Link
          href="/menu"
          className="btn btn-primary"
          style={{ padding: '0.7rem 1.2rem', fontSize: '0.8rem' }}
        >
          Add to Order →
        </Link>
      </div>
    </article>
  )
}

function Pillar({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div
      style={{
        background: 'var(--charcoal)',
        color: 'var(--cream)',
        borderRadius: '999px',
        padding: '1.1rem 1.6rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        textAlign: 'left',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.4)',
      }}
    >
      <span style={{ fontSize: '1.6rem' }} aria-hidden="true">{emoji}</span>
      <div>
        <div
          className="f-bold"
          style={{
            fontSize: '0.9rem',
            letterSpacing: '0.04em',
            color: 'var(--cream)',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: 'var(--f-body)',
            fontSize: '0.82rem',
            color: 'var(--cream-muted)',
            marginTop: '2px',
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer
      style={{
        background: '#0F0905',
        padding: '4rem 0 2rem',
        borderTop: '1px solid rgba(255,245,230,0.06)',
      }}
    >
      <div
        className="container footer-grid"
        style={{
          display: 'grid',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}
      >
        <style>{`
          .footer-grid { grid-template-columns: 1fr; }
          @media (min-width: 768px) {
            .footer-grid { grid-template-columns: 1.4fr 1fr 1fr !important; }
          }
        `}</style>

        <div>
          <BombayBoxLogo variant="full" size={56} />
          <p
            style={{
              fontFamily: 'var(--f-body)',
              color: 'var(--cream-muted)',
              fontSize: '0.9rem',
              maxWidth: '32ch',
              lineHeight: 1.6,
              marginTop: '1.2rem',
            }}
          >
            Fast Indian takeout. Fresh ingredients, made every day.
            Rochelle Park, NJ.
          </p>
        </div>

        <div>
          <h4
            className="f-mono"
            style={{
              fontSize: '0.7rem',
              color: 'var(--amber)',
              letterSpacing: '0.16em',
              marginBottom: '1rem',
            }}
          >
            EXPLORE
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <FooterLink href="/menu" label="Menu" />
            <FooterLink href="/menu" label="Order Online" />
            <FooterLink href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT.address)}`} label="Location" external />
            <FooterLink href="#allergy" label="Allergen Info" />
          </ul>
        </div>

        <div>
          <h4
            className="f-mono"
            style={{
              fontSize: '0.7rem',
              color: 'var(--amber)',
              letterSpacing: '0.16em',
              marginBottom: '1rem',
            }}
          >
            CONTACT
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <FooterLink href={RESTAURANT.phoneHref} label={RESTAURANT.phone} />
            <FooterLink href={RESTAURANT.websiteUrl} label={RESTAURANT.website} external />
            <li
              style={{
                fontFamily: 'var(--f-body)',
                color: 'var(--cream-muted)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
              }}
            >
              {RESTAURANT.address}
              <br />
              {RESTAURANT.addressDetail}
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div
          style={{
            borderTop: '1px solid rgba(255,245,230,0.06)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            className="f-mono"
            style={{ fontSize: '0.7rem', color: 'var(--cream-faint)', letterSpacing: '0.1em' }}
          >
            © 2025 BOMBAY BOX · TAKEOUT ONLY · EATBOMBAYBOX.COM
          </span>
          <span
            className="f-mono"
            style={{ fontSize: '0.7rem', color: 'var(--cream-faint)', letterSpacing: '0.1em' }}
          >
            ROCHELLE PARK, NJ
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({
  href,
  label,
  external,
}: {
  href: string
  label: string
  external?: boolean
}) {
  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--f-body)',
    color: 'var(--cream-muted)',
    fontSize: '0.9rem',
    transition: 'color 0.2s',
    display: 'inline-block',
  }
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--saffron)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cream-muted)' }}
        >
          {label}
        </a>
      </li>
    )
  }
  return (
    <li>
      <Link
        href={href}
        style={linkStyle}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--saffron)' }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cream-muted)' }}
      >
        {label}
      </Link>
    </li>
  )
}

/* =========================================================
   Inline food visuals for craving cards
   ========================================================= */

function ChickenBowlVisual() {
  return (
    <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden="true">
      <defs>
        <radialGradient id="cb-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#FFAC30" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF6B1A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cb-rice" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFEBC4" />
          <stop offset="100%" stopColor="#E89B3F" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="170" rx="180" ry="50" fill="url(#cb-glow)" />
      <path d="M 80 110 Q 80 200, 200 215 Q 320 200, 320 110 Z" fill="#2a1a10" stroke="#5a3a22" strokeWidth="2" />
      <ellipse cx="200" cy="110" rx="120" ry="28" fill="#0d0805" />
      <ellipse cx="200" cy="108" rx="112" ry="24" fill="url(#cb-rice)" />
      <ellipse cx="200" cy="106" rx="68" ry="14" fill="#D4521F" opacity="0.85" />
      <ellipse cx="175" cy="102" rx="12" ry="7" fill="#C97A3A" />
      <ellipse cx="210" cy="106" rx="12" ry="7" fill="#C97A3A" />
      <ellipse cx="195" cy="100" rx="11" ry="6" fill="#D88A4A" />
      <circle cx="165" cy="100" r="3" fill="#E8C079" />
      <circle cx="235" cy="104" r="3" fill="#E8C079" />
      <ellipse cx="180" cy="108" rx="2" ry="1" fill="#7FA67A" />
      <ellipse cx="220" cy="108" rx="2" ry="1" fill="#7FA67A" />
      <path d="M 165 108 Q 195 102, 235 110" stroke="#FFF5E6" strokeWidth="1.5" fill="none" opacity="0.85" />
      <path d="M 75 110 Q 75 102, 200 98 Q 325 102, 325 110" fill="none" stroke="#FFAC30" strokeWidth="1.5" opacity="0.6" />
      <g stroke="#FFF5E6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5">
        <path d="M 170 85 Q 165 60, 175 35" strokeDasharray="80" strokeDashoffset="80" style={{ animation: 'steamRise 2.6s ease-out infinite' }} />
        <path d="M 200 80 Q 205 55, 195 30" strokeDasharray="80" strokeDashoffset="80" style={{ animation: 'steamRise 2.6s ease-out infinite', animationDelay: '0.5s' }} />
        <path d="M 230 85 Q 225 58, 235 32" strokeDasharray="80" strokeDashoffset="80" style={{ animation: 'steamRise 2.6s ease-out infinite', animationDelay: '1s' }} />
      </g>
    </svg>
  )
}

function BiryaniVisual() {
  return (
    <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden="true">
      <defs>
        <radialGradient id="by-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#FFAC30" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#B8861B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="by-plate" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD98A" />
          <stop offset="60%" stopColor="#E8A93D" />
          <stop offset="100%" stopColor="#8B5A1E" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="150" rx="180" ry="50" fill="url(#by-glow)" />
      {/* Plate */}
      <circle cx="200" cy="120" r="100" fill="#1a0e07" stroke="#5a3a22" strokeWidth="2" />
      <circle cx="200" cy="120" r="88" fill="url(#by-plate)" />
      {/* Rice grains scatter */}
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = (i / 40) * Math.PI * 2
        const radius = 30 + (i % 4) * 14
        const x = 200 + Math.cos(angle) * radius
        const y = 120 + Math.sin(angle) * radius * 0.92
        const rot = (i * 23) % 360
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="4"
            ry="1.6"
            fill={i % 5 === 0 ? '#FFEBC4' : '#FFE0A0'}
            transform={`rotate(${rot} ${x} ${y})`}
            opacity={0.9}
          />
        )
      })}
      {/* Chicken pieces */}
      <ellipse cx="170" cy="110" rx="18" ry="11" fill="#A85A2A" />
      <ellipse cx="172" cy="108" rx="10" ry="5" fill="#C97A3A" opacity="0.6" />
      <ellipse cx="215" cy="130" rx="18" ry="11" fill="#A85A2A" />
      <ellipse cx="217" cy="128" rx="10" ry="5" fill="#C97A3A" opacity="0.6" />
      <ellipse cx="195" cy="155" rx="15" ry="9" fill="#A85A2A" />
      {/* Spice flecks */}
      <circle cx="155" cy="125" r="2" fill="#C0392B" />
      <circle cx="240" cy="115" r="2" fill="#C0392B" />
      <circle cx="225" cy="155" r="2" fill="#C0392B" />
      {/* Mint */}
      <ellipse cx="180" cy="135" rx="3" ry="1.5" fill="#7FA67A" transform="rotate(30 180 135)" />
      <ellipse cx="220" cy="100" rx="3" ry="1.5" fill="#7FA67A" />
      {/* Steam */}
      <g stroke="#FFF5E6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5">
        <path d="M 170 70 Q 165 45, 175 20" strokeDasharray="80" strokeDashoffset="80" style={{ animation: 'steamRise 2.6s ease-out infinite' }} />
        <path d="M 200 65 Q 205 40, 195 15" strokeDasharray="80" strokeDashoffset="80" style={{ animation: 'steamRise 2.6s ease-out infinite', animationDelay: '0.5s' }} />
        <path d="M 230 70 Q 225 45, 235 22" strokeDasharray="80" strokeDashoffset="80" style={{ animation: 'steamRise 2.6s ease-out infinite', animationDelay: '1s' }} />
      </g>
    </svg>
  )
}

function TacoVisual() {
  return (
    <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden="true">
      <defs>
        <radialGradient id="tc-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#FFAC30" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF6B1A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tc-shell" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F2D894" />
          <stop offset="100%" stopColor="#C4943A" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="170" rx="180" ry="40" fill="url(#tc-glow)" />
      {/* Taco shell — curved */}
      <path
        d="M 90 130 Q 200 60, 310 130 L 295 175 Q 200 130, 105 175 Z"
        fill="url(#tc-shell)"
        stroke="#8B5A1E"
        strokeWidth="2"
      />
      {/* Char marks */}
      <ellipse cx="160" cy="100" rx="6" ry="2" fill="#5a3010" opacity="0.6" />
      <ellipse cx="220" cy="95" rx="5" ry="2" fill="#5a3010" opacity="0.6" />
      <ellipse cx="250" cy="110" rx="4" ry="1.5" fill="#5a3010" opacity="0.6" />
      <ellipse cx="130" cy="115" rx="5" ry="2" fill="#5a3010" opacity="0.6" />
      {/* Filling — tikka chicken */}
      <ellipse cx="175" cy="135" rx="14" ry="8" fill="#A85A2A" />
      <ellipse cx="210" cy="132" rx="14" ry="8" fill="#A85A2A" />
      <ellipse cx="195" cy="125" rx="12" ry="7" fill="#C97A3A" />
      {/* Char on chicken */}
      <path d="M 165 132 L 175 138" stroke="#3a1808" strokeWidth="1.5" />
      <path d="M 200 128 L 210 134" stroke="#3a1808" strokeWidth="1.5" />
      {/* Mint chutney */}
      <ellipse cx="180" cy="142" rx="20" ry="4" fill="#7FA67A" opacity="0.85" />
      <ellipse cx="220" cy="138" rx="18" ry="4" fill="#7FA67A" opacity="0.85" />
      {/* Onion */}
      <ellipse cx="155" cy="135" rx="6" ry="2" fill="#E8B8D4" opacity="0.85" />
      <ellipse cx="240" cy="138" rx="6" ry="2" fill="#E8B8D4" opacity="0.85" />
      {/* Cilantro */}
      <circle cx="185" cy="120" r="2" fill="#5a8a4a" />
      <circle cx="215" cy="115" r="2" fill="#5a8a4a" />
      <circle cx="200" cy="125" r="2" fill="#5a8a4a" />
      {/* Cream highlight on shell */}
      <path d="M 100 128 Q 200 65, 300 128" stroke="#FFEBC4" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
  )
}

function TiffinVisual() {
  return (
    <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden="true">
      <defs>
        <radialGradient id="tf-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#FFAC30" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF6B1A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="200" rx="180" ry="35" fill="url(#tf-glow)" />
      {/* Tiffin tray — top-down view, 2x2 compartments */}
      <rect x="80" y="40" width="240" height="170" rx="12" fill="#1a0e07" stroke="#5a3a22" strokeWidth="2.5" />
      {/* Inner rim */}
      <rect x="90" y="50" width="220" height="150" rx="6" fill="#0d0805" />
      {/* 4 compartments */}
      {/* Top-left: curry red */}
      <rect x="98" y="58" width="100" height="65" rx="4" fill="#A8331B" />
      <ellipse cx="148" cy="90" rx="35" ry="14" fill="#D85A3A" opacity="0.8" />
      <circle cx="135" cy="85" r="5" fill="#C97A3A" />
      <circle cx="160" cy="92" r="5" fill="#C97A3A" />
      {/* Top-right: dal yellow */}
      <rect x="202" y="58" width="100" height="65" rx="4" fill="#C4943A" />
      <ellipse cx="252" cy="90" rx="35" ry="14" fill="#E8B96F" opacity="0.85" />
      <circle cx="245" cy="85" r="3" fill="#7FA67A" />
      <circle cx="262" cy="92" r="3" fill="#7FA67A" />
      {/* Bottom-left: rice */}
      <rect x="98" y="127" width="100" height="65" rx="4" fill="#F2D894" />
      <ellipse cx="148" cy="160" rx="40" ry="16" fill="#FFEBC4" />
      {Array.from({ length: 10 }).map((_, i) => (
        <ellipse key={i} cx={120 + (i * 6)} cy={150 + ((i % 3) * 7)} rx="2" ry="1" fill="#E8B96F" opacity="0.85" transform={`rotate(${i * 30} ${120 + i*6} ${150 + (i%3)*7})`} />
      ))}
      {/* Bottom-right: green veg */}
      <rect x="202" y="127" width="100" height="65" rx="4" fill="#6A8A4A" />
      <ellipse cx="252" cy="160" rx="35" ry="14" fill="#8FB8A0" opacity="0.85" />
      <circle cx="240" cy="155" r="3" fill="#4a6a3a" />
      <circle cx="265" cy="162" r="3" fill="#4a6a3a" />
      <circle cx="255" cy="168" r="3" fill="#4a6a3a" />
      {/* Roti on top */}
      <ellipse cx="200" cy="35" rx="55" ry="14" fill="#E8B96F" stroke="#8B5A1E" strokeWidth="1" />
      <ellipse cx="195" cy="32" rx="40" ry="8" fill="#F5D89A" />
      <circle cx="180" cy="33" r="2" fill="#8B5A1E" opacity="0.5" />
      <circle cx="210" cy="35" r="2" fill="#8B5A1E" opacity="0.5" />
      {/* Steam */}
      <g stroke="#FFF5E6" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.45">
        <path d="M 170 20 Q 165 -5, 175 -25" strokeDasharray="60" strokeDashoffset="60" style={{ animation: 'steamRise 2.8s ease-out infinite' }} />
        <path d="M 200 15 Q 205 -10, 195 -28" strokeDasharray="60" strokeDashoffset="60" style={{ animation: 'steamRise 2.8s ease-out infinite', animationDelay: '0.6s' }} />
        <path d="M 230 20 Q 225 -5, 235 -25" strokeDasharray="60" strokeDashoffset="60" style={{ animation: 'steamRise 2.8s ease-out infinite', animationDelay: '1.2s' }} />
      </g>
    </svg>
  )
}
