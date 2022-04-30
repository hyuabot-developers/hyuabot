<template>
  <q-page class="row items-center justify-evenly"></q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { useRoute } from 'vue-router'
import {useGlobalStore} from 'stores/global.store';
import {useShuttleTimetableStore} from 'stores/shuttle.timetable.store';

export default defineComponent({
  name: 'ShuttleTimetablePage',
  setup () {
    const globalStore = useGlobalStore();
    const route = useRoute();
    globalStore.title = `shuttle.timetable.${route.params.stopCode}.${route.params.heading}`;

    const shuttleTimetableStore = useShuttleTimetableStore();
    shuttleTimetableStore.fetchShuttleTimetableList();
  }
});
</script>
