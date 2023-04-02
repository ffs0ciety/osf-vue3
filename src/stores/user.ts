import { defineStore } from 'pinia'

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    username: '',
    token: null,
    data: null,
    "cognito:groups": [],
    email: null,
    email_verified: null,
    sub: null
  }),
  getters: {
    
  },
  actions: {
   
  }
})
