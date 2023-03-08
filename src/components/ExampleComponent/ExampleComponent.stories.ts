import type { Meta, StoryObj } from '@storybook/vue3'
import { generateStoryMeta, createRenderFunction } from '@/utilities/storybook'

import ExampleComponent from '@/components/ExampleComponent/ExampleComponent.vue'
import { componentMeta } from './ExampleComponent.component-meta'

type Story = StoryObj<typeof ExampleComponent>

const meta: Meta<typeof ExampleComponent> = {
  ...generateStoryMeta(ExampleComponent, {
    componentMeta,
  }),

  title: 'ExampleComponent',
  component: ExampleComponent,
}

export default meta

export const Default: Story = {
  render: createRenderFunction,
}
