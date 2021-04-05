import { Story, Meta } from '@storybook/vue3/types-6-0'

import MyComponent from '@/components/MyComponent.vue'

interface Args {
  exampleArg: string
}

const meta: Meta<Args> = {
  title: 'utilities/MyComponent',
  component: MyComponent,

  args: {
    exampleArg: 'test'
  }
}
export default meta

const Template: Story<Args> = (args) => ({
  components: { MyComponent },

  setup() {
    return {
      args,
    }
  },

  template: `
    <MyComponent
      v-bind="$props"
    />
  `,
})

export const Primary = Template.bind({})
Primary.args = {}
