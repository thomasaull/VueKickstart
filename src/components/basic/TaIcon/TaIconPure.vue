<template>
  <component :is="svg" class="TaIconPure" @click="$emit('click')" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'

import { ICON, ICON_SMALL } from '@/constants/icons'
import type { Icon } from '@/constants/icons'
import iconComponent from '@/assets/icons'

export const propTypes = {
  name: {
    allowed: [...Object.values(ICON), ...Object.values(ICON_SMALL)],
  },
  size: {
    allowed: ['default', 'small'] as const,
  },
}

export interface Props {
  name: Icon
  size?: typeof propTypes.size.allowed[number]
}

export default defineComponent({
  name: 'TaIconPure',

  props: {
    name: { type: String as PropType<Props['name']>, required: true },
    size: { type: String as PropType<Props['size']>, default: 'default' },
  },

  emits: ['click'],

  setup(props) {
    const svg = ref()

    /**
     * Automatically get small icon if size is small and small icon is available
     */
    const getSmallIcon = () => {
      if (props.size !== 'small') return
      if (props.name.includes('.small')) return

      const smallIcon = Object.values(ICON_SMALL).find(
        (name) => name === `${props.name}.small`
      )

      return smallIcon
    }

    const smallIconName = getSmallIcon()
    const nameNormalized = smallIconName ? smallIconName : props.name

    svg.value = iconComponent[nameNormalized]

    return {
      svg,
    }
  },
})
</script>

<style lang="scss">
.TaIconPure {
  @include mixin.svgIcon;
}
</style>
