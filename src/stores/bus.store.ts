import {defineStore} from 'pinia';
import {BusItem} from 'src/models/bus.item';
import {api} from 'boot/axios';
import {AxiosResponse} from 'axios';

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
  },
  actions: {
    fetchArrivalList: (state: BusState) => {
      api.get('/bus/arrival').then(
        (response: AxiosResponse<{[key: string]: BusItem[]}>) => {
          state.arrivalList = response.data['departureList']
        }
      );
    },
  },
});
