<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();

const content = computed(() => {
  if (store.state.news.currentArticle.newsId === route.params.newsId) {
    return store.state.news.currentArticle;
  }
  return store.state.news.news.find(({ newsId }) => newsId === route.params.newsId);
});

const isDialogOpen = ref(false);
const title = ref(store.state.news.currentArticle.title || '');
const titleModel = computed({
  get() {
    return title.value;
  },
  set(val) {
    title.value = val;
  },
});
const titleInputRules = [
  (value) => !!value || 'Title is required',
  (value) => 255 >= value.length || 'Max character: 255',
];
const isTitleRuleError = computed(() =>
  titleInputRules.map((r) => r(titleModel.value)).find((v) => v !== true),
);

function toggleEditDialog() {
  isDialogOpen.value = !isDialogOpen.value;
}

function handleEditTitle() {
  if (isTitleRuleError.value) return;

  store.dispatch('news/changeTitle', titleModel.value);
  toggleEditDialog();
}

onMounted(() => {
  store.dispatch('news/addHistory', route.params.newsId);
});
</script>

<template>
  <v-container fluid>
    <div v-if="!!content">
      <v-row dense>
        <h1>{{ content.title }}</h1>

        <v-btn class="mx-6" icon @click="toggleEditDialog">
          <v-icon icon="mdi-circle-edit-outline" />
        </v-btn>
      </v-row>

      <h3>{{ content.source.name }}</h3>

      <main>
        {{ content.content }}
      </main>
    </div>

    <div v-else>
      <v-row dense>
        <h1>Content Not Found</h1>
      </v-row>
    </div>

    <v-dialog persistent width="400px" v-model="isDialogOpen">
      <v-card>
        <v-card-title class="text-h5">Edit Title</v-card-title>
        <v-card-text>
          <v-text-field
            required
            label="Title"
            :rules="titleInputRules"
            v-model="title"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="toggleEditDialog"> Cancel </v-btn>
          <v-btn
            :disabled="!!isTitleRuleError"
            color="primary"
            variant="text"
            @click="handleEditTitle"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
/*  */
</style>
