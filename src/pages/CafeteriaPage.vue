<template>
  <q-page class="row items-center justify-evenly"></q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useGlobalStore} from 'stores/global.store';
import {useCafeteriaStore} from 'stores/cafeteria.store';

export default defineComponent({
  name: 'CafeteriaPage',
  setup () {
    const globalStore = useGlobalStore();
    globalStore.title = 'menu.cafeteria';

    const cafeteriaStore = useCafeteriaStore();
    cafeteriaStore.fetchMenuList();
  }
});
</script>
