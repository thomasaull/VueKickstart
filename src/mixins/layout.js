import debounce from 'lodash/debounce'

export default {
  created() {
    if (!process.client) return

    this.debouncedLayout = debounce(() => {
      this.layout()
    }, 100)

    window.addEventListener('resize', this.debouncedLayout)
  },

  mounted() {
    this.layout()
  },

  beforeDestroy() {
    if (!process.client) return

    window.removeEventListener('resize', this.debouncedLayout)
  },

  methods: {
    layout_do() {
      console.warn(`layout_do() not implemented for ${this.$options.name}`)
    }
  }
}
