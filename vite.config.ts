import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import graphql from '@rollup/plugin-graphql'
import svgLoader from 'vite-svg-loader'

export const plugins = [
  graphql(),
  svgLoader({
    defaultImport: 'component',
    svgoConfig: {
      plugins: [
        {
          name: 'removeAttrs',
          params: {
            attrs: '(stroke|fill|stroke-width|opacity)',
          },
        },
      ],
    },
  }),
]

// https://vitejs.dev/config/
export const config = defineConfig({
  plugins: [vue(), ...plugins],

  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@/assets/scss/colors' as color;
          @use '@/assets/scss/typography' as typography;
          @use '@/assets/scss/constants' as constant;
          @use '@/assets/scss/mixins' as mixin;
          @use '@/assets/scss/functions' as function;
          @use '@/assets/scss/cssVar' as cssVar;
        `,
      },
    },
  },
})

export default config
