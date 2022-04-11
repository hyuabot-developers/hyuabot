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
        <v-col cols="5">
          <li
            v-show="item['realtime']['up'].length > 0"
            v-for="(realtimeItem, index) in item['realtime']['up'].slice(
              0,
              Math.min(2, item['realtime']['up'].length)
            )"
            :key="index"
            style="margin-bottom: 20px"
          >
            {{ realtimeItem["terminalStation"] }}행
            <br />
          </li>
        </v-col>
        <v-col cols="5">
          <li
            v-for="(realtimeItem, index) in item['realtime']['up'].slice(
              0,
              Math.min(2, item['realtime']['up'].length)
            )"
            :key="index"
            style="margin-bottom: 20px"
          >
            {{ parseInt(realtimeItem["remainedTime"]) }}분 ({{
              realtimeItem["currentStation"]
            }})
            <br />
          </li>
        </v-col>
      </v-row>
      <v-divider />
      <v-row no-gutters style="height: 75px" align="center" justify="center">
        <v-col cols="2" style="font-size: 1em">하행</v-col>
        <v-col cols="5">
          <li
            v-show="item['realtime']['down'].length > 0"
            v-for="(realtimeItem, index) in item['realtime']['down'].slice(
              0,
              Math.min(2, item['realtime']['down'].length)
            )"
            :key="index"
            style="margin-bottom: 20px"
          >
            {{ realtimeItem["terminalStation"] }}행
            <br />
          </li>
        </v-col>
        <v-col cols="5">
          <li
            v-for="(realtimeItem, index) in item['realtime']['down'].slice(
              0,
              Math.min(2, item['realtime']['down'].length)
            )"
            :key="index"
            style="margin-bottom: 20px"
          >
            {{ parseInt(realtimeItem["remainedTime"]) }}분 ({{
              realtimeItem["currentStation"]
            }})
            <br />
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
  },
  data() {},
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
