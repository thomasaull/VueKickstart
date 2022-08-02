import type { Meta, Story } from '@/types/storybook'

import ExampleComponent, {
  propTypes,
} from '@/components/ExampleComponent/ExampleComponent.vue'
import type { Props } from '@/components/ExampleComponent/ExampleComponent.vue'

interface Args extends Props {
  exampleArg: string
}

const meta: Meta<Args> = {
  title: 'ExampleComponent',
  component: ExampleComponent,

  argTypes: {
    myProp: {
      control: 'select',
      options: propTypes.myProp.allowed,
    },
  },

  args: {
    exampleArg: 'test',
    myProp: propTypes.myProp.default,
  },
}
export default meta

const Template: Story<Args> = (args, { argTypes }) => ({
  components: { ExampleComponent },
  props: Object.keys(argTypes),

  template: `
    <ExampleComponent
      v-bind="$props"
    />
  `,
})

export const Default = Template.bind({})
Default.args = {}
