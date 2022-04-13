import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    appTitle: "셔틀버스",
    shuttleSnackBar: true,
    shuttleRealtimeData: [],
    shuttleTimetableData: [],
    subwayData: [],
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
    setShuttleSnackBarVisible(state, visible) {
      state.shuttleSnackBar = visible;
    },
  },
});
