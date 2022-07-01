<template>
  <q-page class="row justify-start">
    <q-list bordered separator style="width: 100%; height: 192px; margin: 10px">
      <q-item clickable to="/library">
        <q-item-section v-ripple avatar>
          <q-icon style="color: var(--q-primary)" name="mdi-library" />
        </q-item-section>
        <q-item-section>{{ $t('menu.library') }}</q-item-section>
      </q-item>
<!--      <q-item clickable to="/calendar">-->
<!--        <q-item-section avatar v-ripple>-->
<!--          <q-icon style="color: var(&#45;&#45;q-primary)" name="mdi-calendar" />-->
<!--        </q-item-section>-->
<!--        <q-item-section>{{ this.$t('menu.calendar') }}</q-item-section>-->
<!--      </q-item>-->
<!--      <q-item clickable to="/contact">-->
<!--        <q-item-section avatar v-ripple>-->
<!--          <q-icon style="color: var(&#45;&#45;q-primary)" name="mdi-account-box" />-->
<!--        </q-item-section>-->
<!--        <q-item-section>{{ this.$t('menu.contact') }}</q-item-section>-->
<!--      </q-item>-->
      <q-item clickable @click="localeDialogOpened = true">
        <q-item-section v-ripple avatar>
          <q-icon style="color: var(--q-primary)" name="mdi-web" />
        </q-item-section>
        <q-item-section>{{ $t('menu.language') }}</q-item-section>
      </q-item>
      <q-item clickable @click="darkModeDialogOpened = true">
        <q-item-section v-ripple avatar>
          <q-icon style="color: var(--q-primary)" name="mdi-brightness-6" />
        </q-item-section>
        <q-item-section>{{ $t('menu.dark_mode') }}</q-item-section>
      </q-item>
      <q-item clickable @click="infoDialogOpened = true">
        <q-item-section v-ripple avatar>
          <q-icon style="color: var(--q-primary)" name="mdi-information" />
        </q-item-section>
        <q-item-section>{{ $t('menu.about') }}</q-item-section>
      </q-item>
    </q-list>
    <q-dialog v-model="darkModeDialogOpened">
      <q-card style="width: 500px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ $t('menu.dark_mode') }}</div>
        </q-card-section>

        <q-card-section class="q-pa-md" style="padding: 16px">
          <q-list separator>
            <q-item
              v-for="item in darkModeOptions"
              clickable
              @click="setDarkMode(item.value)">
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
          <div class="text-h6">{{ $t('menu.language') }}</div>
        </q-card-section>

        <q-card-section class="q-pa-md" style="padding: 16px">
          <q-list separator>
            <q-item
              v-for="item in localeOptions"
              clickable
              @click="setLocale(item.value)">
              <q-item-section>
                <div class="items-center">{{ item.label }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="infoDialogOpened">
      <q-card style="width: 500px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ $t('menu.about') }}</div>
        </q-card-section>

        <q-card-section class="q-pa-md" style="padding: 16px">
          <q-list>
            <q-item>
              <q-item-section class="items-center">
                {{ $t('menu.developer') }}: 경원여객3102
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="items-center">
                {{ $t('menu.developer_belong') }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="items-center">
                {{ $t('menu.contact_email') }}: jil8885@hanyang.ac.kr
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
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
    function setDarkMode(value: string) {
      $q.dark.set(value === 'auto' ? 'auto' : value === 'true');
      localStorage.setItem('isDarkMode', $q.dark.isActive.toString());
      darkModeDialogOpened.value = !darkModeDialogOpened.value;
    }

    const localeDialogOpened = ref(false);
    const { locale } = useI18n({useScope: 'global'});
    const localeOptions = [
      { value: 'ko-KR', label: '한국어' },
      { value: 'en-US', label: 'English' },
    ]
    function setLocale(value: string) {
      locale.value = value;
      localStorage.setItem('locale', value);
      localeDialogOpened.value = !localeDialogOpened.value;
    }

    const infoDialogOpened = ref(false);
    return {
      darkModeOptions,
      darkMode,
      darkModeDialogOpened,
      setDarkMode,
      localeOptions,
      localeDialogOpened,
      setLocale,
      infoDialogOpened,
    }
  }
});
</script>
<style>
q-radio {
  align-items: start;
}
</style>
