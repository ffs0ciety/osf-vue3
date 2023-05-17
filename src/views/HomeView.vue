<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import Padre from "@/components/Padre.vue";
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const CHARACTERS_QUERY = gql `query listMyModelTypes {
      listMyModelTypes {
        items {
          id
          title
        }
      }
    }`

export default defineComponent({
  setup(){
    const { result, loading, error } = useQuery(CHARACTERS_QUERY);
    return {
      result,
      loading, 
      error
    }
  },
  components: {
    Padre
  },
  methods: {
    test() {
      return 'test2'
    }
  },
    
  data() {
    return {
      jamon: 1234
    }
  },
})



</script>

<template>
  <main>
    Info about blabla
    {{ test() }}
    <!-- {{  apollo  }} -->
    {{ result }}

    
  </main>
</template>
