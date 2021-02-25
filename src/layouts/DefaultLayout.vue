<template>
  <div class="DefaultLayout">
    Default Layout:
    <slot />

    <!-- <div class="DefaultLayout-notifications">
      <slot name="notifications" />
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',

  mounted() {
    console.log(this.$route.path)
  },
}
</script>
