<template>
  <q-card class="full-width">
    <q-card-section class="text-white" style="padding: 10px" v-bind:style="{ background: lineColor }">
      <div class="text-h6">{{ bus.name }}</div>
    </q-card-section>
    <q-card-section style="padding-top: 0; padding-bottom: 0">
      <div class="row">
        <div class="text-subtitle1 col-4 items-center">
          {{ this.$t(`bus.${bus.name}.terminalStop`) }}
        </div>
        <div class="col-8">
          <q-list dense>
            <q-item v-for="busDepartureItem in arrivalData.slice(0, Math.min(3, arrivalData.length))"
              class="no-padding">
              <div class="col-6 items-center" style="color: var(--q-secondary)" v-if="parseInt(busDepartureItem.location) >= 0">
                {{ busDepartureItem.location }} 전
              </div>
              <div class="col-6 items-center" style="color: #FF0000" v-else>
                {{ this.$t('bus.waitingStartStop') }}
              </div>
              <div class="col-6 items-center">
                {{ busDepartureItem.remainedTime }}분 {{ getSeatCount(busDepartureItem)}}
              </div>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-btn
      flat
      class="full-width" >
      {{ this.$t(`shuttle.more`) }}
    </q-btn>
  </q-card>
</template>

<script>

import {ref} from 'vue';

export default {
  name: 'BusCard',
  props: {
    bus: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const lineColor = props.bus.name === '10-1' ? '#33CC99' : '#eE0012';
    const arrivalData = ref([]);
    props.bus.realtime.forEach(item => {
      arrivalData.value.push({
        location: item.location,
        remainedTime: item.remainedTime,
        remainedSeat: item.remainedSeat,
      });
    });

    function getSeatCount(item) {
      if (item.remainedSeat >= 0) {
        return `(${item.remainedSeat}석)`;
      } else {
        return '';
      }
    }
    const now = new Date();
    if(now.getDay() === 0) {
      props.bus.timetable.sunday.forEach(item => {
        const target = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          parseInt(item.split(':')[0]),
          parseInt(item.split(':')[1])
        );
        if(target > now) {
          arrivalData.value.push({
            location: -1,
            remainedTime: Math.floor((target - now) / 1000 / 60) + parseInt(props.bus.timeFromStartStop),
            remainedSeat: -1,
          });
        }
      });
    } else if(now.getDay() === 6){
      props.bus.timetable.saturday.forEach(item => {
        const target = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          parseInt(item.split(':')[0]),
          parseInt(item.split(':')[1])
        );
        if(target > now) {
          arrivalData.value.push({
            location: -1,
            remainedTime: Math.floor((target - now) / 1000 / 60) + parseInt(props.bus.timeFromStartStop),
            remainedSeat: -1,
          });
        }
      });
    } else {
      props.bus.timetable.weekdays.forEach(item => {
        const target = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          parseInt(item.split(':')[0]),
          parseInt(item.split(':')[1])
        );
        if(target > now) {
          arrivalData.value.push({
            location: -1,
            remainedTime: Math.floor((target - now) / 1000 / 60) + parseInt(props.bus.timeFromStartStop),
            remainedSeat: -1,
          });
        }
      });
    }
    console.log(arrivalData.value);
    return {getSeatCount, lineColor, arrivalData};
  }
}
</script>

<style scoped>
div .items-center {
  display: flex;
  justify-content: center;
}
</style>
