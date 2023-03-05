<template>
  <div class="ExampleComponent">
    {{ xstate.path.value }}, {{ myProp }}
    <br />
    message: {{ message }}
    <br />
    date: {{ date }}

    <br />
    <input :value="value" type="text" @input="emitInput" /> {{ value }}
    <br />
    <button @click="emit('click')">Click me</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const COMPONENT_NAME = 'ExampleComponent'

export const propTypes = {
  myProp: {
    allowed: ['example', 'anotherOne'],
    default: 'example',
  },
  state: {
    allowed: states,
  },
} as const

export default defineComponent({
  name: COMPONENT_NAME,
})
</script>

<script setup lang="ts">
import { onMounted, toRef } from 'vue'

import { useXState } from '@/composables/useXState'

import {
  ExampleState,
  states,
  type State,
} from '@/components/ExampleComponent/ExampleState'

export interface Props {
  myProp?: (typeof propTypes.myProp.allowed)[number]
  state: State
  message?: string
  date?: Date
  test?: boolean
  value?: string
  /** Das ist ein union type bla bla */
  bla: 'test' | 'holla' | 'jo mei' | 'blabla blupp bla'
  intUnion: 1 | 20 | 5
}

export type Emit = {
  'update:value': string
}

const props = withDefaults(defineProps<Props>(), {
  myProp: undefined,
})

const emit = defineEmits<{
  (event: 'update:value', value: string): void
  (event: 'click'): void
}>()

function emitInput(event: Event) {
  if (!(event.target instanceof HTMLInputElement)) {
    throw new Error('event.target is not HTMLInputEvent')
  }

  emit('update:value', event.target.value)
}

const xstate = useXState(ExampleState, {
  services: {
    fetchSome: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    },
  },

  actions: {
    testAction: () => {
      console.log('testAction')
    },
  },

  syncStateWith: toRef(props, 'state'),
})

onMounted(() => {
  console.log('onMounted')
})
</script>

<style lang="scss">
.ExampleComponent {
  $block: &;
}
</style>
