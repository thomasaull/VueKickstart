import { debounce } from 'lodash-es'

export default {
  created() {
    this.debouncedLayout = debounce(() => {
      this.layout()
    }, 100)

    window.addEventListener('resize', this.debouncedLayout)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.debouncedLayout)
  },

  methods: {
    layout() {
      console.warn(`layout() not implemented for ${this.$options.name}`)
    }
  }
}
