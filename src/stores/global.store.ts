import {defineStore} from 'pinia';

export const useGlobalStore = defineStore({
  id: 'globalStore',
  state: () => ({
    isLoading: true,
    title: '',
    shuttleTabVisibility: false,
    shuttleTabIndex: 'weekdays',
    subwayTabVisibility: false,
    subwayTabIndex: '',
    busTabVisibility: false,
    busTabIndex: 'weekdays',
  }),
});
