import { formatJSON, getStoredData, setStoredData } from "./utils";
import Vue from "vue";
import Vuex from "vuex";

const storeddata = getStoredData();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rawjson: storeddata.rawjson,
    formattedJSON: formatJSON(storeddata.rawjson, storeddata.settings.spaces),
    settings: storeddata.settings
  },

  mutations: {
    setJSON(state, data) {
      state.rawjson = data.rawjson;
      state.formattedJSON = formatJSON(data.rawjson, state.settings.spaces);
      if(state.formattedJSON.length > 0) {
        setStoredData("rawjson", data.rawjson);
      }
    },
    setSetting(state, data) {
      state.settings[data.name] = data.value;
      state.formattedJSON = formatJSON(state.rawjson, state.settings.spaces);
      setStoredData("settings", state.settings);
    }
  },

  actions: {
    setJSON({ commit }, data) {
      commit("setJSON", data);
    },
    updateSettings({commit}, data) {
      commit("setSetting", {
        name: data.name,
        value: data.value
      });
    }
  }
});
