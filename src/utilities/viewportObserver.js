import Vue from 'vue'

export default new Vue({
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      scrollTop: 0,
      scrollLeft: 0,
    }
  },

  created() {
    window.addEventListener('mousemove', this.setMouseCoordinates)
    window.addEventListener('scroll', this.setScrollTop)
    window.addEventListener('scroll', this.setScrollLeft)
  },

  methods: {
    setMouseCoordinates(event) {
      this.mouseX = event.clientX
      this.mouseY = event.clientY
    },

    setScrollTop() {
      this.scrollTop = document.scrollingElement.scrollTop
    },

    setScrollLeft() {
      this.scrollLeft = document.scrollingElement.scrollLeft
    },
  },
})
