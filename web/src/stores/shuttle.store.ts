import {defineStore} from 'pinia';
import {ShuttleStopItem} from 'src/models/shuttle.item';
import {api} from 'boot/axios';
import {AxiosResponse} from 'axios';
import {useGlobalStore} from 'stores/global.store';

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
  },
  actions: {
    async fetchShuttleArrivalList() {
      const globalState = useGlobalStore();
      globalState.isLoading = true;
      const response: AxiosResponse<{ [key: string]: ShuttleStopItem[] | string }> = await api.get('/shuttle/arrival');
      this.arrivalList = response.data['arrivalList'] as ShuttleStopItem[];
      globalState.isLoading = false;
    }
  },
});
