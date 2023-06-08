<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import NewsCard from '~/components/NewsCard.vue';

const store = useStore();

const histories = computed(() => store.state.news.histories);
</script>

<template>
  <main>
    <v-container fluid>
      <v-row dense>
        <h1>History</h1>
      </v-row>

      <v-row v-if="histories.length === 0" dense>No History Data</v-row>

      <NewsCard v-else :items="histories" />
    </v-container>
  </main>
</template>

<style scoped>
/*  */
</style>
