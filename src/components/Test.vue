<template>
  <div class="Test">
    Name: {{ name }}
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'

import { useQuery, useResult } from '@vue/apollo-composable'
import MeQuery from '../graphql/MeQuery.graphql'

export default defineComponent({
  name: 'Test',
  components: {},

  setup() {
    const { result, error } = useQuery(MeQuery)

    const me = useResult(result, null, (data) => data.users)

    watch(result, (value) => {
      console.log('there is a result')
      console.log(value)
    })

    watch(error, (value) => {
      console.log('there is an error')
      console.log(value)
    })

    return {
      me,
      result,
    }
  },

  data() {
    return {
      name: 'Thomas',
    }
  },

  // apollo: {
  //   me: {
  //     query: MeQuery,
  //   },
  // },
})
</script>

<style lang="scss">
.Test {
  $block: &;
}
</style>
