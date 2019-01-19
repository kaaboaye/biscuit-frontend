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
      state.teas = teas.sort((a, b) => a.name.localeCompare(b.name));
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
    },

    setTeaId(state, teaId) {
      state.teaId = teaId;
    }
  },

  actions: {
    async getTeas({ commit }) {
      const res = await axios.get(url("/teas"));
      const teas = res.data.data;
      if (teas) {
        commit("setTeas", teas);
      }
    },

    async getTea({ commit }, teaId) {
      commit("setTeaId", teaId);
      const res = await axios.get(url(`/teas/${teaId}`));
      commit("setTea", res.data.data);
    },

    async addTea({ commit, dispatch, state }, { tea: attrs, callback }) {
      const res = await axios.post(url("/teas"), { tea: attrs });
      const tea = res.data.data;
      if (!tea || !tea.id) {
        return;
      }

      const teas = state.teas.filter(t => String(t.id) !== String(tea.id));
      teas.push(tea);
      commit("setTeas", teas);
      commit("setTea", tea);
      dispatch("getTea", tea.id);
      callback(tea);
    },

    async addBrewing({ commit, dispatch, getters }, { brewing: attrs }) {
      const tea = getters.tea;
      attrs.teaId = tea.id;

      const res = await axios.post(url("/brewings"), { brewing: attrs });
      const brewing = res.data.data;

      if (!brewing || !brewing.id) {
        return;
      }

      tea.brewings.push(brewing);
      commit("setTea", tea);
      dispatch("getTea", tea.id);
    }
  }
});
