import {defineStore} from 'pinia';
import {CafeteriaItem} from 'src/models/cafeteria.item';

export type CafeteriaState = {
  restaurantList: CafeteriaItem[];
}
export const useCafeteriaStore = defineStore({
  id: 'shuttleArrivalStore',
  state: () => ({restaurantList: []} as CafeteriaState),
  getters: {
    getMenuList: (state: CafeteriaState) => {
      return (cafeteriaName: string) => state.restaurantList.filter(item => item.name === cafeteriaName)
    },
  }
});
