<template>
  <v-container>
    <v-flex>
      <ShuttleCard
        v-for="(shuttleArrivalItem, index) in shuttleList"
        :key="index"
        :item="shuttleArrivalItem"
        style="margin-bottom: 20px"
      />
    </v-flex>
  </v-container>
</template>
<style scoped>
ShuttleCard {
  overflow-y: scroll;
}
</style>
<script>
import ShuttleCard from "@/components/ShuttleCard";
import axios from "axios";
export default {
  name: "ShuttlePage",
  components: { ShuttleCard },
  data() {
    return {
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
        this.shuttleList = res.data["arrivalList"];
      } else {
        this.shuttleList = [];
      }
      console.log(this.shuttleList);
    },
  },
  created() {
    this.getShuttleList();
  },
};
</script>
