import {defineStore} from 'pinia';
import {BusTimetableItem} from 'src/models/bus.item';
import {api} from 'boot/axios';
import {AxiosResponse} from 'axios';

export type BusTimetableState = {
  timetable: {[lineName: string]: BusTimetableItem};
}
export const useBusTimetableStore = defineStore({
  id: 'busTimetableStore',
  state: () => ({ timetable: {}} as BusTimetableState),
  getters: {
    hasLineTimeTable: (state) => (lineName: string) => {
      return state.timetable.hasOwnProperty(lineName);
    },
    getTimetable: (state: BusTimetableState) => {
      return (lineName: string) => state.timetable[lineName];
    },
  },
  actions: {
    fetchTimetable: (state: BusTimetableState, lineName: string) => {
      api.get(`/bus/arrival/${lineName}`).then(
        (response: AxiosResponse<BusTimetableItem>) => {
          state.timetable[lineName] = response.data
        }
      );
    },
  },
});
