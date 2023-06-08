<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const type = computed(() => store.state.notification.type);
const title = computed(() => store.state.notification.title);
const message = computed(() => store.state.notification.message);
const hasAlert = computed({
  get() {
    return !!store.state.notification.title;
  },
  set() {
    store.dispatch('notification/setTitle', '');
    store.dispatch('notification/setMessage', '');
  },
});
</script>

<template>
  <v-container fluid v-if="hasAlert">
    <v-alert
      closable
      icon="$error"
      border="start"
      variant="outlined"
      v-model="hasAlert"
      :title="title"
      :text="message"
      :type="type || 'error'"
    ></v-alert>
  </v-container>
</template>

<style scoped>
/*  */
</style>
