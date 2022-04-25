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
    fetchShuttleArrivalList()  {
      const globalState = useGlobalStore();
      globalState.isLoading = true;
      api.get('/shuttle/arrival').then(
        (response: AxiosResponse<{[key: string]: ShuttleStopItem[] | string}>) => {
          this.arrivalList = response.data['arrivalList'] as ShuttleStopItem[];
          globalState.isLoading = false;
        }
      );
    },
  },
});
