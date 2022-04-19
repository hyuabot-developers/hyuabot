<template>
  <q-page class="row items-center justify-evenly"></q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useShuttleArrivalStore} from 'stores/shuttle.store';
import {useGlobalStore} from 'stores/global.store';

export default defineComponent({
  name: 'ShuttlePage',
  setup () {
    const globalStore = useGlobalStore();
    globalStore.title = 'menu.shuttle';

    const shuttleStore = useShuttleArrivalStore();
    shuttleStore.fetchShuttleArrivalList();
    setInterval(() => {
      shuttleStore.fetchShuttleArrivalList();
    }, 60000);
  }
});
</script>
