<template>
  <q-card class="full-width" @click="isExpanded = !isExpanded">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{ cafeteriaItem.name }}</div>
    </q-card-section>
    <q-card-section
      v-for="(menuItems, menuKey) in cafeteriaItem.menuList" v-show="isExpanded || menuKey.includes(defaultKey)" :key="menuKey"
      style="padding-top: 5px; padding-bottom: 0">
      <div class="text-h6" style="margin-bottom: 10px">{{ menuKey }}</div>
      <q-list dense>
        <template  v-for="(menu, menuIndex) in menuItems">
          <q-item>
            <div class="column col-12">
              <div style="margin-bottom: 10px">{{ menu.menu }}</div>
              <div>₩ {{ menu.price }}</div>
            </div>
          </q-item>
          <q-separator v-if="menuIndex !== menuItems.length - 1" style="margin-top: 5px; margin-bottom: 5px" />
        </template>
      </q-list>
      <q-separator v-if="menuKey !== Object.keys(cafeteriaItem.menuList).at(Object.keys(cafeteriaItem.menuList).length - 1) && isExpanded" />
    </q-card-section>
    <q-card-section
      v-if="Object.keys(cafeteriaItem.menuList).length === 0">
      {{ $t('cafeteria.out_of_order') }}
    </q-card-section>
  </q-card>
</template>

<script>

import {ref} from 'vue';

export default {
  name: 'CafeteriaCard',
  props: {
    cafeteriaItem: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const isExpanded = ref(false)
    let defaultKey = '중식'
    const now = new Date()
    if(now.getHours() < 10){
      for(let key in props.cafeteriaItem.menuList){
        if(key.includes('조식')){
          defaultKey = '조식'
          break
        }
      }
    } else if(now.getHours() >= 15) {
      for(let key in props.cafeteriaItem.menuList){
        if(key.includes('석식')){
          defaultKey = '석식'
          break
        }
      }
    }
    return { defaultKey, isExpanded }
  }
}
</script>

<style scoped>
div .items-center {
  display: flex;
  justify-content: center;
}
</style>
