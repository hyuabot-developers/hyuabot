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
      console.log(state.arrivalList);
      return (stopCode: string) => state.arrivalList.filter(item => item.stopCode === stopCode)[0]
    },
  },
  actions: {
    async fetchShuttleTimetableList() {
      const response: AxiosResponse<{[key: string]: ShuttleTimetableItem[] | string}> = await api.get('/shuttle/timetable')
      this.arrivalList = response.data['timetableList'] as ShuttleTimetableItem[];
    },
  },
});
