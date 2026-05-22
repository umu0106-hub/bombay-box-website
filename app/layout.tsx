import type { Metadata, Viewport } from 'next'
import { Yeseva_One, Archivo_Black, Lora, DM_Mono } from 'next/font/google'
import { CartProvider } from '@/components/CartContext'
import '@/styles/globals.css'

const yeseva = Yeseva_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-yeseva',
  display: 'swap',
})

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-archivo-black',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://eatbombaybox.com'),
  title: 'Bombay Box · Fast Indian Takeout · Rochelle Park NJ',
  description:
    'Fresh ingredients. Made every day. Build your bowl, grab a tiffin, or try street fusion. Fast Indian takeout in Rochelle Park, NJ.',
  keywords: [
    'Indian takeout',
    'Rochelle Park',
    'New Jersey',
    'biryani',
    'tikka',
    'tiffin',
    'paneer',
    'halal',
    'fast Indian food',
  ],
  openGraph: {
    title: 'Bombay Box · Fast Indian Takeout',
    description: 'Fresh Indian food, made daily. Inside Subzi Bazar, Rochelle Park NJ.',
    url: 'https://eatbombaybox.com',
    siteName: 'Bombay Box',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bombay Box · Fast Indian Takeout',
    description: 'Fresh Indian food, made daily. Inside Subzi Bazar, Rochelle Park NJ.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#1C1410',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${yeseva.variable} ${archivoBlack.variable} ${lora.variable} ${dmMono.variable}`}
    >
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}