import {defineStore} from 'pinia';
import {SubwayItem} from 'src/models/subway.item';
import {api} from 'boot/axios';
import {AxiosResponse} from 'axios';

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
    fetchSubwayArrivalList: (state: SubwayState, campus: string) => {
      api.get(`/subway/arrival/${campus}`).then(
        (response: AxiosResponse<{[key: string]: SubwayItem[] | string}>) => {
          state.arrivalList = response.data['departureList'] as SubwayItem[];
        }
      );
    },
  },
});
