/**
 * Augment types for storybook
 * @source https://gist.github.com/rabelloo/bae0397d6a331d939eacdb3e8849220f
 */

// import { Meta as BaseMeta } from '@storybook/vue3/types-6-0'
import type { ArgType as BaseArgType } from '@storybook/addons'
// export { Story, Action } from '@storybook/vue3/types-6-0'

// export interface Meta<Args>
//   extends Omit<BaseMeta<Args>, 'argTypes'>,
//     Annotation<Args> {}

export type Action = unknown

interface Annotation<Args> {
  /**
   * ArgTypes encode basic metadata for args, such as `name`, `description`, `defaultValue` for an arg. These get automatically filled in by Storybook Docs.
   * @see [Control annotations](https://github.com/storybookjs/storybook/blob/91e9dee33faa8eff0b342a366845de7100415367/addons/controls/README.md#control-annotations)
   */
  argTypes?: ArgTypes<Args>
}

type ArgTypes<Props> = {
  [key in keyof Props]?: ArgType<Props[key]>
}

interface ArgType<T> extends BaseArgType {
  control?: Control<T> | Control<T>['type'] | Disable
  defaultValue?: T
  table?: Table
  action?: string
  [key: string]: unknown
}

type Control<T> =
  | ControlArray
  | ControlBare
  | ControlColor
  | ControlEnum<T>
  | ControlNumber

interface ControlBare {
  type: 'boolean' | 'object' | 'text' | 'date'
}

interface ControlArray {
  type: 'array'
  separator?: string
}

interface ControlColor {
  type: 'color'
  presetColors?: string[]
}

interface ControlEnum<Option> {
  type:
    | 'radio'
    | 'inline-radio'
    | 'check'
    | 'inline-check'
    | 'select'
    | 'multi-select'
  options?: readonly Option[]
}

interface ControlNumber {
  type: 'number' | 'range'
  min?: number
  max?: number
  step?: number
}

interface Table extends Disable {
  defaultValue?: Row
  type?: Row
}

interface Row {
  detail?: string
  summary?: string
}

interface Disable {
  disable?: boolean
}
