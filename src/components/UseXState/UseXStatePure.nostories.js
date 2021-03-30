import {
  propTypes,
  default as UseXStatePure,
} from '@/components/UseXState/UseXStatePure.vue'

export default {
  title: 'UseXStatePure',
  component: UseXStatePure,

  argTypes: {
    state: {
      control: { type: 'select', options: propTypes.state.allowed },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { UseXStatePure },
  template: `
    <UseXStatePure
      v-bind="$props"
    />
  `,
})

export const Default = Template.bind({})
Default.args = {}
