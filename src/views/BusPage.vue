<template>
  <v-layout column align-center>
    <v-flex>
      <BusCard
        v-for="(busArrivalItem, index) in this.$store.state.busData"
        :key="index"
        :item="busArrivalItem"
        style="margin-top: 10px"
      />
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import BusCard from "@/components/BusCard";

export default {
  name: "BusPage",
  components: { BusCard },
  data() {
    return {
      message: "Hello from the about page!",
      timer: "",
    };
  },
  methods: {
    async getBusList() {
      const url = "/api/v1/bus/arrival";
      const res = await axios.get(url, {
        baseURL: "https://api.hyuabot.app",
      });
      if (res.status === 200) {
        let busData = [];
        res.data["departureInfoList"].map((item) => {
          let now = new Date();
          let current_key =
            now.getDay() === 0 || now.getDay() === 6 ? "weekends" : "weekdays";
          let busDataByLine = {
            lineName: item["name"],
            startStop: item["startStop"],
            terminalStop: item["terminalStop"],
            busStopName: item["busStop"],
            arrivalList: [],
          };
          item["realtime"].map((realtimeItem) => {
            busDataByLine.arrivalList.push({
              location: realtimeItem["location"],
              lowPlate: realtimeItem["lowPlate"],
              remainedTime: realtimeItem["remainedTime"],
              remainedSeat: realtimeItem["remainedSeat"],
            });
          });
          item["timetable"][current_key].map((timetableItem) => {
            let time = new Date(
              `${now.getFullYear()}-${
                now.getMonth() + 1
              }-${now.getDate()} ${timetableItem}`
            );
            let remainedTimeMinute =
              (time.getTime() - now.getTime()) / (1000 * 60);
            if (remainedTimeMinute > 0) {
              busDataByLine.arrivalList.push({
                location: -1,
                lowPlate: 0,
                remainedTime: remainedTimeMinute,
                remainedSeat: -1,
              });
            }
          });
          busData.push(busDataByLine);
        });
        this.$store.state.busData = busData;
        console.log(busData);
      } else {
        this.$store.state.busData = [];
      }
    },
    cancelAutoRefresh() {
      clearInterval(this.timer);
    },
  },
  created() {
    this.getBusList();
    this.timer = setInterval(this.getBusList, 60000);
    this.$store.commit("setAppTitle", "버스");
  },
  destroyed() {
    this.cancelAutoRefresh();
  },
};
</script>
