import {ShuttleTimetableItem} from 'src/models/shuttle.item';
import {defineStore} from 'pinia';
import {api} from 'boot/axios';
import {AxiosResponse} from 'axios';

export type ShuttleTimetableState = {
  arrivalList: ShuttleTimetableItem[];
}
export const useShuttleTimetableStore = defineStore({
  id: 'shuttleTimetableStore',
  state: () => ({arrivalList: []} as ShuttleTimetableState),
  getters: {
    getArrivalList: (state: ShuttleTimetableState) => {
      return (stopCode: string) => state.arrivalList.filter(item => item.stopCode === stopCode)
    },
  },
  actions: {
    fetchShuttleTimetableList() {
      api.get('/shuttle/timetable').then(
        (response: AxiosResponse<{[key: string]: ShuttleTimetableItem[] | string}>) => {
          this.arrivalList = response.data['timetableList'] as ShuttleTimetableItem[];
        }
      );
    },
  },
});
