
<script lang="ts">
import { defineComponent, toRef } from "@vue/runtime-core"
import { userStore } from '@/stores/user'
import Chart from "./Chart.vue";
import { addEntrance } from "@/services/Goals";
var store = userStore();

export default defineComponent({
  props: {
    goalId: String,
    title: String,
    description: String,
    daily: Boolean,
    entrances: Array,
  },
  components: {
    Chart
  },
  data(){
    return {
      error: '',
      test:[
                "Sun Apr 02 2023 18:30:13 GMT+0000 (Coordinated Universal Time)",
                "Sun Apr 03 2023 18:30:13 GMT+0000 (Coordinated Universal Time)",
                "Sun Apr 05 2023 18:30:13 GMT+0000 (Coordinated Universal Time)",
                "Sun Apr 06 2023 18:30:13 GMT+0000 (Coordinated Universal Time)"
            ]
    }
  },
  methods: {
    addEntranceMethod() {
      addEntrance(this.goalId).catch( error => {
        this.error = error;
      });
    }
  },
  async mounted() {
  }


})
</script>


<template>
  <div>
    <h2>{{ title }}</h2> <h2 v-if="daily">* Desafío diario</h2>
    <h3>{{ description }}</h3>
  
    <Chart :historical="entrances" />
    <button @click="addEntranceMethod">Add entrance</button>
    {{ error }}
  </div>
</template>