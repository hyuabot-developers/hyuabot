<template>
  <q-page class="column items-center justify-evenly" style="margin-left: 10px; margin-right: 10px; margin-top: 10px">
    <div v-show="globalStore.isLoading" class="loading-container">
      <q-spinner
        class="loading"
        color="secondary"
        size="3em"
      />
    </div>
    <ReadingRoomCard v-for="readingRoomItem in readingRoomList" :reading-room="readingRoomItem" style="margin-bottom: 10px"/>
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
    return {globalStore, readingRoomList, timer};
  },
  unmounted() {
    clearInterval(this.timer);
  }
});
</script>
<style scoped>
.loading-container {
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
