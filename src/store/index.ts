import Vue from "vue";
import Vuex from "vuex";

import mainStore from "./main";

Vue.use(Vuex);

const store = new Vuex.Store({
  ...mainStore,
  modules: {},
});

export default store;
