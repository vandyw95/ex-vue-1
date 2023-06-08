import { createStore, createLogger } from 'vuex';
import news from './news';
import notification from './notification';

export default createStore({
  modules: {
    news,
    notification,
  },
  strict: false,
  plugins: [createLogger()],
});
