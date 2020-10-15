import MyButton from '@/components/MyButton.vue'

export default {
  title: 'MyButton',
  component: MyButton
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyButton },
  template: `
    <MyButton
      v-bind="$props"
    >
      Button
    </MyButton>
  `
})

export const Default = Template.bind({})
Default.args = {}
