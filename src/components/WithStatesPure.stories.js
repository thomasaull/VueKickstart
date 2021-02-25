import { withStates } from '@/../.storybook/decorators'

import WithStatesPure from '@/components/WithStatesPure.vue'

export default {
  title: 'WithStatesPure',
  component: WithStatesPure,
  decorators: [withStates],
  parameters: {
    additionalStates: ['disabled']
  },

  args: {
    label: 'The label'
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WithStatesPure },
  template: `
    <WithStatesPure
      v-bind="$props"
    />
  `
})

export const Default = Template.bind({})
Default.args = {}
