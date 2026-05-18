'use client'

import { useEffect, useState } from 'react'

export function HeroAnimation() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '300px',
        opacity: animate ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      {/* Animated Bowl */}
      <div
        style={{
          width: '200px',
          height: '180px',
          margin: '0 auto',
          position: 'relative',
          animation: animate ? 'float 4s ease-in-out infinite' : 'none',
        }}
      >
        <svg
          viewBox="0 0 200 180"
          width="200"
          height="180"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(244, 164, 96, 0.3))' }}
        >
          {/* Bowl */}
          <ellipse cx="100" cy="60" rx="70" ry="15" fill="#f4a460" />
          <path
            d="M 30 60 Q 30 80 50 100 L 150 100 Q 170 80 170 60"
            stroke="#f4a460"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 30 60 L 50 100 M 170 60 L 150 100"
            stroke="#f4a460"
            strokeWidth="3"
            fill="none"
          />

          {/* Rice inside */}
          <circle cx="80" cy="85" r="4" fill="#fbbf24" />
          <circle cx="100" cy="88" r="4" fill="#fbbf24" />
          <circle cx="120" cy="85" r="4" fill="#fbbf24" />
          <circle cx="90" cy="95" r="3" fill="#fbbf24" />
          <circle cx="110" cy="95" r="3" fill="#fbbf24" />

          {/* Topping */}
          <circle cx="85" cy="75" r="5" fill="#ff8c42" />
          <circle cx="115" cy="78" r="5" fill="#ff8c42" />
          <circle cx="100" cy="72" r="4" fill="#ff8c42" />
        </svg>
      </div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            backgroundColor: '#f4a460',
            borderRadius: '50%',
            left: `${30 + i * 12}%`,
            top: '10%',
            animation: animate ? `float-particle ${2 + i * 0.3}s ease-in-out infinite` : 'none',
            opacity: 0.6,
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-particle {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) translateX(20px);
          }
        }
      `}</style>
    </div>
  )
}
