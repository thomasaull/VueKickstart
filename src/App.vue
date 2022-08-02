<template>
  <div class="App">
    <component :is="layoutComponent">
      <slot v-if="isStorybook" />
      <router-view v-if="!isStorybook" />
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'

import { LAYOUT } from '@/constants/layout';
import type { Layout } from '@/constants/layout'

import TaLayoutDefaultPure from '@/layouts/TaLayoutDefaultPure.vue'
import TaLayoutNakedPure from '@/layouts/TaLayoutNakedPure.vue'

export interface Props {
  isStorybook?: boolean
  storybookLayout?: Layout
}

export default defineComponent({
  name: 'App',

  components: {
    TaLayoutDefaultPure,
    TaLayoutNakedPure
  },

  props: {
    isStorybook: { type: Boolean, default: false },
    storybookLayout: {
      type: String as PropType<Props['storybookLayout']>,
      default: undefined,
    },
  },

  setup(props) {
    const route = useRoute()

    const layoutComponent = computed((): Layout => {
      if (props.isStorybook && props.storybookLayout) {
        return props.storybookLayout
      }

      const routeMetaLayout = route.meta.layout
      if (routeMetaLayout) {
        if (Object.values(LAYOUT).includes(routeMetaLayout as Layout)) {
          return routeMetaLayout as Layout
        }
      }

      return LAYOUT.NAKED
    })

    return {
      layoutComponent,
      route
    }
  }
})
</script>

<style lang="scss">
.App {
  $block: &;
}
</style>