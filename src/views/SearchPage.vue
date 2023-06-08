<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import debounce from 'lodash/debounce';

const router = useRouter();
const store = useStore();

const isLoading = computed(() => store.state.news.isLoadingSearch);
const searchResults = computed(() => store.state.news.searchResults);
const titleOverwrite = computed(() => store.state.news.titleOverwrite);
const error = ref(null);

function setError(newError) {
  error.value = newError;
}

const text = ref('');
const handleSearch = debounce(() => {
  console.log('=====500ms! ', text);
  if (text.value) {
    store.dispatch('news/getSearchResults', { searchText, setError });
  }
}, 500);
const searchText = computed({
  get() {
    return text.value;
  },
  set(val) {
    text.value = val;
    handleSearch(val);
  },
});

function handleReadMore(newsId) {
  store.dispatch(
    'news/setCurrentArticle',
    searchResults.value.find((item) => item.newsId === newsId),
  );
  router.push(`/news/${newsId}`);
}
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

      <v-row v-if="isLoading" dense>
        <v-progress-circular
          color="primary"
          indeterminate
          :size="63"
          :width="10"
        ></v-progress-circular>
      </v-row>

      <v-row v-else-if="error && !!text" dense>Error {{ error.response.status }}</v-row>

      <v-row v-else-if="searchResults.length === 0" dense>No Result for "{{ searchText }}"</v-row>

      <v-row v-else dense>
        <div class="card-container">
          <v-card
            class="mx-auto"
            max-width="300"
            v-for="{ title, source, description, urlToImage, newsId } in searchResults"
            :key="newsId"
          >
            <v-img height="180" :src="urlToImage" cover></v-img>

            <v-card-title>{{ titleOverwrite[newsId] || title }}</v-card-title>
            <v-card-subtitle>{{ source.name }}</v-card-subtitle>

            <v-card-text class="card-desc">
              {{ description }}
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" variant="text" @click="() => handleReadMore(newsId)"
                >Read More</v-btn
              >
            </v-card-actions>
          </v-card>
        </div>
      </v-row>
    </v-container>
  </main>
</template>

<style scoped>
.card-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: space-evenly;
  grid-gap: 20px;
}

.card-desc {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 64px;
  padding: 0 1rem;
}
</style>
