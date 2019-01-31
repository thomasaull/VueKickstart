import forEach from 'lodash/forEach'
import trimEnd from 'lodash/trimEnd'

export default {
  methods: {
    getSrcset(urls) {
      let response = ''

      forEach(urls, url => {
        response += `${url.url} ${url.width}w,`
      })

      response = trimEnd(response, ',')

      return response
    },

    // URL encode/decode: https://www.urlencoder.org/
    // createSvgPlaceholder(width, height, color = '#EBEBEB') {
    createSvgPlaceholder(width, height, color = 'transparent') {
      color = encodeURIComponent(color)
      return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3Crect width="100%" height="100%" fill="${color}" %2F%3E%3C/svg%3E`
    }
  }
}
