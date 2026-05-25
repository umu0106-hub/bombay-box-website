'use client'

import Link from 'next/link'
import { RESTAURANT } from '@/lib/menu'

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '3rem',
        paddingBottom: '3rem',
      }}
    >
      <style>{`
        .hero-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 960px) {
          .hero-container {
            grid-template-columns: 55fr 45fr;
            gap: 4rem;
          }
        }

        .hero-content h1 {
          font-size: clamp(2.5rem, 7vw, 5rem);
          color: var(--charcoal);
          margin-bottom: 1.2rem;
          line-height: 1.15;
        }

        .hero-tagline {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          border: 1px solid var(--terracotta-soft);
          background: rgba(165, 78, 39, 0.05);
          color: var(--terracotta);
          font-family: var(--f-mono);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          color: var(--charcoal);
          line-height: 1.6;
          max-width: 500px;
          margin-bottom: 2rem;
          font-family: var(--f-body);
          font-weight: 400;
        }

        .hero-ctas {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .hero-visual {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(135deg, rgba(212, 165, 116, 0.1), rgba(165, 78, 39, 0.05));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid var(--cream-line);
        }

        .hero-visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
        }

        .hero-accent {
          color: var(--terracotta);
        }

        .hero-location {
          font-size: 0.9rem;
          color: var(--charcoal);
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hero-stagger-1 {
          animation: fadeInUp 0.8s var(--ease-warm) 0.1s both;
        }

        .hero-stagger-2 {
          animation: fadeInUp 0.8s var(--ease-warm) 0.2s both;
        }

        .hero-stagger-3 {
          animation: fadeInUp 0.8s var(--ease-warm) 0.3s both;
        }

        .hero-stagger-4 {
          animation: fadeInUp 0.8s var(--ease-warm) 0.4s both;
        }

        .hero-stagger-5 {
          animation: fadeInUp 0.8s var(--ease-warm) 0.5s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'inherit', gap: 'inherit' }}>
        <div className="hero-container">
          {/* LEFT: Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="hero-stagger-1">
              <span className="hero-tagline">
                🔥 Fresh · Made Daily · Rochelle Park NJ
              </span>
            </div>

            <div className="hero-stagger-2">
              <h1>
                Premium <span className="hero-accent">Indian</span> Fast Casual
              </h1>
            </div>

            <div className="hero-stagger-3">
              <p className="hero-subtitle">
                Build your own bowl with authentic spices. Order tandoori chicken. Indulge in slow-cooked biryani. Fresh ingredients, zero shortcuts, built for flavor.
              </p>
            </div>

            <div className="hero-stagger-4">
              <div className="hero-ctas">
                <Link href="/menu" className="btn btn-primary">
                  Explore Menu
                </Link>
                <a href={RESTAURANT.phone} className="btn btn-secondary">
                  Call to Order
                </a>
              </div>
            </div>

            <div className="hero-stagger-5">
              <div className="hero-location">
                <span>📍</span>
                <span>
                  {RESTAURANT.inside} · {RESTAURANT.location}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Visual */}
          <div className="hero-stagger-3">
            <div className="hero-visual">
              <img
                src="https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=600&q=80"
                alt="Bombay Box Signature Bowl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
