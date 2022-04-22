<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          {{ this.$t(title) }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs dense>
        <q-route-tab icon="mdi-bus" to="/shuttle" :label="$t('menu.shuttle')" replace/>
        <q-route-tab icon="mdi-train" to="/subway" :label="$t('menu.subway')" replace/>
        <q-route-tab icon="mdi-bus-multiple" to="/bus" :label="$t('menu.bus')" replace/>
        <q-route-tab icon="mdi-silverware" to="/cafeteria" :label="$t('menu.cafeteria')" replace/>
        <q-route-tab icon="mdi-menu" to="/menu" :label="$t('menu.menu')" replace/>
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style scoped lang="scss">
.bg-primary {
  background: #f7f7f7;
}
</style>
<script lang="ts">
  import {useGlobalStore} from 'stores/global.store';
  import { ref } from 'vue';
  export default {
    setup() {
      let title = ref('')

      const globalStore = useGlobalStore();
      globalStore.$subscribe(() => {
        title.value = globalStore.title;
      });
      return {title};
    }
  }
</script>
