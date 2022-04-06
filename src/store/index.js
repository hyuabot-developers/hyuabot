import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    shuttleRealtimeData: [],
    shuttleTimetableData: [],
  },
  getters: {
    getShuttleRealtimeData: (state) => {
      return state.shuttleRealtimeData;
    },
  },
});
