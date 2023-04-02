<template>

    <div>
        <h1>Login</h1>
        <div>
          <p>User password: {{ email }}:{{password}}</p>
          <input v-model="email" placeholder="user" />
          <input v-model="password" type="password" placeholder="password" />
          <button class="border-slate-100 border rounded w-fit px-2 mx-auto" @click="loginMethod">Sign In</button>
        </div>
        <div v-if="error">{{error}}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
// import OauthApi from "@/services/osfOauth/";

// import Spinner from "@/components/Spinner.vue";
import _ from 'lodash';
import { login } from "@/services/Oauth";
// import { userStore } from '@/stores/user'
// var store  = userStore();

export default defineComponent({
    components: {
  },
    data(){
        return {
            email: 'rmadrid@gmail.com',
            password: 'TEMPpass1@3',
            error: null,
        }
    },
    methods:{
        async loginMethod(){
            await login(this.email, this.password).catch(error => {
                this.error = _.get(error, 'response.data.error.message')
            })
        }
    },
    async mounted(){
    }

})
</script>

<style scoped>

</style>
