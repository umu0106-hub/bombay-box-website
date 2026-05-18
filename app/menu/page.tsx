'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import CategoryNav from '@/components/CategoryNav'
import MenuCard from '@/components/MenuCard'
import BowlBuilder from '@/components/BowlBuilder'
import Cart from '@/components/Cart'
import {
  categories,
  itemsByCategory,
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
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const catName = entry.target.id.replace('cat-', '') as Category
            setActive(catName)
          }
        })
      },
      { threshold: 0.3 }
    )
    categories.forEach(cat => {
      const el = document.getElementById(`cat-${cat}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main style={{
        minHeight: '100vh',
        backgroundColor: '#1a1a1a',
        paddingBottom: '40px',
      }}>
        {/* Sticky Category Nav */}
        <div style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#1a1a1a',
          borderBottom: '1px solid #404040',
          zIndex: 50,
          paddingTop: '16px',
          paddingBottom: '16px',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}>
            <CategoryNav active={active} onSelect={handleSelect} />
          </div>
        </div>

        {/* Content Grid */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: '1fr 350px',
          gap: '32px',
          alignItems: 'start',
        }}>
          {/* Menu Items */}
          <div>
            {categories.map(cat => (
              <section
                key={cat}
                id={`cat-${cat}`}
                style={{
                  marginBottom: '60px',
                  scrollMarginTop: '140px',
                }}
              >
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#f4a460',
                  marginBottom: '24px',
                  textTransform: 'capitalize',
                }}>
                  {cat}
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '20px',
                }}>
                  {itemsByCategory[cat].map(item => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Right Sidebar: Bowl Builder + Cart */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}>
            <BowlBuilder />
            <Cart />
          </div>
        </div>
      </main>
    </>
  )
}
