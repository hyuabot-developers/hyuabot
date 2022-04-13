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
        this.$store.state.subwayData = res.data["departureList"];
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
