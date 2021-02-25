<template>
  <component :is="svg" class="IconPure" />
</template>

<script>
export default {
  name: 'IconPure',

  props: {
    name: { type: String, required: true }
  },

  data() {
    return {
      svg: undefined
    }
  },

  async created() {
    const loaded = await import(
      /* webpackMode: "eager" */ `@/assets/svg/${this.name}.svg`
    )
    this.svg = loaded.default
  }
}
</script>

<style lang="scss">
.IconPure {
  @include mixin.svgIcon;
}
</style>
