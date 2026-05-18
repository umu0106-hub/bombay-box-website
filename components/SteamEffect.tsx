'use client'

export function SteamEffect() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '20px',
        paddingTop: '20px',
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: 'relative',
            width: '20px',
            height: '60px',
          }}
        >
          <svg
            viewBox="0 0 20 60"
            width="20"
            height="60"
            style={{
              animation: `steam ${1.5 + i * 0.2}s ease-in infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <circle cx="10" cy="10" r="6" fill="#fbbf24" opacity="0.6" />
            <circle cx="10" cy="20" r="5" fill="#fbbf24" opacity="0.5" />
            <circle cx="10" cy="30" r="4" fill="#fbbf24" opacity="0.4" />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes steam {
          0% {
            transform: translateY(0) scaleY(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-60px) scaleY(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
