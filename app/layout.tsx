'use client'

import type { ReactNode } from 'react'
import { CartProvider } from '@/components/CartContext'
import '@/styles/globals.css'

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Bombay Box - Premium Indian Fast Casual Dining" />
        <meta name="keywords" content="indian food, bowls, takeout, delivery" />
        <meta name="theme-color" content="#1a1a1a" />
        <title>Bombay Box - Premium Indian Fast Casual</title>
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
