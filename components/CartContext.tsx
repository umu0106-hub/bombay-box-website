'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity?: number
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface CartContextType {
  items: CartItem[]
  total: number
  tax: number
  grandTotal: number
  customerInfo: CustomerInfo
  setCustomerInfo: (info: CustomerInfo) => void
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const savedItems = sessionStorage.getItem('cartItems')
      if (savedItems) {
        setItems(JSON.parse(savedItems))
      }
    } catch (error) {
      console.error('Failed to load cart from sessionStorage:', error)
    }
  }, [])

  // Save to sessionStorage on change
  useEffect(() => {
    try {
      sessionStorage.setItem('cartItems', JSON.stringify(items))
    } catch (error) {
      console.error('Failed to save cart to sessionStorage:', error)
    }
  }, [items])

  const total = items.reduce((sum, item) => sum + item.price, 0)
  const tax = parseFloat((total * 0.06625).toFixed(2))
  const grandTotal = total + tax

  const addItem = (item: CartItem) => {
    setItems([...items, { ...item, id: `${item.id}-${Date.now()}` }])
  }

  const removeItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId))
  }

  const clearCart = () => {
    setItems([])
    sessionStorage.removeItem('cartItems')
  }

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        tax,
        grandTotal,
        customerInfo,
        setCustomerInfo,
        addItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
