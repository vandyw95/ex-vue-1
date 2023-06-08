<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const news = computed(() => store.state.news.news);
const sources = computed(() => store.state.news.sources);
const derivedSources = computed(() =>
  sources.value.map((s) => s.name || '').filter((s) => s.length),
);
const isLoading = computed(() => store.state.news.isLoadingNews);
const titleOverwrite = computed(() => store.state.news.titleOverwrite);
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

function handleReadMore(newsId) {
  store.dispatch(
    'news/setCurrentArticle',
    news.value.find((item) => item.newsId === newsId),
  );
  router.push(`/news/${newsId}`);
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

      <v-row v-else dense>
        <div class="card-container">
          <v-card
            class="mx-auto"
            max-width="300"
            v-for="{ title, source, description, urlToImage, newsId } in filteredNews"
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
