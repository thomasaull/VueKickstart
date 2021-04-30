<template>
  <div class="Example">This is an example {{ name }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { test } from '@/utilities/jsTestUtility'

import { IBook } from './Example.d'

export default defineComponent({
  name: 'Example',
  components: {},

  props: {
    book: {
      type: Object as PropType<IBook>,
      default: undefined,
    },
  },

  setup(props) {
    // console.log(props.book.)
  },

  mounted() {
    console.log(test)
  },
})
</script>

<style lang="scss">
.Example {
  color: blue;
  background: rgba(blue, 0.2);
}
</style>
