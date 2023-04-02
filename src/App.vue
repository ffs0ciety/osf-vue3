<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
</script>

<template>
  <!-- <Header /> -->
  <!-- <RouterView /> -->

  <div class="layout">
    <header class="header"><Header /></header>
    <!-- <section class="sidebar">sidebar</section> -->
    <main class="view"><RouterView /></main>
  </div>
</template>

<style>
.layout {
  background-color: #8c1d1d;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 60px 1fr;
  
}

.header {
  background-color: #333333;
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}

.view {
  /* width: 400px; */
  background-color: #e7e7e7;
  grid-column: 1 / 3;
  grid-row: 2  / 3;
  overflow: auto;
}
/* 
.sidebar {
  background-color: rgb(167, 167, 167);
  grid-column: 1 / 2;
  grid-row: 1  / 3;

} */
</style>
