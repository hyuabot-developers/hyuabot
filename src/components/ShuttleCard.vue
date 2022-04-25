<template>
  <q-card class="full-width">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{ this.$t(`shuttle.${shuttle.stopCode}`) }}</div>
    </q-card-section>
    <q-card-section
      style="padding-top: 0; padding-bottom: 0"
      v-on:click="isExpandedFirst = !isExpandedFirst">
      <div class="row">
        <div class="text-subtitle1 col-5 items-center">
          {{ this.$t(`shuttle.heading.${shuttleHeadingList[shuttle.stopCode][0]}`) }}
        </div>
        <div class="col-7">
          <q-list dense>
            <q-item v-for="(shuttleDepartureItem, shuttleIndex) in (hasDualDestination ? shuttle.busForStation : shuttle.busForTerminal).slice(0, Math.min(5, (hasDualDestination ? shuttle.busForStation : shuttle.busForTerminal).length))" v-show="shuttleIndex < 2 || isExpandedFirst">
              <div class="col-4 items-center" v-bind:style="{color: shuttleDepartureItem.type === 'C' ? '#0E4A84' : '#FF0000'}">
                {{ shuttleDepartureItem.type === "C" ? "순환" : "직행" }}
              </div>
              <div class="col-8 items-center">
                {{ shuttleDepartureItem.time.replace(":", "시 ") }}분
              </div>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-card-section>
    <q-btn flat class="full-width">{{ this.$t(`shuttle.more`) }}</q-btn>
    <q-separator v-if="hasDualDestination" />
    <q-card-section
      v-if="hasDualDestination"
      style="padding-top: 0; padding-bottom: 0"
      v-on:click="isExpandedSecond = !isExpandedSecond">
      <div class="row">
        <div class="text-subtitle1 col-5 items-center">{{ this.$t(`shuttle.heading.${shuttleHeadingList[shuttle.stopCode][1]}`) }}</div>
        <div class="col-7">
          <q-list dense>
            <q-item v-for="(shuttleDepartureItem, shuttleIndex) in shuttle.busForTerminal.slice(0, Math.min(5, shuttle.busForTerminal.length))" v-show="shuttleIndex < 2 || isExpandedSecond">
              <div class="col-4 items-center" v-bind:style="{color: shuttleDepartureItem.type === 'C' ? '#0E4A84' : '#FF0000'}">
                {{ shuttleDepartureItem.type === "C" ? "순환" : "직행" }}
              </div>
              <div class="col-8 items-center">
                {{ shuttleDepartureItem.time.replace(":", "시 ") }}분
              </div>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-card-section>
    <q-btn flat class="full-width" v-if="hasDualDestination">{{ this.$t(`shuttle.more`) }}</q-btn>
  </q-card>
</template>

<script>

import {ref} from 'vue';

export default {
  name: 'ShuttleCard',
  props: {
    shuttle: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const shuttleHeadingList = {
        Dormitory: ['Dormitory_Station', 'Dormitory_Terminal'],
        Shuttlecock_O: ['Station', 'Terminal'],
        Station: ['Campus', 'Terminal'],
        Terminal: ['Campus'],
        Shuttlecock_I: ['Shuttlecock_Dormitory'],
    }
    const hasDualDestination = shuttleHeadingList[props.shuttle.stopCode].length === 2
    const isExpandedFirst = ref(false)
    const isExpandedSecond = ref(false)

    return {
      hasDualDestination,
      shuttleHeadingList,
      isExpandedFirst,
      isExpandedSecond
    }
  }
}
</script>

<style scoped>
div .items-center {
  display: flex;
  justify-content: center;
}
</style>
