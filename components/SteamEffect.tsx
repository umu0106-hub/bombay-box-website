'use client'

/**
 * SteamEffect — reusable CSS/SVG steam wisps.
 *
 * Drop into any card or section to add warmth. Each wisp draws itself
 * upward via stroke-dashoffset, fades, and restarts.
 */

import { useId } from 'react'

interface Props {
  /** Number of wisps (default 3) */
  count?: number
  /** Width of the area in px (default 60) */
  width?: number
  /** Height of the area in px (default 80) */
  height?: number
  /** Stroke color (default cream) */
  color?: string
  /** Animation duration in seconds */
  duration?: number
  /** Stroke width */
  strokeWidth?: number
  /** Opacity */
  opacity?: number
  className?: string
}

export default function SteamEffect({
  count = 3,
  width = 60,
  height = 80,
  color = '#FFF5E6',
  duration = 2.5,
  strokeWidth = 2,
  opacity = 0.7,
  className,
}: Props) {
  const uid = useId().replace(/:/g, '')
  const cols = Math.max(2, count)
  const segment = width / (cols + 1)

  /* Build wisps spaced across width */
  const wisps = Array.from({ length: count }).map((_, i) => {
    const x = segment * (i + 1)
    /* Curve direction alternates */
    const dir = i % 2 === 0 ? 1 : -1
    const startY = height * 0.85
    const midY = height * 0.5
    const endY = height * 0.05
    const sway = 6
    const d = `M ${x} ${startY} C ${x + sway * dir} ${midY + 10}, ${x - sway * dir} ${midY - 10}, ${x} ${endY}`
    const delay = i * (duration / count) * 0.6
    return { d, key: `${uid}-${i}`, delay }
  })

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <g
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={opacity}
      >
        {wisps.map((w) => (
          <path
            key={w.key}
            d={w.d}
            strokeDasharray="120"
            strokeDashoffset="120"
            style={{
              animation: `steamRise ${duration}s ease-out infinite`,
              animationDelay: `${w.delay}s`,
            }}
          />
        ))}
      </g>
    </svg>
  )
}
