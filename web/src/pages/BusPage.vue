<template>
  <q-page class="row items-center justify-evenly"></q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useGlobalStore} from 'stores/global.store';
import {useBusArrivalStore} from 'stores/bus.store';

export default defineComponent({
  name: 'BusPage',
  setup () {
    const globalStore = useGlobalStore();
    globalStore.title = 'menu.bus';

    const busStore = useBusArrivalStore();
    busStore.fetchArrivalList();
    setInterval(() => {
      busStore.fetchArrivalList();
    }, 60000);
  }
});
</script>
