import { Story, Meta } from '@storybook/vue3/types-6-0'

import UseXStatePure from '@/components/UseXState/UseXStatePure.vue'
// import {
//   propTypes,
//   default as UseXStatePure,
// } from '@/components/UseXState/UseXStatePure.vue'

interface Args {
  exampleArg: string
}

const meta: Meta<Args> = {
  title: 'utilities/UseXStatePure',
  component: UseXStatePure,

  args: {
    exampleArg: 'test',
  },

  argTypes: {
    state: {
      control: {
        type: 'select',
        // options: propTypes.state.allowed
        options: ['abc', 'jkl'],
      },
    },
  },
}
export default meta

const Template: Story<Args> = (args) => ({
  components: { UseXStatePure },

  setup() {
    return {
      args,
    }
  },

  template: `
    <UseXStatePure
      v-bind="$props"
    />
  `,
})

export const Primary = Template.bind({})
Primary.args = {}
