import type { Meta, StoryObj } from '@storybook/vue3'
import { useArgs } from '@storybook/preview-api'

// // import type { Meta, Story, Action } from '@/types/storybook'

import ExampleComponent, {
  type Emit,
} from '@/components/ExampleComponent/ExampleComponent.vue'

import { componentMeta } from './ExampleComponent.component-meta'
import { generateStoryMeta, createRenderFunction } from '@/utilities/storybook'

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

type Story = StoryObj<typeof ExampleComponent>

export const WithStoryRender: Story = {
  render: createRenderFunction,
}

export const Default: Story = {
  args: {
    myProp: 'example',
  },
}
