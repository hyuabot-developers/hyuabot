<template>
  <q-page class="column items-center justify-evenly" style="margin-left: 10px; margin-right: 10px; margin-top: 10px">
    <ReadingRoomCard v-for="readingRoomItem in readingRoomList" :readingRoom="readingRoomItem" style="margin-bottom: 10px"/>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useGlobalStore} from 'stores/global.store';
import ReadingRoomCard from 'components/ReadingRoomCard.vue'
import {ReadingRoomItem} from 'src/models/readingRoom.item';
import {useReadingRoomStore} from 'stores/readingRoom.store';

export default defineComponent({
  name: 'ReadingRoomPage',
  components: {ReadingRoomCard},
  setup () {
    const readingRoomList = ref([] as ReadingRoomItem[])

    const globalStore = useGlobalStore();
    globalStore.title = 'menu.library';

    const readingRoomStore = useReadingRoomStore();
    readingRoomStore.fetchReadingRoomList('erica');
    const timer = setInterval(() => {
      readingRoomStore.fetchReadingRoomList('erica');
    }, 60000);
    readingRoomStore.$subscribe((mutation, state) => {
      readingRoomList.value = state.readingRoomList;
    })
    return {readingRoomList, timer};
  },
  unmounted() {
    clearInterval(this.timer);
  }
});
</script>
