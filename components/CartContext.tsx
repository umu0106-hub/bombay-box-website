'use client'

/**
 * Cart Context — global cart state.
 * Persisted in sessionStorage (per spec) so it survives reloads
 * but doesn't linger across browser sessions.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { v4 as uuid } from 'uuid'
import { RESTAURANT } from '@/lib/menu'

export interface CartCustomizations {
  protein?: string
  sauces?: string[]
  toppings?: string[]
  extraSauces?: string[]
}

export interface CartItem {
  id: string
  menuItemId: string
  name: string
  price: number
  quantity: number
  customizations?: CartCustomizations
}

export interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  subtotal: number
  tax: number
  total: number
  itemCount: number

  /* UI state — slide-out cart visibility */
  isOpen: boolean
  openCart: () => void
  closeCart: () => void

  /* Trigger header shake animation after add-to-cart */
  bumpKey: number
  triggerBump: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'bombay-box-cart-v1'

type Action =
  | { type: 'HYDRATE'; items: CartItem[] }
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE_QTY'; id: string; qty: number }
  | { type: 'CLEAR' }

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'HYDRATE':
      return action.items
    case 'ADD':
      return [...state, action.item]
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id)
    case 'UPDATE_QTY':
      return state
        .map((i) => (i.id === action.id ? { ...i, quantity: action.qty } : i))
        .filter((i) => i.quantity > 0)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [])
  const [isOpen, setIsOpen] = useState(false)
  const [bumpKey, setBumpKey] = useState(0)
  const hydratedRef = useRef(false)

  /* Hydrate from sessionStorage on mount */
  useEffect(() => {
    try {
      const raw =
        typeof window !== 'undefined'
          ? window.sessionStorage.getItem(STORAGE_KEY)
          : null
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE', items: parsed })
        }
      }
    } catch {
      /* ignore — corrupted storage shouldn't crash */
    }
    hydratedRef.current = true
  }, [])

  /* Persist whenever cart changes (after hydration) */
  useEffect(() => {
    if (!hydratedRef.current) return
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      }
    } catch {
      /* storage full or unavailable — silently degrade */
    }
  }, [items])

  const addItem = useCallback((item: Omit<CartItem, 'id'>) => {
    dispatch({ type: 'ADD', item: { ...item, id: uuid() } })
    setBumpKey((k) => k + 1)
  }, [])

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', id })
  }, [])

  const updateQuantity = useCallback((id: string, qty: number) => {
    dispatch({ type: 'UPDATE_QTY', id, qty: Math.max(0, qty) })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const triggerBump = useCallback(() => setBumpKey((k) => k + 1), [])

  const { subtotal, tax, total, itemCount } = useMemo(() => {
    const sub = items.reduce((s, i) => s + i.price * i.quantity, 0)
    const t = sub * RESTAURANT.taxRate
    return {
      subtotal: round2(sub),
      tax: round2(t),
      total: round2(sub + t),
      itemCount: items.reduce((c, i) => c + i.quantity, 0),
    }
  }, [items])

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    tax,
    total,
    itemCount,
    isOpen,
    openCart,
    closeCart,
    bumpKey,
    triggerBump,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}
