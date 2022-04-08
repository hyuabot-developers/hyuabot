import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    shuttleRealtimeData: [],
    shuttleTimetableData: [],
  },
  getters: {
    getShuttleTimetable: (state) => (stopCode) => {
      return state.shuttleTimetableData.find(
        (item) => item.stopCode === stopCode
      );
    },
  },
  mutations: {
    setShuttleTimetable(state, timetable) {
      state.shuttleTimetableData = timetable;
    },
  },
});
