<template>
  <q-page class="row items-center justify-evenly"></q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useGlobalStore} from 'stores/global.store';
import {useShuttleTimetableStore} from 'stores/shuttle.timetable.store';

export default defineComponent({
  name: 'ShuttleTimetablePage',
  setup () {
    const globalStore = useGlobalStore();
    globalStore.title = 'menu.shuttleTimetable';

    const shuttleTimetableStore = useShuttleTimetableStore();
    shuttleTimetableStore.fetchShuttleTimetableList();
  }
});
</script>
