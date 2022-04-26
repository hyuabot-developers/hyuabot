import {defineStore} from 'pinia';
import {BusItem} from 'src/models/bus.item';
import {api} from 'boot/axios';
import {AxiosResponse} from 'axios';
import {useGlobalStore} from 'stores/global.store';

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
    async fetchArrivalList(){
      const globalState = useGlobalStore();
      globalState.isLoading = true;
      const response: AxiosResponse<{[key: string]: BusItem[] | string}> = await api.get('/bus/arrival');
      this.arrivalList = response.data['departureInfoList'] as BusItem[];
      console.log(this.arrivalList);
      globalState.isLoading = false;
    },
  },
});
