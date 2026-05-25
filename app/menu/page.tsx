'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import CategoryNav from '@/components/CategoryNav'
import MenuCard from '@/components/MenuCard'
import BowlBuilder from '@/components/BowlBuilder'
import Cart from '@/components/Cart'
import {
  categories,
  getItemsByCategory,
  menuItems,
  type Category,
} from '@/lib/menu'

export default function MenuPage() {
  const [active, setActive] = useState<Category>('bowl')

  /* Smooth scroll to category section when pill clicked */
  const handleSelect = (cat: Category) => {
    setActive(cat)
    const el = document.getElementById(`cat-${cat}`)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 140
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  /* Track which category is in view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const id = visible.target.id.replace('cat-', '') as Category
          setActive(id)
        }
      },
      { rootMargin: '-180px 0px -55% 0px', threshold: [0.1, 0.5] },
    )
    categories.forEach((c) => {
      const el = document.getElementById(`cat-${c.key}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main style={{ paddingBottom: '6rem' }}>
        {/* Page header */}
        <section
          style={{
            padding: '4rem 0 2.5rem',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div className="container">
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
              EVERYTHING ON THE MENU
            </span>
            <h1
              className="f-display"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
                color: 'var(--cream)',
                margin: 0,
                marginBottom: '0.8rem',
                letterSpacing: '-0.01em',
              }}
            >
              What Are You Craving Today?
            </h1>
            <p
              style={{
                fontFamily: 'var(--f-body)',
                color: 'var(--cream-muted)',
                fontSize: '1.1rem',
                maxWidth: '52ch',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Made fresh every morning. Order online, pick up fast.
            </p>
          </div>
        </section>

        {/* Category nav */}
        <CategoryNav active={active} onSelect={handleSelect} stickyTop={72} />

        {/* Bowl Builder — full hero section */}
        <section
          id="cat-bowl"
          style={{
            padding: '4rem 0',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div className="container">
            <CategoryHeader catKey="bowl" />
            <div style={{ marginTop: '2.5rem' }}>
              <BowlBuilder />
            </div>
          </div>
        </section>

        {/* Tiffin */}
        <CategorySection catKey="tiffin" />

        {/* Street Fusion — with sub-section labels */}
        <section
          id="cat-street"
          style={{
            padding: '4rem 0',
            background: 'var(--charcoal-2)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div className="container">
            <CategoryHeader catKey="street" />
            <ItemGrid ids={getItemsByCategory('street').map((i) => i.id)} />
          </div>
        </section>

        <CategorySection catKey="grill" />
        <CategorySection catKey="biryani" background="var(--charcoal-2)" />
        <CategorySection catKey="snacks" />
        <CategorySection catKey="drinks" background="var(--charcoal-2)" />

        {/* Allergy note */}
        <section style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(255,245,230,0.06)' }}>
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
              HALAL AVAILABLE · JAIN ON REQUEST · MAY CONTAIN: GLUTEN · DAIRY · NUTS
              <br />
              ALWAYS INFORM OUR STAFF OF ALLERGIES · SHARED KITCHEN
            </p>
          </div>
        </section>
      </main>
      <Cart />
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function CategorySection({
  catKey,
  background,
}: {
  catKey: Category
  background?: string
}) {
  const items = getItemsByCategory(catKey)
  return (
    <section
      id={`cat-${catKey}`}
      style={{
        padding: '4rem 0',
        background: background ?? 'transparent',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container">
        <CategoryHeader catKey={catKey} />
        <div style={{ marginTop: '2.5rem' }}>
          <ItemGrid ids={items.map((i) => i.id)} />
        </div>
      </div>
    </section>
  )
}

function CategoryHeader({ catKey }: { catKey: Category }) {
  const meta = categories.find((c) => c.key === catKey)
  if (!meta) return null
  return (
    <header style={{ maxWidth: '720px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          marginBottom: '0.6rem',
        }}
      >
        <span
          className="f-mono"
          style={{
            fontSize: '0.7rem',
            color: 'var(--amber)',
            letterSpacing: '0.18em',
          }}
        >
          {meta.number} · {meta.subLabel ?? meta.title.toUpperCase()}
        </span>
      </div>
      <h2
        className="f-display"
        style={{
          fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
          color: 'var(--cream)',
          margin: 0,
          marginBottom: '1rem',
          letterSpacing: '-0.01em',
        }}
      >
        <span style={{ marginRight: '0.6rem' }} aria-hidden="true">{meta.emoji}</span>
        {meta.title}
      </h2>
      <p
        style={{
          fontFamily: 'var(--f-body)',
          color: 'var(--cream-muted)',
          fontSize: '1.05rem',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {meta.appetiteCopy}
      </p>
      {meta.note && (
        <p
          className="f-mono"
          style={{
            fontSize: '0.7rem',
            color: 'var(--amber)',
            letterSpacing: '0.1em',
            marginTop: '0.8rem',
          }}
        >
          {meta.note}
        </p>
      )}
    </header>
  )
}

function ItemGrid({ ids }: { ids: string[] }) {
  const allItems = ids
    .map((id) => menuItems.find((i) => i.id === id))
    .filter((x): x is NonNullable<typeof x> => x != null)

  if (allItems.length === 0) return null

  return (
    <div
      className="menu-grid"
      style={{
        display: 'grid',
        gap: '1.5rem',
        gridTemplateColumns: '1fr',
      }}
    >
      <style>{`
        @media (min-width: 640px) {
          .menu-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .menu-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
      {allItems.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  )
}
