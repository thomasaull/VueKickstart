<template>
  <div class="Example">This is an example {{ name }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IBook } from "./Example.d";

// export enum bla {
//   Up = "UP",
//   Down = "DOWN",
// }

export default defineComponent({
  name: "Example",
  components: {},

  props: {
    name: { type: String, default: undefined },
    book: {
      type: Object as PropType<IBook>,
      default: undefined,
    },
    // name: { type: String as PropType<bla>, default: undefined },
  },

  setup(props) {
    // console.log(props.book.)
  },
});
</script>

<style lang="scss">
.Example {
  color: blue;
  background: rgba(blue, 0.2);
}
</style>
