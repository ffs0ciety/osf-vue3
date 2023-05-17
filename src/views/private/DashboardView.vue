
<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import {logout} from "@/services/Oauth"
import { userStore } from '@/stores/user'
import { goalsStore } from '@/stores/goals'
import _ from "lodash"
import AddGoal from "@/components/AddGoal.vue"
import Goal from "@/components/Goal.vue";
import { storeToRefs } from 'pinia'
var storeUser  = userStore();


export default defineComponent({
    components: {
      AddGoal,
      Goal
  },
    data(){
      var storeGoals  = goalsStore();
      const { goals } = storeToRefs(storeGoals)
        return {
           userStore: _.omit(storeUser,'token'),
           goals: goals,
           selectedGoal: 0
        }
    },
    methods:{
        logoutButton(){
          logout();
        },
        selectGoal(index:number){
          this.selectedGoal = index;
        }
    },
    async mounted(){
    }

})
</script>


<template>
  <div>
    <button @click="logoutButton">Logout!</button>
    <AddGoal :ownerId="userStore.sub"/>
    <div>
      <ul>
              <li @click="selectGoal(index)" v-for="(item, index) in goals" :key="index">
                {{item.title}}
                <!-- {{ item.entrances }} -->
              </li>
            </ul>
    </div>
    <Goal v-if="goals.length > 0"
        :goalId="goals[selectedGoal]._id" 
        :title="goals[selectedGoal].title" 
        :daily="goals[selectedGoal].daily" 
        :description="goals[selectedGoal].description" 
        :entrances="goals[selectedGoal].entrances"
      />

      
  </div>
</template>