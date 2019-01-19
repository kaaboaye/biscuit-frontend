import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

function url(resource) {
  return `//localhost:2300${resource}`;
}

export default new Vuex.Store({
  state: {
    teas: [],
    _teasId: {},
    tea: {},
    teaId: 0
  },

  getters: {
    tea(state) {
      const tea =
        state._teasId[state.teaId] ||
        state.teas.find(t => t.id === state.teaId) ||
        {};

      if (!tea.brewings) {
        tea.brewings = [];
      }

      return tea;
    }
  },

  mutations: {
    setTeas(state, teas) {
      state.teas = teas;
    },

    setTea(state, tea) {
      if (tea.id) {
        state._teasId = {
          ...state._teasId,
          [tea.id]: tea
        };

        state.teaId = tea.id;
      } else {
        state.teaId = 0;
      }

      state.tea = tea;
    },

    setTeaId(state, teaId) {
      state.teaId = teaId;
    },

    selectTea(state, teaId) {
      state.tea = state._teasId[teaId] || {};
    }
  },

  actions: {
    getTeas({ commit }) {
      axios.get(url("/teas")).then(res => {
        const teas = res.data.data;
        if (teas) {
          commit("setTeas", teas);
        }
      });
    },

    getTea({ commit }, teaId) {
      commit("setTeaId", teaId);
      axios.get(url(`/teas/${teaId}`)).then(res => {
        commit("setTea", res.data.data);
      });
    }
  }
});
