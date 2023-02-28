import type { Meta, Story } from '@/types/storybook'

import TaIconPure, { propTypes } from '@/components/basic/TaIcon/TaIconPure.vue'
import type { Props } from '@/components/basic/TaIcon/TaIconPure.vue'

interface Args extends Props {
  exampleArg: string
}

const meta: Meta<Args> = {
  title: 'TaIconPure',
  component: TaIconPure,

  argTypes: {},

  args: {
    exampleArg: 'test',
    name: 'settings'
  }
}
export default meta

const Template: Story<Args> = (args, { argTypes }) => ({
  components: { TaIconPure },
  props: Object.keys(argTypes),

  template: `
    <TaIconPure
      v-bind="$props"
    />
  `
})

export const Default = Template.bind({})
Default.args = {}
