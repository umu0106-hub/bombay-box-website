'use client'

import { categories } from '@/lib/menu'
import type { Category } from '@/lib/menu'

interface CategoryNavProps {
  active: Category
  onSelect: (cat: Category) => void
}

export default function CategoryNav({ active, onSelect }: CategoryNavProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '8px',
      }}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            padding: '8px 16px',
            backgroundColor: active === cat ? '#f4a460' : '#2d2d2d',
            color: active === cat ? '#000' : '#f0f0f0',
            border: active === cat ? 'none' : '1px solid #404040',
            borderRadius: '8px',
            fontWeight: '600',
            textTransform: 'capitalize',
            cursor: 'pointer',
            transition: 'all 200ms ease-in-out',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            if (active !== cat) {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#f4a460'
            }
          }}
          onMouseLeave={(e) => {
            if (active !== cat) {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#404040'
            }
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
