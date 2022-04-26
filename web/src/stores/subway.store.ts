import {defineStore} from 'pinia';
import {SubwayItem} from 'src/models/subway.item';
import {api} from 'boot/axios';
import {AxiosResponse} from 'axios';
import {useGlobalStore} from 'stores/global.store';

export type SubwayState = {
  arrivalList: SubwayItem[];
}
export const useSubwayArrivalStore = defineStore({
  id: 'subwayArrivalStore',
  state: () => ({arrivalList: []} as SubwayState),
  getters: {
    getArrivalList: (state: SubwayState) => {
      return (lineName: string) => state.arrivalList.filter(item => item.lineName === lineName)
    },
  },
  actions: {
    async fetchSubwayArrivalList(campus: string) {
      const globalState = useGlobalStore();
      globalState.isLoading = true;
      const response: AxiosResponse<{[key: string]: SubwayItem[] | string}> = await api.get(`/subway/arrival/${campus}`);
      this.arrivalList = response.data['departureList'] as SubwayItem[];
      globalState.isLoading = false;
    },
  },
});
