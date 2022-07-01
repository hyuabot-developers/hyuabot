<template>
  <q-page class="column items-center justify-start" style="margin-left: 10px; margin-right: 10px; margin-top: 10px">
    <div v-show="globalStore.isLoading" class="loading-container">
      <q-spinner
        class="loading"
        color="secondary"
        size="3em"
      />
    </div>
    <ShuttleCard v-for="shuttleItem in shuttleArrivalList" :shuttle="shuttleItem" style="margin-bottom: 10px"/>
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
    const timer = setInterval(() => {
      shuttleStore.fetchShuttleArrivalList();
    }, 60000);
    shuttleStore.$subscribe((mutation, state) => {
      shuttleArrivalList.value = state.arrivalList;
    });
    return {globalStore, shuttleArrivalList, timer};
  },
  unmounted() {
    clearInterval(this.timer);
  }
});
</script>
<style scoped>
.loading-container {
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
