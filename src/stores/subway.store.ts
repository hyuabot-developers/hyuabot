import {defineStore} from 'pinia';
import {SubwayItem} from 'src/models/subway.item';

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
  }
});
