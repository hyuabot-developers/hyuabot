import {defineStore} from 'pinia';
import {CafeteriaItem} from 'src/models/cafeteria.item';
import {api} from 'boot/axios';
import {AxiosResponse} from 'axios';
import {useGlobalStore} from 'stores/global.store';

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
    async fetchMenuList() {
      const globalState = useGlobalStore();
      globalState.isLoading = true;
      const response: AxiosResponse<{[key: string]: CafeteriaItem[] | string}> = await api.get('/food/campus/erica');
      this.restaurantList = response.data['restaurantList'] as CafeteriaItem[];
      globalState.isLoading = false;
    },
  },
});
