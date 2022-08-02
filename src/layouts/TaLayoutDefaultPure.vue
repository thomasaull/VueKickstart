<template>
  <div class="TaLayoutDefaultPure">
    Default Layout:
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TaLayoutDefaultPure',
})
</script>

<style lang="scss">
.TaLayoutDefaultPure {
  $block: &;
}
</style>
