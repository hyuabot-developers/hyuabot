<template>
  <v-layout column align-center>
    <v-flex>
      <SubwayCard
        v-for="(subwayArrivalItem, index) in this.$store.state.subwayData"
        :key="index"
        :item="subwayArrivalItem"
        style="margin-top: 10px"
      />
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import SubwayCard from "@/components/SubwayCard";

export default {
  name: "SubwayPage",
  components: { SubwayCard },
  data() {
    return {
      message: "Hello from the about page!",
      timer: "",
    };
  },
  methods: {
    async getSubwayList() {
      const url = "/api/v1/subway/arrival/erica";
      const res = await axios.get(url, {
        baseURL: "https://api.hyuabot.app",
      });
      if (res.status === 200) {
        let subwayData = [];
        res.data["departureList"].map((item) => {
          let updateTime = new Date(item["updateTime"]);
          let now = new Date();
          let updateBefore =
            (now.getTime() - updateTime.getTime()) / (1000 * 60);
          let subwayDataByLine = {
            lineName: item["lineName"],
            up: [],
            down: [],
          };
          item["realtime"]["up"].map((realtimeItem) => {
            if (realtimeItem["remainedTime"] - updateBefore > 0) {
              subwayDataByLine.up.push({
                terminalStation: realtimeItem["terminalStation"],
                currentStation: realtimeItem["currentStation"],
                remainedTime: realtimeItem["remainedTime"] - updateBefore,
              });
            }
          });
          let previousItemTime = -1;
          if (subwayDataByLine.up.length > 0) {
            previousItemTime =
              subwayDataByLine.up[subwayDataByLine.up.length - 1].remainedTime;
          }
          item["timetable"]["up"].map((timetableItem) => {
            let time = new Date(
              `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${
                timetableItem["departureTime"]
              }`
            );
            let remainedTime =
              (time.getTime() - new Date().getTime()) / (1000 * 60);
            if (remainedTime > previousItemTime + 3) {
              subwayDataByLine.up.push({
                terminalStation: timetableItem["terminalStation"],
                currentStation: "시간표",
                remainedTime: remainedTime,
              });
            }
          });
          item["realtime"]["down"].map((realtimeItem) => {
            if (realtimeItem["remainedTime"] - updateBefore > 0) {
              subwayDataByLine.down.push({
                terminalStation: realtimeItem["terminalStation"],
                currentStation: realtimeItem["currentStation"],
                remainedTime: realtimeItem["remainedTime"] - updateBefore,
              });
            }
          });
          previousItemTime = -1;
          if (subwayDataByLine.down.length > 0) {
            previousItemTime =
              subwayDataByLine.down[subwayDataByLine.down.length - 1]
                .remainedTime;
          }
          item["timetable"]["down"].map((timetableItem) => {
            let time = new Date(
              `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${
                timetableItem["departureTime"]
              }`
            );
            let remainedTime =
              (time.getTime() - new Date().getTime()) / (1000 * 60);
            if (remainedTime > previousItemTime + 3) {
              subwayDataByLine.down.push({
                terminalStation: timetableItem["terminalStation"],
                currentStation: "시간표",
                remainedTime: remainedTime,
              });
            }
          });
          subwayData.push(subwayDataByLine);
        });
        this.$store.state.subwayData = subwayData;
      } else {
        this.$store.state.subwayData = [];
      }
    },
    cancelAutoRefresh() {
      clearInterval(this.timer);
    },
  },
  created() {
    this.getSubwayList();
    this.timer = setInterval(this.getSubwayList, 60000);
    this.$store.commit("setAppTitle", "전철");
  },
  destroyed() {
    this.cancelAutoRefresh();
  },
};
</script>
