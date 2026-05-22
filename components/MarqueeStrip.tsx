'use client'

/**
 * MarqueeStrip — infinite-scroll text band.
 *
 * Renders the same content twice in a row, then translates -50% across
 * the full loop duration. Edges fade out via a horizontal mask.
 */

interface Props {
  items: string[]
  /** Total seconds for one full loop. Default 32. */
  duration?: number
  /** Hex/RGB background — defaults to page bg */
  background?: string
  /** Text color */
  color?: string
  /** Font size in CSS units (e.g. "64px") */
  fontSize?: string
  /** Italic display style */
  italic?: boolean
  separator?: string
}

export default function MarqueeStrip({
  items,
  duration = 32,
  background = '#1C1410',
  color = '#FFF5E6',
  fontSize = 'clamp(2.2rem, 5vw, 4rem)',
  italic = true,
  separator = '·',
}: Props) {
  const text = items.join(`  ${separator}  `) + `  ${separator}  `

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        background,
        overflow: 'hidden',
        padding: '1.6rem 0',
        borderTop: '1px solid rgba(255,245,230,0.08)',
        borderBottom: '1px solid rgba(255,245,230,0.08)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          display: 'inline-flex',
          whiteSpace: 'nowrap',
          willChange: 'transform',
          animation: `marquee ${duration}s linear infinite`,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--f-display)',
            fontStyle: italic ? 'italic' : 'normal',
            fontSize,
            color,
            letterSpacing: '0.02em',
            paddingRight: '2rem',
          }}
        >
          {text}
        </span>
        <span
          style={{
            fontFamily: 'var(--f-display)',
            fontStyle: italic ? 'italic' : 'normal',
            fontSize,
            color,
            letterSpacing: '0.02em',
            paddingRight: '2rem',
          }}
        >
          {text}
        </span>
      </div>
    </div>
  )
}
