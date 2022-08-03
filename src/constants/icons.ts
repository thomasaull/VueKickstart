export const ICON = {
  SETTINGS: 'settings',
} as const

export const ICON_SMALL = {
  SETTINGS: 'settings.small',
} as const

export type IconDefault = typeof ICON[keyof typeof ICON]
export type IconSmall = typeof ICON_SMALL[keyof typeof ICON_SMALL]

export type Icon = IconDefault | IconSmall
