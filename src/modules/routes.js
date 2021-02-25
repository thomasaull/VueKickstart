const path = require('path')

export default function () {
  // Disable parsing the pages so that we can create our own routes
  this.nuxt.options.build.createRoutes = () => []

  this.addTemplate({
    fileName: 'router.js',
    src: path.resolve(`${this.options.srcDir}`, 'router.js'),
  })
}
