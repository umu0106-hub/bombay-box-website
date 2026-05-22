'use client'

import { categories, type Category } from '@/lib/menu'

interface Props {
  active: Category
  onSelect: (cat: Category) => void
  /** Top offset for sticky positioning (header height) */
  stickyTop?: number
}

export default function CategoryNav({ active, onSelect, stickyTop = 72 }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      style={{
        position: 'sticky',
        top: stickyTop,
        zIndex: 50,
        background: 'rgba(28, 20, 16, 0.92)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255,245,230,0.08)',
        padding: '0.9rem 0',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          gap: '0.55rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <style>{`
          [role="tablist"] > div::-webkit-scrollbar { display: none; }
        `}</style>
        {categories.map((cat) => {
          const isActive = cat.key === active
          return (
            <button
              key={cat.key}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onSelect(cat.key)}
              style={{
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.7rem 1.1rem',
                borderRadius: '999px',
                background: isActive ? 'var(--saffron)' : 'transparent',
                color: isActive ? 'var(--charcoal)' : 'var(--cream-muted)',
                border: isActive
                  ? '1.5px solid var(--saffron)'
                  : '1.5px solid rgba(255,245,230,0.14)',
                fontFamily: 'var(--f-bold)',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                minHeight: '44px',
                cursor: 'pointer',
                transition: 'all 0.25s var(--ease-warm)',
                boxShadow: isActive
                  ? '0 8px 24px -8px rgba(255,107,26,0.5)'
                  : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--cream)'
                  e.currentTarget.style.borderColor = 'rgba(255,172,48,0.5)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--cream-muted)'
                  e.currentTarget.style.borderColor = 'rgba(255,245,230,0.14)'
                }
              }}
            >
              <span aria-hidden="true" style={{ fontSize: '1rem' }}>
                {cat.emoji}
              </span>
              <span>{cat.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
