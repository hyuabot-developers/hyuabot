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
    fetchArrivalList(){
      api.get('/bus/arrival').then(
        (response: AxiosResponse<{[key: string]: BusItem[] | string}>) => {
          this.arrivalList = response.data['departureList'] as BusItem[];
        }
      )
    },
  },
});
