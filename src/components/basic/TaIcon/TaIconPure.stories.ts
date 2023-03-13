import type { Meta, StoryObj } from '@storybook/vue3'
import { generateStoryMeta, createRenderFunction } from '@/utilities/storybook'

import TaIconPure from '@/components/basic/TaIcon/TaIconPure.vue'
import { componentMeta } from './TaIconPure.component-meta'

type Story = StoryObj<typeof TaIconPure>

const meta: Meta<typeof TaIconPure> = {
  ...generateStoryMeta(TaIconPure, {
    componentMeta,
  }),

  title: 'TaIconPure',
  component: TaIconPure,
}

export default meta

export const Default: Story = {
  render: createRenderFunction,
}
