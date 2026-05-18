interface LogoProps {
  size?: number
}

export function BombayBoxLogo({ size = 24 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bowl shape */}
      <path
        d="M 20 40 Q 20 30 30 25 L 70 25 Q 80 30 80 40 L 75 75 Q 75 85 65 85 L 35 85 Q 25 85 25 75 Z"
        stroke="#f4a460"
        strokeWidth="2"
        fill="none"
      />
      {/* Spoon */}
      <circle cx="45" cy="50" r="6" fill="#f4a460" />
      <path
        d="M 45 56 Q 40 65 35 72"
        stroke="#f4a460"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Steam wisps */}
      <path
        d="M 35 20 Q 35 15 38 10"
        stroke="#fbbf24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M 50 18 Q 50 13 53 8"
        stroke="#fbbf24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M 65 20 Q 65 15 68 10"
        stroke="#fbbf24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}
