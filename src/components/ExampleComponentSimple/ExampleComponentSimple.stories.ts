import type { Meta, StoryObj } from '@storybook/vue3'
import { generateStoryMeta, createRenderFunction } from '@/utilities/storybook'

import ExampleComponent from '@/components/ExampleComponentSimple/ExampleComponentSimple.vue'
import { componentMeta } from './ExampleComponentSimple.component-meta'

type Story = StoryObj<typeof ExampleComponent>

const meta: Meta<typeof ExampleComponent> = {
  ...generateStoryMeta(ExampleComponent, {
    componentMeta,
  }),

  title: 'ExampleComponentSimple',
  component: ExampleComponent,
}

export default meta

export const Default: Story = {
  render: createRenderFunction,
}
