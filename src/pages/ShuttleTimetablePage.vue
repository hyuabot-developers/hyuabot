<template>
  <q-page class="justify-center">
    <q-tab-panels v-model="globalStore.shuttleTabIndex" animated swipeable>
      <q-tab-panel name="weekdays">
        <q-list separator tabindex="weekdaysIndex">
          <ShuttleTimetableListItem v-for="(item, index) in weekdaysTimetable" :key="index" :item="item" :shuttle-stop="route.params.stopCode.toString()" />
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="weekends">
        <q-list separator tabindex="weekendsIndex">
          <ShuttleTimetableListItem v-for="(item, index) in weekendsTimetable" :key="index" :item="item" :shuttle-stop="route.params.stopCode.toString()"/>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import { useRoute } from 'vue-router'
import {useGlobalStore} from 'stores/global.store';
import {useShuttleTimetableStore} from 'stores/shuttle.timetable.store';
import ShuttleTimetableListItem from 'components/ShuttleTimetableItem.vue';

export default defineComponent({
  name: 'ShuttleTimetablePage',
  components: {
    ShuttleTimetableListItem,
  },
  setup () {
    const globalStore = useGlobalStore();
    const route = useRoute();
    globalStore.title = `shuttle.timetable.${route.params.stopCode}.${route.params.heading}`;
    globalStore.shuttleTabVisibility = true;
    const now = new Date();
    globalStore.shuttleTabIndex = now.getDay() === 0 || now.getDay() === 6 ? 'weekends' : 'weekdays';

    const shuttleTimetableStore = useShuttleTimetableStore();
    const weekdaysTimetable = ref()
    const weekendsTimetable = ref()
    shuttleTimetableStore.fetchShuttleTimetableList().then(() => {
      weekdaysTimetable.value = route.params.heading === 'busForStation' ?
        shuttleTimetableStore.getArrivalList(route.params.stopCode.toString()).weekdays.busForStation :
        shuttleTimetableStore.getArrivalList(route.params.stopCode.toString()).weekdays.busForTerminal;
      weekendsTimetable.value = route.params.heading === 'busForStation' ?
        shuttleTimetableStore.getArrivalList(route.params.stopCode.toString()).weekends.busForStation :
        shuttleTimetableStore.getArrivalList(route.params.stopCode.toString()).weekends.busForTerminal
    });

    return {
      globalStore,
      shuttleTimetableStore,
      route,
      weekdaysTimetable,
      weekendsTimetable
    };
  },
  unmounted () {
    const globalStore = useGlobalStore();
    globalStore.shuttleTabVisibility = false;
  }
});
</script>
