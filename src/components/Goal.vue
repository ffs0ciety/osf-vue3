
<script lang="ts">
import { defineComponent, toRef } from "@vue/runtime-core"
import { userStore } from '@/stores/user'
import { addEntrance } from "@/services/Goals";
var store = userStore();

export default defineComponent({
  props: {
    goalId: String,
    title: String,
    description: String,
    daily: Boolean,
    entrances: Array
  },
  components: {
  },
  methods: {
    addEntranceMethod() {
      addEntrance(this.goalId);
    }
  },
  async mounted() {
  },
  setup(props){

  }


})
</script>


<template>
  <div>
    jamon
    <h2>{{ title }}</h2>
    <h3>{{ description }}</h3>
    <ul>
      <li v-for="(item, index) in entrances" :key="index">{{ item }}</li>
    </ul>
    <button @click="addEntranceMethod">Add entrance</button>
  </div>
</template>