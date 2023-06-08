<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const histories = computed(() => store.state.news.histories);
const titleOverwrite = computed(() => store.state.news.titleOverwrite);

function handleReadMore(newsId) {
  store.dispatch(
    'news/setCurrentArticle',
    histories.value.find((item) => item.newsId === newsId),
  );
  router.push(`/news/${newsId}`);
}
</script>

<template>
  <main>
    <v-container fluid>
      <v-row dense>
        <h1>History</h1>
      </v-row>

      <v-row v-if="histories.length === 0" dense>No History Data</v-row>

      <v-row v-else dense>
        <div class="card-container">
          <v-card
            class="mx-auto"
            max-width="300"
            v-for="{ title, source, description, urlToImage, newsId } in histories"
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
