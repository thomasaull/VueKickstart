<template>
  <component :is="svg" class="Icon" v-on="$listeners" />
</template>

<script>
export default {
  name: 'Icon',

  data() {
    return {
      svg: undefined
    }
  },

  props: {
    name: {
      type: String,
      required: true
    }
  },

  async created() {
    const loaded = await import(/* webpackMode: "eager" */ `@/assets/svg/${
      this.name
    }.svg`)
    this.svg = loaded.default
  }
}
</script>
