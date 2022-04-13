<template>
  <v-card width="95vw" height="200">
    <v-container>
      <v-row
        no-gutters
        justify="center"
        style="height: 40px; font-size: 1.25em"
        v-bind:style="{ color: getLineColor(item['lineName']) }"
      >
        {{ item["lineName"] }}
      </v-row>
      <v-divider />
      <v-row no-gutters style="height: 75px" align="center" justify="center">
        <v-col cols="2" style="font-size: 1em">상행</v-col>
        <v-col cols="4">
          <li
            v-show="item['up'].length > 0"
            v-for="(realtimeItem, index) in item['up'].slice(
              0,
              Math.min(2, item['up'].length)
            )"
            :key="index"
            style="margin-bottom: 20px"
          >
            {{ realtimeItem["terminalStation"] }}행
            <br />
          </li>
        </v-col>
        <v-col cols="2">
          <li
            v-for="(realtimeItem, index) in item['up'].slice(
              0,
              Math.min(2, item['up'].length)
            )"
            :key="index"
            style="margin-bottom: 20px"
            v-bind:style="{
              color: getCurrentStationColor(realtimeItem['currentStation']),
            }"
          >
            {{ parseInt(realtimeItem["remainedTime"]) }}분<br />
          </li>
        </v-col>
        <v-col cols="4">
          <li
            v-for="(realtimeItem, index) in item['up'].slice(
              0,
              Math.min(2, item['up'].length)
            )"
            :key="index"
            style="margin-bottom: 20px"
          >
            {{ realtimeItem["currentStation"].replace("시간표", "") }}<br />
          </li>
        </v-col>
      </v-row>
      <v-divider />
      <v-row no-gutters style="height: 75px" align="center" justify="center">
        <v-col cols="2" style="font-size: 1em">하행</v-col>
        <v-col cols="4">
          <li
            v-show="item['down'].length > 0"
            v-for="(realtimeItem, index) in item['down'].slice(
              0,
              Math.min(2, item['down'].length)
            )"
            :key="index"
            style="margin-bottom: 20px"
          >
            {{ realtimeItem["terminalStation"].replace("신인천", "인천") }}행
            <br />
          </li>
        </v-col>
        <v-col cols="2">
          <li
            v-for="(realtimeItem, index) in item['down'].slice(
              0,
              Math.min(2, item['up'].length)
            )"
            :key="index"
            style="margin-bottom: 20px"
            v-bind:style="{
              color: getCurrentStationColor(realtimeItem['currentStation']),
            }"
          >
            {{ parseInt(realtimeItem["remainedTime"]) }}분<br />
          </li>
        </v-col>
        <v-col cols="4">
          <li
            v-for="(realtimeItem, index) in item['down'].slice(
              0,
              Math.min(2, item['down'].length)
            )"
            :key="index"
            style="margin-bottom: 20px"
            v-bind:style="{
              color: getCurrentStationColor(realtimeItem['currentStation']),
            }"
          >
            {{ realtimeItem["currentStation"].replace("시간표", "") }}<br />
          </li>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<style scoped>
v-container {
  display: flex;
  flex-direction: row;
  justify-content: start;
}
li {
  display: inline;
  list-style-type: none;
}
</style>
<script>
export default {
  name: "SubwayCard",
  methods: {
    getLineColor: function (lineName) {
      switch (lineName) {
        case "2호선":
          return "#00A84D";
        case "4호선":
          return "#00A4E3";
        case "수인분당선":
          return "#FABE00";
      }
    },
    getCurrentStationColor: function (currentStation) {
      return currentStation === "시간표" ? "#7f7f7f" : "#000000";
    },
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
