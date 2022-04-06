<template>
  <v-container>
    <v-flex>
      <!--      <ShuttleCard-->
      <!--        v-for="(shuttleArrivalItem, index) in getShuttleTimetableList"-->
      <!--        :key="index"-->
      <!--        :item="shuttleArrivalItem"-->
      <!--        style="margin-bottom: 20px"-->
      <!--      />-->
    </v-flex>
  </v-container>
</template>
<style scoped>
ShuttleCard {
  overflow-y: scroll;
}
</style>
<script>
import axios from "axios";
export default {
  name: "ShuttleTimetablePage",
  components: {},
  computed: {
    getShuttleTimetableList() {
      return this.$store.state.shuttleTimetableData[
        this.$route.params.stopCode
      ][this.$route.params.heading];
    },
  },
  methods: {
    async getShuttleList() {
      if (
        this.$store.state.shuttleTimetableData[this.$route.params.stopCode] ===
          {} ||
        !this.$store.state.shuttleTimetableData[this.$route.params.stopCode]
      ) {
        const url = `/api/v1/shuttle/arrival/${this.$route.params.stopCode}/timetable/all`;
        const res = await axios.get(url, {
          baseURL: "https://api.hyuabot.app",
        });
        this.$store.state.shuttleTimetableData[this.$route.params.stopCode] =
          {};
        if (res.status === 200) {
          console.log(res.data);
          this.$store.state.shuttleTimetableData[this.$route.params.stopCode][
            "weekdays"
          ] = res.data["weekdays"];
          this.$store.state.shuttleTimetableData[this.$route.params.stopCode][
            "weekends"
          ] = res.data["weekends"];
        } else {
          this.$router.go(-1);
        }
      }
      // console.log(this.getShuttleTimetableList());
    },
  },
  created() {
    this.getShuttleList();
  },
};
</script>
