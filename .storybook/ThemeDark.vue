<script>
export default {
  name: 'ThemeDark',

  mounted() {
    document.documentElement.classList.add('theme-dark')
  },

  beforeDestroy() {
    document.documentElement.classList.remove('theme-dark')
  },

  render() {
    return this.$slots.default
  }
}
</script>

<style lang="scss">
html {
  &.theme-dark {
    background-color: color.$gray-800;
  }
}
</style>
