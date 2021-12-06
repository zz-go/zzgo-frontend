import { createStore } from "vuex";
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

export default createStore({
  state: {
	  subnavigation: false,
	  tabledefinitions: []
  },
  mutations,
  actions,
  getters,
  modules: {},
});
