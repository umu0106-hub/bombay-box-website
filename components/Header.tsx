import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from './CartContext'
import { BombayBoxLogo } from './BombayBoxLogo'

export default function Header() {
  const router = useRouter()
  const { items } = useCart()

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <header style={{
      backgroundColor: '#1a1a1a',
      borderBottom: '1px solid #404040',
      padding: '16px 20px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <BombayBoxLogo size={32} />
          <span style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#f4a460',
          }}>
            Bombay Box
          </span>
        </button>

        {/* Nav Links */}
        <nav style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
        }}>
          <Link href="/menu" style={{
            color: '#f0f0f0',
            textDecoration: 'none',
            fontSize: '16px',
            transition: 'color 200ms ease-in-out',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#f4a460')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#f0f0f0')}
          >
            Menu
          </Link>
          <a href="#" style={{
            color: '#f0f0f0',
            textDecoration: 'none',
            fontSize: '16px',
            transition: 'color 200ms ease-in-out',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#f4a460')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#f0f0f0')}
          >
            About
          </a>
          <a href="#" style={{
            color: '#f0f0f0',
            textDecoration: 'none',
            fontSize: '16px',
            transition: 'color 200ms ease-in-out',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#f4a460')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#f0f0f0')}
          >
            Contact
          </a>
          {items.length > 0 && (
            <Link href="/checkout" style={{
              position: 'relative',
              color: '#f0f0f0',
              textDecoration: 'none',
              fontSize: '16px',
              transition: 'color 200ms ease-in-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f4a460')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#f0f0f0')}
            >
              🛒 Checkout
              {items.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#ff8c42',
                  color: '#fff',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}>
                  {items.length}
                </span>
              )}
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
