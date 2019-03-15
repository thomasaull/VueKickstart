<template>
  <div class="DefaultLayout">
    Default Layout:
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',

  mounted() {
    console.log(this.$route.path)
  }
}
</script>
