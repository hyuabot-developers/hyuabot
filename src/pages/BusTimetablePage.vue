<template>
  <q-page class="justify-center">
    <q-tab-panels v-model="globalStore.busTabIndex" animated swipeable>
      <q-tab-panel name="weekdays">
        <q-list separator>
          <q-item
            v-for="item in busTimetable.weekdays"
            class="full-width">
            <q-item-section
              :style="{color: isTimePassed(item) ? 'var(--q-text-color)' : '#7F7F7F'}">
              {{ item.slice(0,5).replace(":", "시 ") }}분
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="saturday">
        <q-list separator>
          <q-item
            v-for="item in busTimetable.saturday"
            class="full-width">
            <q-item-section
              :style="{color: isTimePassed(item) ? 'var(--q-text-color)' : '#7F7F7F'}">
              {{ item.slice(0,5).replace(":", "시 ") }}분
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="sunday">
        <q-list separator>
          <q-item
v-for="item in busTimetable.sunday"
            class="full-width">
            <q-item-section
              :style="{color: isTimePassed(item) ? 'var(--q-text-color)' : '#7F7F7F'}">
              {{ item.slice(0,5).replace(":", "시 ") }}분
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import { useRoute } from 'vue-router'
import {useGlobalStore} from 'stores/global.store';
import {useBusTimetableStore} from 'stores/bus.timetable.store';
import {BusTimetableItem} from 'src/models/bus.item';

export default defineComponent({
  name: 'BusTimetablePage',
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
    globalStore.title = route.params.lineCode.toString();
    globalStore.busTabVisibility = true;
    const now = new Date();
    if(now.getDay() === 0) {
      globalStore.busTabIndex = 'sunday';
    } else if(now.getDay() === 6) {
      globalStore.busTabIndex = 'saturday';
    }

    const busTimetable = ref(<BusTimetableItem>{});
    const busTimetableStore = useBusTimetableStore()
    if(!busTimetableStore.hasLineTimeTable(route.params.lineCode.toString())) {
      busTimetableStore.fetchTimetable(route.params.lineCode.toString()).then(
        () => {
          busTimetable.value = busTimetableStore.getTimetable(route.params.lineCode.toString());
        }
      );
    } else {
      busTimetable.value = busTimetableStore.getTimetable(route.params.lineCode.toString());
    }
    return {
      globalStore,
      isTimePassed,
      route,
      busTimetable
    };
  },
  unmounted() {
    const globalStore = useGlobalStore();
    globalStore.busTabVisibility = false;
  }
});
</script>
