'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { MenuItem } from '@/lib/menu'

export interface CartItem {
  cartId: string
  itemId: string
  name: string
  price: number
  quantity: number
  customizations: Array<{ id: string; name: string }>
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (item: CartItem) => void
  removeItem: (cartId: string) => void
  updateQuantity: (cartId: string, newQuantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  tax: number
  total: number
  bumpKey: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [bumpKey, setBumpKey] = useState(0)

  /* Restore cart from session storage on mount */
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('bombay-box-cart')
      if (saved) {
        setItems(JSON.parse(saved))
      }
    } catch (err) {
      console.error('[CartProvider] Failed to restore cart:', err)
    }
  }, [])

  /* Save cart to session storage whenever it changes */
  useEffect(() => {
    try {
      sessionStorage.setItem('bombay-box-cart', JSON.stringify(items))
    } catch (err) {
      console.error('[CartProvider] Failed to save cart:', err)
    }
  }, [items])

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.cartId === item.cartId)
      if (existing) {
        return prev.map((it) => (it.cartId === item.cartId ? { ...it, quantity: it.quantity + 1 } : it))
      }
      return [...prev, item]
    })
    setBumpKey((k) => k + 1)
  }, [])

  const removeItem = useCallback((cartId: string) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId))
  }, [])

  const updateQuantity = useCallback((cartId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(cartId)
    } else {
      setItems((prev) => prev.map((item) => (item.cartId === cartId ? { ...item, quantity: newQuantity } : item)))
    }
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
    sessionStorage.removeItem('bombay-box-cart')
  }, [])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const TAX_RATE = 0.06625 // NJ
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100
  const total = Math.round((subtotal + tax) * 100) / 100

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        tax,
        total,
        bumpKey,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
