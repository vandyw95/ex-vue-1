<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import EditTitle from './EditTitle.vue';

const route = useRoute();
const store = useStore();

const isDialogOpen = ref(false);
const content = computed(() => {
  if (store.state.news.currentArticle.newsId === route.params.newsId) {
    return store.state.news.currentArticle;
  }
  return store.state.news.news.find(({ newsId }) => newsId === route.params.newsId);
});
const titleOverwrite = computed(() => store.state.news.titleOverwrite);

function toggleEditDialog() {
  isDialogOpen.value = !isDialogOpen.value;
}

onMounted(() => {
  store.dispatch('news/addHistory', route.params.newsId);
});
</script>

<template>
  <v-container fluid>
    <EditTitle :toggleEditDialog="toggleEditDialog" :isDialogOpen="isDialogOpen" />

    <div v-if="!!content">
      <v-row dense>
        <h1>{{ titleOverwrite[route.params.newsId] || content.title }}</h1>
      </v-row>

      <v-row dense>
        <v-btn @click="toggleEditDialog">
          <v-icon icon="mdi-circle-edit-outline" />
          Edit Title
        </v-btn>
      </v-row>

      <v-row dense>
        <h3>{{ content.source.name }}</h3>
      </v-row>

      <v-row dense>
        <main>
          {{ content.content }}
        </main>
      </v-row>
    </div>

    <div v-else>
      <v-row dense>
        <h1>Content Not Found</h1>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
.v-row {
  margin: 10px 0;
}
</style>
