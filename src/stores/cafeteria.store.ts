import {defineStore} from 'pinia';
import {CafeteriaItem} from 'src/models/cafeteria.item';
import {api} from 'boot/axios';
import {AxiosResponse} from 'axios';

export type CafeteriaState = {
  restaurantList: CafeteriaItem[];
}
export const useCafeteriaStore = defineStore({
  id: 'cafeteriaStore',
  state: () => ({restaurantList: []} as CafeteriaState),
  getters: {
    getMenuList: (state: CafeteriaState) => {
      return (cafeteriaName: string) => state.restaurantList.filter(item => item.name === cafeteriaName)
    },
  },
  actions: {
    fetchMenuList: (state: CafeteriaState) => {
      api.get('/food/campus/erica').then(
        (response: AxiosResponse<{[key: string]: CafeteriaItem[] | string}>) => {
          state.restaurantList = response.data['restaurantList'] as CafeteriaItem[];
        }
      );
    },
  },
});
