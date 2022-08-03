<template>
  <div class="TaLayoutNakedPure">
    Naked Layout:
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TaLayoutNakedPure',
})
</script>

<style lang="scss">
.TaLayoutNakedPure {
  $block: &;
}
</style>
