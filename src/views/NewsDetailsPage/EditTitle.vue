<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const props = defineProps({
  toggleEditDialog: {
    type: Function,
    required: true,
  },
  isDialogOpen: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const route = useRoute();
const store = useStore();

const isOpen = computed({
  get() {
    return props.isDialogOpen;
  },
  set() {
    // Do nothing
  },
});
const title = ref(
  store.state.news.titleOverwrite[route.params.newsId] ||
    store.state.news.currentArticle.title ||
    '',
);
const titleInputRules = [
  (value) => !!value || 'Title is required',
  (value) => 255 >= value.length || 'Max character: 255',
];
const isTitleRuleError = computed(() =>
  titleInputRules.map((rule) => rule(title.value)).find((value) => value !== true),
);

function handleCancel() {
  const resetValue =
    store.state.news.titleOverwrite[route.params.newsId] ||
    store.state.news.currentArticle.title ||
    '';
  if (title.value !== resetValue) {
    title.value = resetValue;
  }
  props.toggleEditDialog();
}

function handleEditTitle() {
  if (isTitleRuleError.value) return;

  store.dispatch('news/changeTitle', title.value);
  props.toggleEditDialog();
}
</script>

<template>
  <v-dialog persistent width="400px" v-model="isOpen">
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
        <v-btn color="primary" variant="text" @click="handleCancel"> Cancel </v-btn>
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
</template>

<style scoped>
/*  */
</style>
