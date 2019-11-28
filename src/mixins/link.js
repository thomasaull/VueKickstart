// Example Template for this component:
// <component :is="link_tag" v-bind="link_props">
// {{ label }}
// </component>

export default {
  props: {
    href: { type: String },
    to: { type: [String, Object] }
  },

  computed: {
    link_tag() {
      if (this.to) return 'router-link'
      if (this.href) return 'a'
      return 'button'
    },

    link_props() {
      if (this.tag === 'router-link') return { to: this.to }
      if (this.tag === 'a') return { href: this.href }
      // if (this.tag === 'button') return { type: 'button' }
    }
  }
}
