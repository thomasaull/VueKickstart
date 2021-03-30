import { Story, Meta } from '@storybook/vue3/types-6-0'

import Example from './Example.vue'
import { IBook } from './Example.d'

interface Args {
  book: IBook
  test: ITest
}

const meta: Meta<Args> = {
  title: 'Bla',
  component: Example,

  args: {
    book: {
      title: 'The default book title',
    },
  },
}
export default meta

const Template: Story<Args> = (args) => ({
  components: { Example },

  setup() {
    return {
      args,
    }
  },

  template: `<Example v-bind="args">Abc</Example>`,
})

export const Primary = Template.bind({})
Primary.args = {}

export const Secondary = Template.bind({})
Secondary.args = {
  book: {
    title: 'New book title',
  },
}
