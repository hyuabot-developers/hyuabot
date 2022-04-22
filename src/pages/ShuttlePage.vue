<template>
  <q-page class="column items-center justify-evenly" style="margin-left: 10px; margin-right: 10px">
    <ShuttleCard v-for="shuttleItem in shuttleArrivalList" :shuttle="shuttleItem"/>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useShuttleArrivalStore} from 'stores/shuttle.store';
import {useGlobalStore} from 'stores/global.store';
import ShuttleCard from 'components/ShuttleCard.vue';
import {ShuttleStopItem} from 'src/models/shuttle.item';

export default defineComponent({
  name: 'ShuttlePage',
  components: {ShuttleCard},
  setup () {
    const shuttleArrivalList = ref([] as ShuttleStopItem[])

    const globalStore = useGlobalStore();
    globalStore.title = 'menu.shuttle';

    const shuttleStore = useShuttleArrivalStore();
    shuttleStore.fetchShuttleArrivalList();
    setInterval(() => {
      shuttleStore.fetchShuttleArrivalList();
    }, 60000);
    shuttleStore.$subscribe((mutation, state) => {
      shuttleArrivalList.value = state.arrivalList;
    });
    return {shuttleArrivalList};
  }
});
</script>
