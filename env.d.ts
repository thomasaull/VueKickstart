/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
/// <reference types="astro/client" />

// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }

// From: https://miyauchi.dev/posts/vite-vue3-typescript/
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<
//     Record<string, unknown>,
//     Record<string, unknown>,
//     unknown
//   >
//   export default component
// }

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
