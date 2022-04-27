<template>
  <q-page class="column items-center justify-evenly" style="margin-left: 10px; margin-right: 10px; margin-top: 10px">
    <BusCard v-for="busItem in busArrivalList" :bus="busItem" style="margin-bottom: 10px"/>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useGlobalStore} from 'stores/global.store';
import {useBusArrivalStore} from 'stores/bus.store';
import BusCard from 'components/BusCard.vue'
import {BusItem} from 'src/models/bus.item';

export default defineComponent({
  name: 'BusPage',
  components: {BusCard},
  setup () {
    const busArrivalList = ref([] as BusItem[])

    const globalStore = useGlobalStore();
    globalStore.title = 'menu.bus';

    const busStore = useBusArrivalStore();
    busStore.fetchArrivalList();
    setInterval(() => {
      busStore.fetchArrivalList();
    }, 60000);
    busStore.$subscribe((mutation, state) => {
      busArrivalList.value = state.arrivalList;
    })
    return {globalStore, busArrivalList};
  }
});
</script>
