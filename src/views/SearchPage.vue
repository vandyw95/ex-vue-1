<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import debounce from 'lodash/debounce';

import NewsCard from '~/components/NewsCard.vue';

const store = useStore();

const isTyping = ref(false);
const isLoading = computed(() => store.state.news.isLoadingSearch);
const searchResults = computed(() => store.state.news.searchResults);
const error = ref(null);

function setError(newError) {
  error.value = newError;
}

const text = ref('');
const handleSearch = debounce(() => {
  if (text.value) {
    store.dispatch('news/getSearchResults', { searchText, setError });
  }
  isTyping.value = false;
}, 500);
const searchText = computed({
  get() {
    return text.value;
  },
  set(val) {
    isTyping.value = true;
    text.value = val;
    handleSearch(val);
  },
});
</script>

<template>
  <main>
    <v-container fluid>
      <v-row dense>
        <h1>Search</h1>
      </v-row>

      <v-row dense>
        <v-text-field clearable placeholder="Search here..." v-model="searchText"></v-text-field>
      </v-row>

      <v-row v-if="isLoading || isTyping" dense>
        <v-progress-circular
          color="primary"
          indeterminate
          :size="63"
          :width="10"
        ></v-progress-circular>
      </v-row>

      <v-row v-else-if="error && !!text" dense>Error {{ error.response.status }}</v-row>

      <v-row v-else-if="searchResults.length === 0 && !isLoading" dense
        >No Result for "{{ searchText }}"</v-row
      >

      <NewsCard v-else :items="searchResults" />
    </v-container>
  </main>
</template>

<style scoped>
/*  */
</style>
