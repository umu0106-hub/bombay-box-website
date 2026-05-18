'use client'

export function MarqueeStrip() {
  const message = '✨ Fresh • Authentic • Fast ✨ Fresh • Authentic • Fast ✨ Fresh • Authentic • Fast ✨'

  return (
    <div
      style={{
        backgroundColor: '#f4a460',
        color: '#000',
        padding: '12px 20px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontWeight: '700',
        fontSize: '18px',
        letterSpacing: '2px',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          animation: 'scroll 20s linear infinite',
        }}
      >
        {message}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}
