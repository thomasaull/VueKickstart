// import { withStates } from '@/../.storybook/decorators'

import MyComponent from '@/components/MyComponent.vue'

export default {
  title: 'MyComponent',
  component: MyComponent,
  // decorators: [withStates],
  // parameters: {
  //   additionalStates: ['disabled']
  // }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyComponent },
  template: `
    <MyComponent
      v-bind="$props"
    />
  `
})

export const Default = Template.bind({})
Default.args = {}
