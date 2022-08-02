// eslint-disable-next-line
const { buildDev } = require('@storybook/core/server');
// eslint-disable-next-line
// const packageJson = require('@storybook/vue/package.json'); // Vue 2
// eslint-disable-next-line
const packageJson = require('@storybook/vue3/package.json'); // Vue 3

module.exports = (api) => {
  api.registerCommand("storybook:serve", () => {
    buildDev({
      packageJson,
      // framework: 'vue', // Vue 2
      framework: "vue3", // Vue 3
      frameworkPresets: [
        {
          name: require.resolve("./preset"),
          options: { api },
        },
      ],
    });
  });
};
