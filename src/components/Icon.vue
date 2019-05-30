<template>
  <component :is="svg" />
</template>

<script>
export default {
  name: 'Icon',

  data() {
    return {
      svg: () => import(`@/assets/svg/${this.name}.svg`)
    }
  },

  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
