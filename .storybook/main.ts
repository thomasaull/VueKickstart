import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig, UserConfig, UserConfigExport } from 'vite'
import { config as importedVueConfig, plugins } from '../vite.config'

function isUserConfig(config: UserConfigExport): asserts config is UserConfig {
  if (config instanceof Promise) {
    throw new Error('config needs to be typeof UserConfig. Is Promise')
  }

  if (typeof config === 'function') {
    throw new Error('config needs to be typeof UserConfig. Is Function')
  }
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    './my-addon/manager.js',
  ],

  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  docs: {
    autodocs: true,
  },

  async viteFinal(config) {
    const vueConfig = importedVueConfig
    isUserConfig(vueConfig)

    const finalConfig = mergeConfig(config, {
      resolve: vueConfig.resolve,
      plugins: plugins,
      css: vueConfig.css,
    })
    return finalConfig
  },
}

export default config
