<template>
  <q-page class="row items-center justify-evenly"></q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useGlobalStore} from 'stores/global.store';
import {useSubwayArrivalStore} from 'stores/subway.store';

export default defineComponent({
  name: 'SubwayPage',
  setup () {
    const globalStore = useGlobalStore();
    globalStore.title = 'menu.subway';

    const subwayStore = useSubwayArrivalStore();
    subwayStore.fetchSubwayArrivalList('erica');
    setInterval(() => {
      subwayStore.fetchSubwayArrivalList('erica');
    }, 60000);
  }
});
</script>
