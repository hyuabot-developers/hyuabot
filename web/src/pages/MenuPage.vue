<template>
  <q-page class="row justify-start">
    <q-list bordered separator style="width: 100%; height: 240px; margin: 10px">
      <q-item clickable>
        <q-item-section avatar v-ripple>
          <q-icon color="primary" name="mdi-library" />
        </q-item-section>
        <q-item-section>열람실 좌석 정보</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section avatar v-ripple>
          <q-icon color="primary" name="mdi-calendar" />
        </q-item-section>
        <q-item-section>학사력</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section avatar v-ripple>
          <q-icon color="primary" name="mdi-map" />
        </q-item-section>
        <q-item-section>캠퍼스 지도</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section avatar v-ripple>
          <q-icon color="primary" name="mdi-account-box" />
        </q-item-section>
        <q-item-section>전화부</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section avatar v-ripple>
          <q-icon color="primary" name="mdi-cog" />
        </q-item-section>
        <q-item-section>설정</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useGlobalStore} from 'stores/global.store';

export default defineComponent({
  name: 'MenuPage',
  setup () {
    const globalStore = useGlobalStore();
    globalStore.title = 'menu.menu';

    globalStore.isLoading = false;
  }
});
</script>
