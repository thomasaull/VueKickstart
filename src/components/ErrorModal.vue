<template>
  <div class="ErrorModal">
    I'm an Error Modal
    <button @click="$emit('close')">Close</button>
  </div>
</template>

<script>
export default {
  name: 'ErrorModal'
}
</script>
