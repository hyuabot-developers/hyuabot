<template>
  <q-card class="full-width">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{ this.$t(`shuttle.${shuttle.stopCode}`) }}</div>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="text-h6 col-5 items-center">
          {{ this.$t(`shuttle.heading.${shuttleHeadingList[shuttle.stopCode][0]}`) }}
        </div>
        <div class="col-7">
          <q-list dense>
            <q-item v-for="shuttleDepartureItem in (hasDualDestination ? shuttle.busForStation : shuttle.busForTerminal).slice(0, Math.min(2, (hasDualDestination ? shuttle.busForStation : shuttle.busForTerminal).length))">
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
      <q-separator v-if="hasDualDestination" />
      <div class="row" v-if="hasDualDestination">
        <div class="text-h6 col-5 items-center">{{ this.$t(`shuttle.heading.${shuttleHeadingList[shuttle.stopCode][1]}`) }}</div>
        <div class="col-7">
          <q-list dense>
            <q-item v-for="shuttleDepartureItem in shuttle.busForTerminal.slice(0, Math.min(2, shuttle.busForTerminal.length))">
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
  </q-card>
</template>

<script>

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
    let hasDualDestination = shuttleHeadingList[props.shuttle.stopCode].length === 2
    return {
      hasDualDestination,
      shuttleHeadingList,
    }
  }
}
</script>

<style scoped>
q-card-section {
  padding-top: -16px;
}

div .items-center {
  display: flex;
  justify-content: center;
}
</style>
