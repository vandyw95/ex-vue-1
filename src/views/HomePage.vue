<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

import NewsCard from '~/components/NewsCard.vue';

const store = useStore();

const news = computed(() => store.state.news.news);
const sources = computed(() => store.state.news.sources);
const derivedSources = computed(() =>
  sources.value.map((s) => s.name || '').filter((s) => s.length),
);
const isLoading = computed(() => store.state.news.isLoadingNews);
const error = ref(null);

const selectedSource = ref([]);
const filteredNews = computed(() =>
  selectedSource.value.length > 0
    ? news.value.filter((n) => selectedSource.value.includes(n.source.name))
    : news.value,
);

function setError(newError) {
  error.value = newError;
}

function fetchNews() {
  store.dispatch('news/getNews', setError);
}

function fetchSources() {
  store.dispatch('news/getSources', setError);
}

onMounted(() => {
  if (news.value.length === 0) {
    fetchNews();
  }
  if (sources.value.length === 0) {
    fetchSources();
  }
});
</script>

<template>
  <main>
    <v-container fluid>
      <v-row dense>
        <h1>Headlines</h1>
      </v-row>

      <v-row dense>
        <v-select
          v-model="selectedSource"
          clearable
          chips
          label="Filter Source"
          :items="derivedSources"
          multiple
          variant="outlined"
        ></v-select>
      </v-row>

      <v-row v-if="isLoading" dense>
        <v-progress-circular
          color="primary"
          indeterminate
          :size="63"
          :width="10"
        ></v-progress-circular>
      </v-row>

      <v-row v-else-if="error" dense>Error {{ error.response.status }}</v-row>

      <v-row v-else-if="!isLoading && news.length === 0" dense>No Data</v-row>

      <NewsCard v-else :items="filteredNews" />
    </v-container>
  </main>
</template>

<style scoped>
/*  */
</style>
