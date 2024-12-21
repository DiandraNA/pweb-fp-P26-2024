<template>
  <nav>
    <div>
      <h1>Equipment Lending System</h1>
      <p v-if="user">Logged in as: {{ user.username }} ({{ user.role }})</p>
      <router-link to="/">Home</router-link>
      <router-link to="/#rules">Rules</router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['user']);

const loggedInUser = computed(() => {
  return JSON.parse(localStorage.getItem('loggedInUser'));
});
</script>
