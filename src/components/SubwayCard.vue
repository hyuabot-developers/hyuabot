<template>
  <q-card class="full-width">
    <q-card-section class="text-white" style="padding: 10px" v-bind:style="{ background: lineColor }">
      <div class="text-h6">{{ subway.lineName }}</div>
    </q-card-section>
    <q-card-section style="padding-top: 0; padding-bottom: 0">
      <q-list>
        <q-item v-for="subwayDepartureItem in arrivalUpData.slice(0, Math.min(2, arrivalUpData.length))">
          <div class="col-4 items-center" v-bind:style="{ color: lineColor }">
            {{ subwayDepartureItem.terminalStation }} 행
          </div>
          <div class="col-4 items-center" v-if="subwayDepartureItem.currentStation !== null">
            {{ subwayDepartureItem.currentStation }}
          </div>
          <div class="col-4 items-center" style="color: grey" v-else>
            시간표*
          </div>
          <div class="col-4 items-center">
            {{ parseInt(subwayDepartureItem.remainedTime) }}분
          </div>
        </q-item>
      </q-list>
    </q-card-section>
    <q-separator />
    <q-card-section style="padding-top: 0; padding-bottom: 0">
      <q-list>
        <q-item v-for="subwayDepartureItem in arrivalDownData
          .filter(item => item.terminalStation !== '오이도' || item.remainedTime > 0)
          .slice(0, Math.min(2, arrivalDownData.length))">
          <div class="col-4 items-center" v-bind:style="{ color: lineColor }">
            {{ subwayDepartureItem.terminalStation.replace("신인천", "인천") }} 행
          </div>
          <div class="col-4 items-center" v-if="subwayDepartureItem.currentStation !== null">
            {{ subwayDepartureItem.currentStation }}
          </div>
          <div class="col-4 items-center" style="color: grey" v-else>
            시간표*
          </div>
          <div class="col-4 items-center">
            {{ parseInt(subwayDepartureItem.remainedTime) }}분
          </div>
        </q-item>
      </q-list>
    </q-card-section>
    <q-separator />
    <q-btn
      flat
      :to="{ path: `/subway/timetable/${lineCode}` }"
      class="full-width" >
      {{ this.$t(`subway.more`) }}
    </q-btn>
  </q-card>
</template>

<script>

import {ref} from 'vue';

export default {
  name: 'SubwayCard',
  props: {
    subway: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const lineColor = props.subway.lineName === '4호선' ? '#00A4E3' : '#FABE00';
    const arrivalUpData = ref([]);
    const arrivalDownData = ref([]);
    let lineCode = -1;
    switch (props.subway.lineName){
      case '4호선':
        lineCode = 1004;
        break;
      case '수인분당선':
        lineCode = 1075;
        break;
    }

    props.subway.realtime.up.forEach(item => {
      arrivalUpData.value.push({
        terminalStation: item.terminalStation,
        currentStation: item.currentStation,
        remainedTime: item.remainedTime,
        statusCode: item.statusCode,
      });
    });

    props.subway.realtime.down.forEach(item => {
      arrivalDownData.value.push({
        terminalStation: item.terminalStation,
        currentStation: item.currentStation,
        remainedTime: item.remainedTime,
        statusCode: item.statusCode,
      });
    });

    const now = new Date();
    props.subway.timetable.up.forEach(item => {
      const target = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(item.departureTime.split(':')[0]),
        parseInt(item.departureTime.split(':')[1])
      );
      const lastItemRemainedTime = arrivalUpData.value.length > 0 ? arrivalUpData.value[arrivalUpData.value.length - 1].remainedTime : -1;
      if(target > now && Math.floor((target - now) / 1000 / 60) > lastItemRemainedTime) {
        arrivalUpData.value.push({
          terminalStation: item.terminalStation,
          currentStation: null,
          remainedTime: Math.floor((target - now) / 1000 / 60),
          statusCode: -1,
        });
      }
    });

    props.subway.timetable.down.forEach(item => {
      const target = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(item.departureTime.split(':')[0]),
        parseInt(item.departureTime.split(':')[1])
      );
      const lastItemRemainedTime = arrivalDownData.value.length > 0 ? arrivalDownData.value[arrivalDownData.value.length - 1].remainedTime : -1;
      if(target > now && Math.floor((target - now) / 1000 / 60) > lastItemRemainedTime) {
        arrivalDownData.value.push({
          terminalStation: item.terminalStation,
          currentStation: null,
          remainedTime: Math.floor((target - now) / 1000 / 60),
          statusCode: -1,
        });
      }
    });

    return {lineCode, lineColor, arrivalUpData, arrivalDownData};
  }
}
</script>

<style scoped>
div .items-center {
  display: flex;
  justify-content: center;
}
</style>
