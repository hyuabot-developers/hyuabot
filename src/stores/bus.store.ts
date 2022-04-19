import {defineStore} from 'pinia';
import {BusItem} from 'src/models/bus.item';

export type BusState = {
  arrivalList: BusItem[];
}
export const useBusArrivalStore = defineStore({
  id: 'busArrivalStore',
  state: () => ({arrivalList: []} as BusState),
  getters: {
    getArrivalList: (state: BusState) => {
      return (lineName: string) => state.arrivalList.filter(item => item.name === lineName)
    },
  }
});
