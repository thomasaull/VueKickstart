import type { ScssVariables } from '@/assets/scss/export.module.d'

// @ts-ignore Don't know how to solive this
import scssVariables from '@/assets/scss/export.module.scss'

function getVariablesOfType<TResult>(type: string) {
  return Object.entries(scssVariables).reduce((result, current): TResult => {
    const key = current[0]
    const value = current[1] as string

    const search = `${type}-`

    if (key.startsWith(search)) {
      const normalizedKey = key.replace(search, '')
      const normalizedValue: string | number = value

      /**
       * Convert/Sanitize
       */
      // Add converters/santiziers here

      // @ts-ignore Don't know how to solive this
      result[normalizedKey] = normalizedValue
    }

    return result
  }, {} as TResult)
}

export const breakpoint =
  getVariablesOfType<ScssVariables['breakpoint']>('breakpoint')
export const color = getVariablesOfType<ScssVariables['color']>('color')

export default {
  breakpoint,
  color,
}
