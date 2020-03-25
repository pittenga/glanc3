import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    signedIn: false,
    clientId: {client_id: '282176905151-ul8cu4nsahkd83nsahjar0am52dlop64.apps.googleusercontent.com'}
  },
  mutations: {
    SIGNED_IN(state, signedIn) {
      state.signedIn = signedIn
    }
  },
  actions: {
    setSignedIn({ commit }, signedIn){
      commit('SIGNED_IN', signedIn);
    }
  },
  getters: {
    isSignedIn: state => {
      return state.signedIn
    },
    getClientId: state => {
      return state.clientId
    }
  },
});
