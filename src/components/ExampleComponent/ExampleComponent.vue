<template>
  <div class="ExampleComponent">
    <h1>{{ greeting }}</h1>
    <br />
    <input :value="value" type="text" @input="emitInput" /> {{ value }}
    <br />
    <input
      :checked="checked"
      type="checkbox"
      @input="(event) => emit('update:checked', event?.target?.checked)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const COMPONENT_NAME = 'ExampleComponent'

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
  greeting?: 'Hello' | 'Good Day Sir' | 'Howdy' | 'Bla'
  value?: string
  checked?: boolean
}

export type Emit = {
  addPerson: { name: string; age: number }
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (event: 'update:value', value: string): void
  (event: 'update:checked', value: boolean): void
  (event: 'click'): void
  (event: 'addPerson', payload: Emit['addPerson']): void
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
