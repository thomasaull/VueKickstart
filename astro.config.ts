import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'

// https://astro.build/config
const config = defineConfig({
  integrations: [vue()],
})

export default config
