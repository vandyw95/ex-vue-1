<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isHomePage = computed(() => route.name === 'Home');
const isHistoryPage = computed(() => route.name === 'History');
const isSearchPage = computed(() => route.name === 'Search');

function goToHome() {
  if (!isHomePage.value) {
    router.push('/');
  }
}

function goToHistory() {
  if (!isHistoryPage.value) {
    router.push('/history');
  }
}

function goToSearch() {
  if (!isSearchPage.value) {
    router.push('/search');
  }
}
</script>

<template>
  <v-app-bar color="teal-darken-4" image="https://picsum.photos/1920/64?random">
    <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <v-btn :disabled="isHomePage" icon @click="goToHome">
      <v-icon icon="mdi-home" />
    </v-btn>

    <v-app-bar-title>News</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn :disabled="isSearchPage" icon @click="goToSearch">
      <v-icon icon="mdi-magnify" />
    </v-btn>

    <v-btn :disabled="isHistoryPage" icon @click="goToHistory">
      <v-icon icon="mdi-history" />
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
/*  */
</style>
