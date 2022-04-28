<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          {{ this.$t(title) }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-tabs>
        <q-route-tab icon="mdi-bus" to="/shuttle" :label="$t('menu.shuttle')" replace/>
        <q-route-tab icon="mdi-train" to="/subway" :label="$t('menu.subway')" replace/>
        <q-route-tab icon="mdi-bus-multiple" to="/bus" :label="$t('menu.bus')" replace/>
        <q-route-tab icon="mdi-silverware" to="/cafeteria" :label="$t('menu.cafeteria')" replace/>
        <q-route-tab icon="mdi-menu" to="/menu" :label="$t('menu.menu')" replace/>
      </q-tabs>
    </q-footer>

    <q-page-container>
      <div v-if="globalStore.isLoading" class="loading-container">
        <q-spinner
          class="loading"
          color="secondary"
          size="3em"
        />
      </div>
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-fab
          v-model="fabOpened"
          vertical-actions-align="right"
          color="secondary"
          icon="mdi-chevron-up"
          active-icon="mdi-chevron-down"
          direction="up" >
          <q-fab-action label-position="right" color="secondary" @click="switchDarkMode" icon="mdi-brightness-6" label="Dark Mode" />
        </q-fab>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>
<style scoped lang="scss">
.bg-primary {
  background: #f7f7f7;
}

q-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
}
</style>
<script lang="ts">
  import {useGlobalStore} from 'stores/global.store';
  import { ref } from 'vue';
  import {useQuasar} from 'quasar';
  export default {
    setup() {
      const $q = useQuasar()

      let title = ref('')
      let fabOpened = ref(false)

      const globalStore = useGlobalStore();
      globalStore.$subscribe(() => {
        title.value = globalStore.title;
      });

      if(!localStorage.hasOwnProperty('isDarkMode')){
        $q.dark.set('auto')
      } else {
        $q.dark.set(localStorage.getItem('isDarkMode') === 'true')
      }

      function switchDarkMode(){
        $q.dark.toggle()
        localStorage.setItem('isDarkMode', $q.dark.isActive.toString())
      }
      return {globalStore, fabOpened, title, switchDarkMode};
    }
  }
</script>
