import OnClickOutsidePure from '@/components/utilities/OnClickOutsidePure.vue'
import OnClickOutsidePureStory from '@/components/utilities/OnClickOutsidePureStory.vue'

export default {
  title: 'utilities/OnClickOutsidePure',
  component: OnClickOutsidePure,

  argTypes: {
    clickOutside: { action: 'clickOutside' },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { OnClickOutsidePureStory },

  template: `
    <OnClickOutsidePureStory
      v-bind="$props"
      @clickOutside="clickOutside"
    />
  `,
})

export const Default = Template.bind({})
Default.args = {}
