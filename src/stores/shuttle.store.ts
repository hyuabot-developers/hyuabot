import {defineStore} from 'pinia';
import {ShuttleStopItem} from 'src/models/shuttle.item';

export type ShuttleState = {
  arrivalList: ShuttleStopItem[];
}
export const useShuttleArrivalStore = defineStore({
  id: 'shuttleArrivalStore',
  state: () => ({arrivalList: []} as ShuttleState),
  getters: {
    getArrivalList: (state: ShuttleState) => {
      return (stopCode: string) => state.arrivalList.filter(item => item.stopCode === stopCode)
    },
  }
});
