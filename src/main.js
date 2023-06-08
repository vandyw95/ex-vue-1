import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import App from './App.vue';
import store from './store';
import router from './router';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

app.use(store);
app.use(router);
app.use(vuetify);

app.mount('#app');
