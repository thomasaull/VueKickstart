<template>
  <component :is="svg" class="Icon" v-on="$listeners" />
</template>

<script>
export default {
  name: 'Icon',

  props: {
    name: {
      type: String,
      required: true
    }
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
