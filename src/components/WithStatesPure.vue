<template>
  <div class="WithStatesPure">
    {{ label }}
  </div>
</template>

<script>
export default {
  name: 'WithStatesPure',
  components: {},

  props: {
    label: { type: String, default: undefined },
  },
}
</script>

<style lang="scss">
.WithStatesPure {
  $block: &;

  &:hover,
  &.is-hover {
    color: color.$key;
  }

  &.is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &:focus,
  &.is-focus {
    color: blue;

    @include mixin.isKeyboard {
      outline: 2px solid blue;
    }
  }
}
</style>
