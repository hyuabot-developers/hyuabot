<template>
  <v-layout column align-center>
    <v-flex>
      <ShuttleCard
        v-for="shuttleArrivalItem in getShuttleArrivalList"
        :item="shuttleArrivalItem"
        style="margin-top: 10px"
      />
    </v-flex>
    <v-snackbar v-model="snackbar" style="padding-bottom: 56px" :timeout="1500">
      시간표를 확인하시려면 시간표 카드를 클릭해주세요.
    </v-snackbar>
  </v-layout>
</template>
<style scoped>
v-app-bar {
  width: 100vw;
  background-color: #00bcd4;
}
ShuttleCard {
  overflow-y: auto;
}
</style>
<script>
import ShuttleCard from "@/components/ShuttleCard";
import axios from "axios";
export default {
  name: "ShuttlePage",
  components: { ShuttleCard },
  computed: {
    getShuttleArrivalList() {
      return this.$store.state.shuttleRealtimeData;
    },
  },
  data() {
    return {
      snackbar: true,
      shuttleList: null,
    };
  },
  methods: {
    async getShuttleList() {
      const url = "/api/v1/shuttle/arrival";
      const res = await axios.get(url, {
        baseURL: "https://api.hyuabot.app",
      });
      if (res.status === 200) {
        this.$store.state.shuttleRealtimeData = res.data["arrivalList"];
      } else {
        this.$store.state.shuttleRealtimeData = [];
      }
    },
  },
  created() {
    this.getShuttleList();
  },
};
</script>
