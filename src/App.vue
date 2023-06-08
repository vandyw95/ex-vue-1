<script setup>
import { RouterView } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

import AppNavbar from '~/components/AppNavbar.vue';
import AppNotification from './components/AppNotification.vue';

const store = useStore();

async function fetchWrong() {
  try {
    const response = await axios.get('https://newsapi.org/v2/sources?apiKey');
    return response;
  } catch (error) {
    return error;
  }
}

async function handleTestWrong() {
  const response = await fetchWrong();
  console.error(response);
  store.dispatch('notification/setTitle', response.code);
  store.dispatch('notification/setMessage', response.message);
}
</script>

<template>
  <v-layout>
    <AppNavbar />
    <v-main>
      <v-container fluid>
        <v-btn style="border: 1px solid black" @click="handleTestWrong"> Test Wrong API </v-btn>
      </v-container>

      <AppNotification />

      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped>
/*  */
</style>
