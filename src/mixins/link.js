// Example Template for this component:
// <component :is="link_tag" v-bind="link_props">
// {{ label }}
// </component>

export default {
  props: {
    href: { type: String },
    to: { type: [String, Object] },
    linkOpenInNewWindow: { type: Boolean, default: false },
  },

  computed: {
    link_tag() {
      if (this.to) return 'router-link'
      if (this.href) return 'a'

      return 'button'
    },

    link_props() {
      const baseProps = {}

      if (this.linkOpenInNewWindow) {
        baseProps.target = '_blank'
      }

      if (this.link_tag === 'router-link') {
        return {
          ...baseProps,
          to: this.to,
        }
      }

      if (this.link_tag === 'a') {
        return {
          ...baseProps,
          href: this.href,
        }
      }

      // if (this.link_tag === 'button') return { type: 'button' }
    },
  },
}
