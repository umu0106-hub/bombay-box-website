/**
 * Bombay Box Color Palette
 * Premium Indian Fast Casual
 */

// Primary Colors
export const colors = {
  // Backgrounds
  cream: '#F5E6D3',
  creamDark: '#EFD9C3',
  white: '#FFFFFF',
  charcoal: '#1C1410',

  // Accents
  terracotta: '#A54E27',
  terracottaLight: '#C76E47',
  gold: '#D4A574',
  goldLight: '#E8C4A0',
  forestGreen: '#2D4A3D',
  forestGreenLight: '#4A6A59',

  // Text
  textPrimary: '#1C1410',
  textSecondary: '#6B5B4F',
  textLight: '#F5E6D3',
  textLightMuted: 'rgba(245, 230, 211, 0.72)',

  // Borders & Lines
  borderLight: 'rgba(245, 230, 211, 0.2)',
  borderMuted: 'rgba(165, 78, 39, 0.1)',

  // Shadows
  shadowLight: 'rgba(0, 0, 0, 0.08)',
  shadowMed: 'rgba(0, 0, 0, 0.15)',
  shadowHeavy: 'rgba(0, 0, 0, 0.3)',

  // Glows
  glowTerracotta: '0 10px 40px -10px rgba(165, 78, 39, 0.3)',
  glowGold: '0 10px 40px -10px rgba(212, 165, 116, 0.25)',
  glowForestGreen: '0 10px 40px -10px rgba(45, 74, 61, 0.25)',
} as const

export type ColorKey = keyof typeof colors
