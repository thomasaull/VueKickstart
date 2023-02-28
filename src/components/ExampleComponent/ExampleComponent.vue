<template>
  <div class="ExampleComponent">
    {{ xstate.path.value }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const COMPONENT_NAME = 'ExampleComponent'

export const propTypes = {
  myProp: {
    allowed: ['example', 'anotherOne'],
    default: 'example'
  },
  state: {
    allowed: states
  }
} as const

export default defineComponent({
  name: COMPONENT_NAME
})
</script>

<script setup lang="ts">
import { toRef } from 'vue'

import { useXState } from '@/composables/useXState'

import { ExampleState, states, type State } from '@/components/ExampleComponent/ExampleState'

export interface Props {
  myProp?: (typeof propTypes.myProp.allowed)[number]
  state: State
}

const props = withDefaults(defineProps<Props>(), {
  myProp: undefined
})

const emit = defineEmits<{
  (event: 'example', id: string): void
}>()

const xstate = useXState(ExampleState, {
  services: {
    fetchSome: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  },

  actions: {
    testAction: () => {
      console.log('testAction')
    }
  },

  syncStateWith: toRef(props, 'state')
})
</script>

<style lang="scss">
.ExampleComponent {
  $block: &;
}
</style>
