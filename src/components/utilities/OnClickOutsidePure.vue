<script>
export default {
  name: 'OnClickOutsidePure',

  props: {
    do: { type: Function, required: true },
  },

  mounted() {
    document.addEventListener('click', this.onDocumentClick)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.onDocumentClick)
  },

  methods: {
    onDocumentClick(event) {
      // Element is the slot element
      if (event.target === this.$el) return

      // Element is inside of slot element
      if (this.$el.contains(event.target)) return

      this.do()
    },
  },

  render() {
    return this.$slots.default[0]
  },
}
</script>
