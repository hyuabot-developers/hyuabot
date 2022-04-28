<template>
  <component :is="'script'" v-bind:src="mapURL"></component>
  <q-page class="column items-center justify-evenly" style="margin-left: 10px; margin-right: 10px; margin-top: 10px">
    <div id="map" class="fit" />
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'MapPage',
  components: {},
  setup () {
    const mapURL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.VUE_MAP_CLIENT_ID}`
    return {mapURL};
  },
});
</script>
