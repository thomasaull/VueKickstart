<template>
  <div class="ExampleComponentSimple">ExampleComponentSimple</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const COMPONENT_NAME = 'ExampleComponentSimple'

export const propTypes = {} as const

export default defineComponent({
  name: COMPONENT_NAME,
})
</script>

<script setup lang="ts">
export interface Props {
  myProp?: string
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (event: 'example', id: string): void
}>()
</script>

<style lang="scss">
.ExampleComponentSimple {
  $block: &;
}
</style>
