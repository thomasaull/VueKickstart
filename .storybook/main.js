/**
 * Make main.ts a module
 * @see https://miyauchi.dev/posts/storybook-vite/
 */

 const { register } = require('esbuild-register/dist/node')

 register({
   // target: 'node16'
 })
 
 module.exports = require('./main.ts')