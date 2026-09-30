<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="vue-shell">
    <header class="shell-header">
      <h2>Vue Shell Host</h2>
      <nav class="nav-links">
        <RouterLink to="/orders">Orders MFE</RouterLink> || 
        <RouterLink to="/products">Products MFE</RouterLink> || 
        <RouterLink to="/resources">Resources MFE</RouterLink>
      </nav>
    </header>
    <main class="content-area">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
  #vue-shell {
    font-family: Arial, Helvetica, sans-serif;
  }
  .shell-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #35495e;
    color: white;
  }
  .nav-links a {
    color: #ffffff;
    border-bottom: 2px solid #42b883;
  }
  .content-area {
    padding: 2rem;
  }
</style>


