import { mergeConfig, UserConfig, UserConfigExport } from 'vite'
import { config as importedVueConfig, plugins } from '../vite.config'

function isUserConfig(
  config: UserConfigExport 
): asserts config is UserConfig {
  if(config instanceof Promise) {
    throw new Error('config needs to be typeof UserConfig. Is Promise')
  }

  if(typeof config === 'function') {
    throw new Error('config needs to be typeof UserConfig. Is Function')
  }
}

export default {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/vue3',

  core: {
    builder: '@storybook/builder-vite',
  },

  features: {
    storyStoreV7: true,
  },

  async viteFinal(config) {
    const vueConfig = importedVueConfig
    isUserConfig(vueConfig)

    const finalConfig = mergeConfig(config, {
      resolve: vueConfig.resolve,
      plugins: plugins,
      css: vueConfig.css
    })

    return finalConfig
  }
}