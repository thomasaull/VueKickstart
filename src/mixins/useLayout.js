export default {
  data() {
    return {
      useLayout: undefined
    }
  },

  created() {
    if (!this.useLayout) return
    this.$eventHub.$emit('Layout:Update', this.useLayout)
  }
}
