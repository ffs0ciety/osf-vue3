
<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import {logout} from "@/services/Oauth"
import { userStore } from '@/stores/user'
import { goalsStore } from '@/stores/goals'
import _ from "lodash"
import AddGoal from "@/components/AddGoal.vue"
import Goal from "@/components/Goal.vue";
import { getGoals } from "@/services/Goals"
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
           selectedGoal: null
        }
    },
    methods:{
        async login(){
           
        },

        logoutButton(){
          logout();
        },
        selectGoal(goalId:string){
          
          this.selectedGoal = goalId;
        }
    },
    async mounted(){
      // var storeGoals  = goalsStore();
      // this.goals = storeGoals.goals;
    }

})
</script>


<template>
  <div>
    <ul>
        <li>Add new goal</li>
        <li><button @click="logoutButton">Logout</button></li>
        <li>List of goals
            <ul>
              <li @click="selectGoal(item)" v-for="(item, index) in goals" :key="index">
                {{item.title}}
                {{ item.entrances }}
              </li>
            </ul>
        </li>
       <Goal v-if="selectedGoal" 
        :goalId="selectedGoal._id" 
        :title="selectedGoal.title" 
        :description="selectedGoal.description" 
        :entrances="selectedGoal.entrances"
        />
        
      </ul>
      <AddGoal :ownerId="userStore.sub"/>
  </div>
</template>