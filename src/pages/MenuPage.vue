<template>
  <q-page class="row items-center justify-evenly"></q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useGlobalStore} from 'stores/global.store';

export default defineComponent({
  name: 'MenuPage',
  setup () {
    const globalStore = useGlobalStore();
    globalStore.title = 'menu.menu';

  }
});
</script>
