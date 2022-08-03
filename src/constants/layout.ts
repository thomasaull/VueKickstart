export const LAYOUT = {
  DEFAULT: 'TaLayoutDefaultPure',
  NAKED: 'TaLayoutNakedPure',
} as const

export type Layout = typeof LAYOUT[keyof typeof LAYOUT]
