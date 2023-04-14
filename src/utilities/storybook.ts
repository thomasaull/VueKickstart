import type { Meta, StoryObj, VueRenderer } from '@storybook/vue3'
import type { ArgsStoryFn } from '@storybook/types'
import { useArgs } from '@storybook/preview-api'

type ArgTypeControl = {
  control: 'select'
  options: readonly (string | undefined | null)[]
}

type ArgTypeEvent = {
  action: string
}

export type ComponentMeta = {
  argTypes: Record<string, ArgTypeControl | ArgTypeEvent>
}

type Options<Component> = {
  componentMeta: ComponentMeta
  /** manual argTypes which get merged with automatically created ones */
  argTypes?: Meta<Component>['argTypes']
}

export function generateStoryMeta<Component>(
  component: Component,
  options?: Options<Component>
) {
  const argTypesFinal = {
    ...options?.componentMeta.argTypes,
    ...options?.argTypes,
  }

  return {
    component: component,
    argTypes: argTypesFinal,
  }
}

type RenderFunction = ArgsStoryFn<VueRenderer, any>

function normalizeArgs(
  args: Parameters<RenderFunction>[0],
  context: Parameters<RenderFunction>[1]
) {
  Object.entries(args).forEach(([key, value]) => {
    if (!(key in context.argTypes)) return

    const argType = context.argTypes[key]
    const controlType = argType.control?.type

    if (controlType === 'date') {
      args[key] = normalizeDate(value)
    }
  })
}

function normalizeDate(value: unknown) {
  if (value instanceof Date) {
    return value
  }

  if (typeof value === 'number') {
    return new Date(value)
  }
}

export function createRenderFunction(
  args: Parameters<RenderFunction>[0],
  context: Parameters<RenderFunction>[1]
) {
  type Story = StoryObj<typeof context.component>
  const [_, updateArgs, resetArgs] = useArgs()

  normalizeArgs(args, context)

  // Create args update
  Object.entries(context.argTypes).forEach(([key, value]) => {
    if (!value.table) return
    if (value.table.category !== 'events') return

    const isVModel = key.startsWith('update:')
    if (!isVModel) return

    const eventName = `on${key.charAt(0).toUpperCase() + key.slice(1)}`
    const argToUpdate = key.split(':')[1]

    if (!Object.keys(context.argTypes).includes(argToUpdate)) {
      return
    }

    args[eventName] = (newValue: any) => {
      // TODO: Manuall dispatch event to pass to storybook
      updateArgs({ [argToUpdate]: newValue })
    }
  })

  const render: Story['render'] = {
    // @ts-expect-error Probably not working because of unknown component type
    components: { storyComponent: context.component },

    setup() {
      return { args }
    },

    template: '<component is="storyComponent" v-bind="args" />',

    // props: Object.keys(context.argTypes),
    // template: '<component is="component" v-bind="$props" v-on="$props" />',
  }

  // Don't know how to type this
  return render as any
}
