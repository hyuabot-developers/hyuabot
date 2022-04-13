<template>
  <v-card width="95vw" height="125">
    <v-container>
      <v-row
        no-gutters
        justify="center"
        style="height: 40px; font-size: 1.25em"
        v-bind:style="{ color: getLineColor(item.lineName) }"
      >
        {{ item.lineName }}
      </v-row>
      <v-divider />
      <v-row no-gutters style="height: 75px" align="center" justify="center">
        <v-col cols="4">
          <li
            v-for="(realtimeItem, index) in item.arrivalList.slice(
              0,
              Math.min(2, item.arrivalList.length)
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
            v-for="(realtimeItem, index) in item.arrivalList.slice(
              0,
              Math.min(2, item.arrivalList.length)
            )"
            :key="index"
            style="margin-bottom: 20px"
          >
            {{
              realtimeItem.location > 0
                ? `${realtimeItem["location"]} 전`
                : "출발지 대기중"
            }}<br />
          </li>
        </v-col>
        <v-col cols="4">
          <li
            v-for="(realtimeItem, index) in item.arrivalList.slice(
              0,
              Math.min(2, item.arrivalList.length)
            )"
            :key="index"
            style="margin-bottom: 20px"
          >
            {{
              realtimeItem.remainedSeat > 0
                ? `${realtimeItem["remainedSeat"]} 석`
                : ""
            }}<br />
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
      console.log(lineName);
      switch (lineName) {
        case "10-1":
          return "#33CC99";
        default:
          return "#eE0012";
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
