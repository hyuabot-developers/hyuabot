<template>
  <q-page class="row justify-start">
    <q-list bordered separator style="width: 100%; height: 288px; margin: 10px">
      <q-item clickable to="/library">
        <q-item-section avatar v-ripple>
          <q-icon style="color: var(--q-primary)" name="mdi-library" />
        </q-item-section>
        <q-item-section>{{ this.$t('menu.library') }}</q-item-section>
      </q-item>
      <q-item clickable to="/calendar">
        <q-item-section avatar v-ripple>
          <q-icon style="color: var(--q-primary)" name="mdi-calendar" />
        </q-item-section>
        <q-item-section>{{ this.$t('menu.calendar') }}</q-item-section>
      </q-item>
      <q-item clickable to="/contact">
        <q-item-section avatar v-ripple>
          <q-icon style="color: var(--q-primary)" name="mdi-account-box" />
        </q-item-section>
        <q-item-section>{{ this.$t('menu.contact') }}</q-item-section>
      </q-item>
      <q-item clickable @click="localeDialogOpened = true">
        <q-item-section avatar v-ripple>
          <q-icon style="color: var(--q-primary)" name="mdi-web" />
        </q-item-section>
        <q-item-section>{{ this.$t('menu.language') }}</q-item-section>
      </q-item>
      <q-item clickable @click="darkModeDialogOpened = true">
        <q-item-section avatar v-ripple>
          <q-icon style="color: var(--q-primary)" name="mdi-brightness-6" />
        </q-item-section>
        <q-item-section>{{ this.$t('menu.dark_mode') }}</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section avatar v-ripple>
          <q-icon style="color: var(--q-primary)" name="mdi-information" />
        </q-item-section>
        <q-item-section>{{ this.$t('menu.about') }}</q-item-section>
      </q-item>
    </q-list>
    <q-dialog v-model="darkModeDialogOpened">
      <q-card style="width: 500px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ this.$t('menu.dark_mode') }}</div>
        </q-card-section>

        <q-card-section class="q-pa-md" style="padding: 16px">
          <q-list separator>
            <q-item
              clickable
              @click="$q.dark.set(item.value === 'auto' ? 'auto' : item.value === 'true')"
              v-for="item in darkModeOptions">
                <q-item-section>
                  <div class="items-center">{{ item.label }}</div>
                </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="localeDialogOpened">
      <q-card style="width: 500px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ this.$t('menu.language') }}</div>
        </q-card-section>

        <q-card-section class="q-pa-md" style="padding: 16px">
          <q-list separator>
            <q-item
              clickable
              @click="locale = item.value"
              v-for="item in localeOptions">
              <q-item-section>
                <div class="items-center">{{ item.label }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<style>
q-radio {
  align-items: start;
}
</style>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useGlobalStore} from 'stores/global.store';
import {useQuasar} from 'quasar';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'MenuPage',
  setup () {
    const globalStore = useGlobalStore();
    globalStore.title = 'menu.menu';
    globalStore.isLoading = false;

    const $q = useQuasar();
    const darkModeDialogOpened = ref(false);
    const darkMode = ref($q.dark.mode);

    const $t = useI18n().t
    const darkModeOptions = [
      {
        label: $t('menu.dark.auto'),
        value: 'auto',
      },
      {
        label: $t('menu.dark.dark'),
        value: 'true',
      },
      {
        label: $t('menu.dark.light'),
        value: 'false',
      },
    ];

    const localeDialogOpened = ref(false);
    const { locale } = useI18n({useScope: 'global'});
    const localeOptions = [
      { value: 'ko-KR', label: '한국어' },
      { value: 'en-US', label: 'English' },
    ]
    return {
      darkModeOptions,
      darkMode,
      darkModeDialogOpened,
      localeOptions,
      locale,
      localeDialogOpened,
    }
  }
});
</script>
