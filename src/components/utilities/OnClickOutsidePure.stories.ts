import { Story, Meta } from '@storybook/vue3/types-6-0'

import OnClickOutsidePure from '@/components/utilities/OnClickOutsidePure.vue'
import OnClickOutsidePureStory from '@/components/utilities/OnClickOutsidePureStory.vue'

const meta: Meta = {
  title: 'utilities/OnClickOutsidePure',
  component: OnClickOutsidePure,

  argTypes: {
    clickOutside: { action: 'clickOutside' },
  },
}
export default meta

const Template: Story = (args) => ({
  components: { OnClickOutsidePureStory },

  setup() {
    return {
      args,
    }
  },

  template: `
    <OnClickOutsidePureStory
      v-bind="$props"
      @clickOutside="args.clickOutside"
    />
  `,
})

export const Primary = Template.bind({})
Primary.args = {}
