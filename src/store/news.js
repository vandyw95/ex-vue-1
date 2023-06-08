import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// const API_KEY = '099148be22804e849a0c6fe022b7cf5e';
const API_KEY = '9ceef681449741b4af90c27d14b94297';

async function fetchNews(setError) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`,
    );
    return response.data.articles;
  } catch (error) {
    console.error(error);
    setError(error);
    return [];
  }
}

async function fetchSources(setError) {
  try {
    const response = await axios.get(`https://newsapi.org/v2/sources?apiKey=${API_KEY}`);
    return response.data.sources;
  } catch (error) {
    console.error(error);
    setError(error);
    return [];
  }
}

async function fetchSearchResults(searchText, setError) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?q=${searchText}&apiKey=${API_KEY}`,
    );
    return response.data.articles;
  } catch (error) {
    console.error(error);
    setError(error);
    return [];
  }
}

const state = () => ({
  news: [],
  isLoadingNews: false,
  currentArticle: {
    newsId: '',
    title: '',
  },
  titleOverwrite: {},
  histories: [],
  sources: [],
  isLoadingSources: false,
  searchResults: [],
  isLoadingSearch: false,
});

const getters = {};

const actions = {
  async getNews({ commit }, setError) {
    commit('setNewsLoading', true);
    const rawNews = await fetchNews(setError);
    const news = rawNews.map((item) => ({ ...item, newsId: uuidv4() }));
    commit('setNews', news || []);
    commit('setNewsLoading', false);
  },
  setCurrentArticle({ state, commit }, newsId) {
    const article = state.news.find((item) => item.newsId === newsId);
    commit('setCurrentArticle', article);
  },
  addHistory({ commit, state }, newsId) {
    const isExist = state.histories.find((item) => item.newsId === newsId);
    if (state.currentArticle?.newsId === newsId && !isExist) {
      commit('addHistory', state.currentArticle);
    }
  },
  changeTitle({ commit }, text) {
    commit('setTitle', text);
  },
  async getSources({ commit }, setError) {
    commit('setSourcesLoading', true);
    const sources = await fetchSources(setError);
    commit('setSources', sources || []);
    commit('setSourcesLoading', false);
  },
  async getSearchResults({ commit }, { searchText, setError }) {
    commit('setSearchLoading', true);
    const searchResults = await fetchSearchResults(searchText, setError);
    commit('setSearchResults', searchResults || []);
    commit('setSearchLoading', false);
  },
};

const mutations = {
  setNews(state, newValue) {
    state.news = newValue;
  },
  setNewsLoading(state, newValue) {
    state.isLoadingNews = newValue;
  },
  setCurrentArticle(state, newValue) {
    state.currentArticle = {
      ...newValue,
      title: state.titleOverwrite[newValue.newsId] || newValue.title,
    };
  },
  addHistory(state, newValue) {
    state.histories = [...state.histories, newValue];
  },
  setTitle(state, newValue) {
    state.titleOverwrite[state.currentArticle.newsId || 'n/a'] = newValue;
  },
  setSources(state, newValue) {
    state.sources = newValue;
  },
  setSourcesLoading(state, newValue) {
    state.isLoadingSources = newValue;
  },
  setSearchResults(state, newValue) {
    state.searchResults = newValue;
  },
  setSearchLoading(state, newValue) {
    state.isLoadingSearch = newValue;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
