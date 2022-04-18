import {ShuttleTimetableItem} from 'src/models/shuttle.item';
import {defineStore} from 'pinia';

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
  }
});
