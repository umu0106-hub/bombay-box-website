'use client'

import { RESTAURANT } from '@/lib/menu'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--charcoal)', color: 'var(--cream)', padding: '3rem 1.5rem' }}>
      <style>{`
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h3 {
          color: var(--gold);
          font-family: var(--f-display);
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        .footer-section p {
          color: var(--cream-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }

        .footer-section a {
          color: var(--gold);
          text-decoration: none;
          transition: color 0.2s var(--ease-soft);
        }

        .footer-section a:hover {
          color: var(--cream);
        }

        .footer-divider {
          border-top: 1px solid rgba(245, 230, 211, 0.2);
          padding-top: 2rem;
          margin-top: 2rem;
          text-align: center;
          color: var(--cream-faint);
          font-size: 0.9rem;
        }

        .footer-location {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .location-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .location-label {
          color: var(--gold);
          font-weight: 600;
          min-width: 70px;
        }

        .location-value {
          color: var(--cream-muted);
        }
      `}</style>

      <div className="footer-content">
        {/* Restaurant Info */}
        <div className="footer-section">
          <h3>Bombay Box</h3>
          <p>{RESTAURANT.tagline}</p>
          <p style={{ fontSize: '0.85rem', marginTop: '1rem', color: 'var(--cream-faint)' }}>
            Premium Indian fast casual. Fresh ingredients. Zero shortcuts. Made daily.
          </p>
        </div>

        {/* Location & Hours */}
        <div className="footer-section">
          <h3>Location & Hours</h3>
          <div className="footer-location">
            <div className="location-item">
              <span className="location-label">📍 Address:</span>
              <span className="location-value">
                {RESTAURANT.location}
                <br />
                {RESTAURANT.inside}
              </span>
            </div>
            <div className="location-item">
              <span className="location-label">📞 Call:</span>
              <a href={`tel:${RESTAURANT.phone}`}>{RESTAURANT.phone}</a>
            </div>
            <div className="location-item">
              <span className="location-label">🕐 Hours:</span>
              <span className="location-value">
                Mon-Fri: 11am-9pm
                <br />
                Sat-Sun: 12pm-9pm
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p>
            <a href="/menu">Browse Menu</a>
          </p>
          <p>
            <a href="tel:+12015461558">Call to Order</a>
          </p>
          <p>
            <a href={`https://www.google.com/maps/search/${RESTAURANT.location}`} target="_blank" rel="noopener noreferrer">
              Get Directions
            </a>
          </p>
          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--cream-faint)' }}>
            Takeout Only · Fresh Daily · No Delivery (Yet)
          </p>
        </div>
      </div>

      <div className="footer-divider">
        <p>© 2026 Bombay Box · Premium Indian Fast Casual · Rochelle Park, NJ</p>
      </div>
    </footer>
  )
}