<template>
    <nav class="navbar">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink v-if="!userStore" to="/login">Login</RouterLink>
            <RouterLink v-else to="/private/dashboard">Dashboard</RouterLink>
    </nav>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { userStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

export default defineComponent({
    name: 'Navbar',
    setup() {
        const storeUser = userStore();
        const { token } = storeToRefs(storeUser);

        return {
            userStore: token,
        }
    }
});
</script>
  
<style>
.navbar {
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

a{
    text-decoration: none;
    color: white;
}




</style>
  