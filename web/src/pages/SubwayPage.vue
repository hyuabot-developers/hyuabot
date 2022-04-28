<template>
  <q-page class="column items-center justify-evenly" style="margin-left: 10px; margin-right: 10px; margin-top: 10px">
    <SubwayCard v-for="subwayItem in subWayArrivalList" :subway="subwayItem" style="margin-bottom: 10px"/>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useGlobalStore} from 'stores/global.store';
import {useSubwayArrivalStore} from 'stores/subway.store';
import SubwayCard from 'components/SubwayCard.vue';

import {SubwayItem} from 'src/models/subway.item';

export default defineComponent({
  name: 'SubwayPage',
  components: {
    SubwayCard,
  },
  setup () {
    const subWayArrivalList = ref([] as SubwayItem[]);

    const globalStore = useGlobalStore();
    globalStore.title = 'menu.subway';

    const subwayStore = useSubwayArrivalStore();
    subwayStore.fetchSubwayArrivalList('erica');
    const timer = setInterval(() => {
      subwayStore.fetchSubwayArrivalList('erica');
    }, 60000);
    subwayStore.$subscribe((mutation, state) => {
      subWayArrivalList.value = state.arrivalList;
    });

    return {
      globalStore,
      subWayArrivalList,
      timer
    };
  },
  unmounted() {
    clearInterval(this.timer);
  }
});
</script>
