const CARD_BACKGROUND = '1a1a1a'

const hexToRgb = (hex: string) => ({
  r: parseInt(hex.substring(0, 2), 16),
  g: parseInt(hex.substring(2, 4), 16),
  b: parseInt(hex.substring(4, 6), 16)
})

const relativeLuminance = (hex: string) => {
  const { r, g, b } = hexToRgb(hex)

  const channel = (c: number) => {
    const normalized = c / 255
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4)
  }

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

const contrastRatio = (hexA: string, hexB: string) => {
  const lumA = relativeLuminance(hexA)
  const lumB = relativeLuminance(hexB)
  const lighter = Math.max(lumA, lumB)
  const darker = Math.min(lumA, lumB)
  return (lighter + 0.05) / (darker + 0.05)
}

export const getTeamAccentColor = (color?: string, alternateColor?: string) => {
  if (!color && !alternateColor) {
    return '#666666'
  }

  if (!alternateColor) {
    return `#${color}`
  }

  if (!color) {
    return `#${alternateColor}`
  }

  const colorContrast = contrastRatio(color, CARD_BACKGROUND)
  const alternateContrast = contrastRatio(alternateColor, CARD_BACKGROUND)

  return alternateContrast > colorContrast ? `#${alternateColor}` : `#${color}`
}
