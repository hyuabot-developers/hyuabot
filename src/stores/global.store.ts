import {defineStore} from 'pinia';

export const useGlobalStore = defineStore({
  id: 'globalStore',
  state: () => ({
    isLoading: true,
    title: '',
<<<<<<< HEAD
    subwayTabVisibility: false,
    subwayTabIndex: '',
=======
    busTabVisibility: false,
    busTabIndex: 'weekdays',
>>>>>>> bus-page
  }),
});
