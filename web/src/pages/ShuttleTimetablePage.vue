<template>
  <q-page class="justify-center">
    <q-tabs v-model="tabIndex" class="bg-primary text-white full-width" align="justify">
      <q-tab name="weekdays" v-bind:label="$t('shuttle.timetable.weekdays')" />
      <q-tab name="weekends" v-bind:label="$t('shuttle.timetable.weekends')" />
    </q-tabs>
    <q-tab-panels v-model="tabIndex" animated>
      <q-tab-panel name="weekdays">
        <q-list separator tabindex="weekdaysIndex">
          <ShuttleTimetableItem v-for="(item, index) in weekdaysTimetable" :key="index" :item="item" :shuttle-stop="route.params.stopCode.toString()" />
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="weekends">
        <q-list separator tabindex="weekendsIndex">
          <ShuttleTimetableItem v-for="(item, index) in weekendsTimetable" :key="index" :item="item" :shuttle-stop="route.params.stopCode.toString()"/>
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
import ShuttleTimetableItem from 'components/ShuttleTimetableItem.vue';

export default defineComponent({
  name: 'ShuttleTimetablePage',
  components: {
    ShuttleTimetableItem,
  },
  setup () {
    function isTimePassed(time: string) {
      const now = new Date();
      const target = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(time.split(':')[0]),
        parseInt(time.split(':')[1])
      );
      return now < target;
    }

    const globalStore = useGlobalStore();
    const route = useRoute();
    globalStore.title = `shuttle.timetable.${route.params.stopCode}.${route.params.heading}`;
    const now = new Date();
    const tabIndex = ref(now.getDay() === 0 || now.getDay() === 6 ? 'weekends' : 'weekdays');

    const shuttleTimetableStore = useShuttleTimetableStore();
    const weekdaysTimetable = ref()
    const weekendsTimetable = ref()
    const weekdaysIndex = ref(0);
    const weekendsIndex = ref(0);
    shuttleTimetableStore.fetchShuttleTimetableList().then(() => {
      weekdaysTimetable.value = route.params.heading === 'busForStation' ?
        shuttleTimetableStore.getArrivalList(route.params.stopCode.toString()).weekdays.busForStation :
        shuttleTimetableStore.getArrivalList(route.params.stopCode.toString()).weekdays.busForTerminal;
      weekendsTimetable.value = route.params.heading === 'busForStation' ?
        shuttleTimetableStore.getArrivalList(route.params.stopCode.toString()).weekends.busForStation :
        shuttleTimetableStore.getArrivalList(route.params.stopCode.toString()).weekends.busForTerminal
      for(let i = 0; i < weekdaysTimetable.value.length; i++) {
        if(isTimePassed(weekdaysTimetable.value[i].time)) {
          weekdaysIndex.value = i;
          break;
        }
      }
      for(let i = 0; i < weekendsTimetable.value.length; i++) {
        if(isTimePassed(weekendsTimetable.value[i].time)) {
          weekendsIndex.value = i;
          break;
        }
      }

    });

    return {
      shuttleTimetableStore,
      tabIndex,
      route,
      weekdaysIndex,
      weekendsIndex,
      weekdaysTimetable,
      weekendsTimetable
    };
  }
});
</script>
