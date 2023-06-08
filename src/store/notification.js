const state = () => ({
  type: '',
  title: '',
  message: '',
});

const getters = {};

const actions = {
  setType({ commit }, value) {
    commit('setType', value);
  },
  setTitle({ commit }, value) {
    commit('setTitle', value);
  },
  setMessage({ commit }, value) {
    commit('setMessage', value);
  },
};

const mutations = {
  setType(state, newValue) {
    state.type = newValue;
  },
  setTitle(state, newValue) {
    state.title = newValue;
  },
  setMessage(state, newValue) {
    state.message = newValue;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
