<template>
  <div class="ExampleComponent">Example Component</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export const propTypes = {
  myProp: {
    allowed: ['example', 'anotherOne'] as const,
    default: 'example' as const,
  },
}

export interface Props {
  myProp?: typeof propTypes.myProp.allowed[number]
}

export default defineComponent({
  name: 'ExampleComponent',
  components: {},

  props: {
    test: {
      type: String as PropType<Props['myProp']>,
      default: propTypes.myProp.default,
    },
  },
})
</script>

<style lang="scss">
.ExampleComponent {
  $block: &;
}
</style>
