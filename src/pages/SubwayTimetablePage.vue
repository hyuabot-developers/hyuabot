<template>
  <q-page class="justify-center">
    <q-tab-panels v-model="globalStore.subwayTabIndex" animated swipeable>
      <q-tab-panel name="up">
        <q-list separator tabindex="upIndex">
          <q-item clickable class="full-width" v-for="item in subwayArrivalData.timetable.up">
            <q-item-section
              v-bind:style="{color: lineColor}">
              {{ item.terminalStation }}
            </q-item-section>
            <q-item-section
              v-bind:style="{color: isTimePassed(item.departureTime) ? 'var(--q-text-color)' : '#7F7F7F'}">
              {{ item.departureTime.slice(0,5).replace(":", "시 ") }}분
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="down">
        <q-list separator tabindex="downIndex">
          <q-item clickable class="full-width" v-for="item in subwayArrivalData.timetable.down">
            <q-item-section
              v-bind:style="{color: lineColor}">
              {{ item.terminalStation.replace("신인천", "인천") }}
            </q-item-section>
            <q-item-section
              v-bind:style="{color: isTimePassed(item.departureTime) ? 'var(--q-text-color)' : '#7F7F7F'}">
              {{ item.departureTime.slice(0,5).replace(":", "시 ") }}분
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
import {useSubwayArrivalStore} from 'stores/subway.store';

export default defineComponent({
  name: 'SubwayTimetablePage',
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
    globalStore.title = `subway.timetable.${route.params.lineCode}`;
    globalStore.subwayTabVisibility = true;
    globalStore.subwayTabIndex = 'up';
    const lineColor = route.params.lineCode === '1004' ? '#00A4E3' : '#FABE00';

    const subwayStore = useSubwayArrivalStore();
    const lineCodeDict: { [key: string]: string } = {'1004': '4호선', '1075': '수인분당선'};
    const subwayArrivalData = subwayStore.getArrivalList(lineCodeDict[route.params.lineCode.toString()])[0];
    return {
      globalStore,
      isTimePassed,
      lineColor,
      route,
      subwayArrivalData
    };
  },
  unmounted() {
    const globalStore = useGlobalStore();
    globalStore.subwayTabVisibility = false;
  }
});
</script>
