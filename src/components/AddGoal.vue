<template>
    <div>
        <h1>Add goal</h1>
        <input v-model="ownerId" placeholder="ownerId" />
        <input v-model="title" placeholder="title" />
        <input v-model="description" placeholder="descriptipon" />
        <input v-model="daily" type="checkbox"/>
        <button @click="createGoal">Create</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import { createGoal } from "@/services/Goals"
import _ from 'lodash';
// var store  = userStore();

export default defineComponent({
    components: {
  },
  props:{
    ownerId: String
  },
    data(){
        return {
            title:'',
            description: '',
            daily: false
        }
    },
    methods:{
       async createGoal(){
            createGoal(this.title, this.description, this.daily)
       }
    },
    async mounted(){
    }

})
</script>

<style scoped>

</style>
