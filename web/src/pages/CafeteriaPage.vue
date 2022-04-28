<template>
  <q-page class="column items-center justify-evenly" style="margin-left: 10px; margin-right: 10px; margin-top: 10px">
    <CafeteriaCard v-for="cafeteriaItem in cafeteriaList" :cafeteriaItem="cafeteriaItem" style="margin-bottom: 10px"/>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import CafeteriaCard from 'components/CafeteriaCard.vue';
import {useGlobalStore} from 'stores/global.store';
import {useCafeteriaStore} from 'stores/cafeteria.store';
import {CafeteriaItem} from 'src/models/cafeteria.item';

export default defineComponent({
  name: 'CafeteriaPage',
  components: {CafeteriaCard},
  setup () {
    const cafeteriaList = ref([] as CafeteriaItem[])

    const globalStore = useGlobalStore();
    globalStore.title = 'menu.cafeteria';

    const cafeteriaStore = useCafeteriaStore();
    cafeteriaStore.fetchMenuList();
    cafeteriaStore.$subscribe((mutation, state) => {
      cafeteriaList.value = state.restaurantList;
    });
    return { globalStore, cafeteriaList }
  }
});
</script>
