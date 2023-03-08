import type { Meta, StoryObj } from '@storybook/vue3'
import { generateStoryMeta, createRenderFunction } from '@/utilities/storybook'

import ExampleComponent, {
  type Emit,
} from '@/components/ExampleComponent/ExampleComponent.vue'
import { componentMeta } from './ExampleComponent.component-meta'

type Story = StoryObj<typeof ExampleComponent>

const meta: Meta<typeof ExampleComponent> = {
  ...generateStoryMeta(ExampleComponent, {
    componentMeta,
    argTypes: {
      date: { control: 'date' },
    },
  }),

  title: 'ExampleComponent',
  component: ExampleComponent,

  args: {
    date: new Date(),
  },
}

export default meta

export const Default: Story = {
  render: createRenderFunction,
  args: {
    message: 'Default message',
  },
}
