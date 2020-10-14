<template>
  <button class="MyButton is-primary" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',

  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
.MyButton {
  $block: &;

  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #fff;
  cursor: pointer;
  font-size: 15pt;
  padding: 3px 10px;
  margin: 10px;
}
</style>
