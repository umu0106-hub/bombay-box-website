'use client'

import { Header } from '@/components/Header'
import { HeroAnimation } from '@/components/HeroAnimation'
import { MarqueeStrip } from '@/components/MarqueeStrip'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <HeroAnimation />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}>
            <h1 style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#f4a460',
              marginBottom: '24px',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              textAlign: 'center',
            }}>
              🍛 Bombay Box
            </h1>
            <p style={{
              fontSize: '24px',
              color: '#f0f0f0',
              marginBottom: '32px',
              textAlign: 'center',
              maxWidth: '600px',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}>
              Premium Indian Fast Casual Dining
            </p>
            <Link href="/menu" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 48px',
              backgroundColor: '#f4a460',
              color: '#000',
              fontSize: '18px',
              fontWeight: '600',
              borderRadius: '12px',
              transition: 'all 200ms ease-in-out',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement
              target.style.backgroundColor = '#fbbf24'
              target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement
              target.style.backgroundColor = '#f4a460'
              target.style.transform = 'translateY(0)'
            }}
            >
              Order Now
            </Link>
          </div>
        </section>

        {/* Marquee */}
        <MarqueeStrip />

        {/* Features Section */}
        <section style={{
          padding: '80px 20px',
          backgroundColor: '#1a1a1a',
          borderTop: '1px solid #404040',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#f4a460',
              marginBottom: '60px',
              textAlign: 'center',
            }}>
              Why Choose Bombay Box?
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}>
              {[
                { icon: '✨', title: 'Premium Quality', desc: 'Fresh ingredients, authentic recipes' },
                { icon: '⚡', title: 'Fast Service', desc: 'Quick preparation, no compromise' },
                { icon: '🎯', title: 'Custom Bowls', desc: 'Build your perfect meal' },
              ].map((feature, idx) => (
                <div key={idx} style={{
                  padding: '32px',
                  backgroundColor: '#2d2d2d',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: '1px solid #404040',
                  transition: 'all 200ms ease-in-out',
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget
                  target.style.borderColor = '#f4a460'
                  target.style.boxShadow = '0 10px 25px rgba(244, 164, 96, 0.1)'
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget
                  target.style.borderColor = '#404040'
                  target.style.boxShadow = 'none'
                }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>{feature.icon}</div>
                  <h3 style={{ fontSize: '24px', color: '#f4a460', marginBottom: '12px' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#a0a0a0' }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: '80px 20px',
          backgroundColor: '#2d2d2d',
          borderTop: '1px solid #404040',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#f4a460',
            marginBottom: '32px',
          }}>
            Ready to Taste the Difference?
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#a0a0a0',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px',
          }}>
            Explore our menu and customize your perfect bowl today.
          </p>
          <Link href="/menu" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 48px',
            backgroundColor: '#f4a460',
            color: '#000',
            fontSize: '18px',
            fontWeight: '600',
            borderRadius: '12px',
            transition: 'all 200ms ease-in-out',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLElement
            target.style.backgroundColor = '#fbbf24'
            target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLElement
            target.style.backgroundColor = '#f4a460'
            target.style.transform = 'translateY(0)'
          }}
          >
            View Menu
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '40px 20px',
        backgroundColor: '#1a1a1a',
        borderTop: '1px solid #404040',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <p style={{ color: '#a0a0a0', marginBottom: '12px' }}>
            © 2024 Bombay Box. All rights reserved.
          </p>
          <p style={{ color: '#707070', fontSize: '14px' }}>
            📍 Your Location | 📞 (555) 123-4567
          </p>
        </div>
      </footer>
    </>
  )
}
