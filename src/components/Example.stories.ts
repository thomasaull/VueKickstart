import { Story, Meta } from "@storybook/vue3/types-6-0";

import Example from "./Example.vue";
import { IBook } from "./Example.d";

interface Args {
  book: IBook;
  test: ITest;
}

const meta: Meta<Args> = {
  title: "Bla",
  component: Example,

  args: {
    book: {
      title: "The default book title",
    },
  },
};
export default meta;

const Template: Story<Args> = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Example },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return {
      args,
    };
  },

  // Then, the spread values can be accessed directly in the template
  template: `<Example v-bind="args">Abc</Example>`,
});

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
  book: {
    title: "New book title",
  },
};
