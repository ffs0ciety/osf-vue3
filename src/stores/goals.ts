import { defineStore } from 'pinia'

export const goalsStore = defineStore({
  id: 'goals',
  state: () => ({
    goals: []

  }),
  getters: {
    
  },
  actions: {
   setGoals(newGoals:Array<Object>) {
    this.goals = newGoals;
   }
  }
})
