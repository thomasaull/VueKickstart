import type { Meta, Story, Action } from '@/types/storybook'

import ExampleComponentSimple, {
  propTypes,
  type Props
} from '@/components/ExampleComponentSimple/ExampleComponentSimple.vue'

interface Args extends Props {
  exampleArg: string
}

const meta: Meta<Args> = {
  title: 'ExampleComponentSimple',
  component: ExampleComponentSimple,

  argTypes: {},
  args: {}
}
export default meta

const Template: Story<Args> = (args, { argTypes }) => ({
  components: { ExampleComponentSimple },
  props: Object.keys(argTypes),

  template: `
    <ExampleComponentSimple
      v-bind="$props"
    />
  `
})

export const Default = Template.bind({})
Default.args = {}
