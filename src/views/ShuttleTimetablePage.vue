<template>
  <v-layout column align-center>
    <v-flex class="tabs">
      <v-tabs fixed-tabs>
        <v-tab
          v-for="(tab, index) in tabs"
          v-bind:class="{ active: index === selectedTabIndex }"
          v-on:click="changeButtonClicked(index)"
        >
          {{ tab }}
        </v-tab>
      </v-tabs>
    </v-flex>
    <v-flex class="timetable">
      <v-list>
        <template
          v-for="(timetable, timetableIndex) in this.shuttleTimetable[
            selectedTabIndex === 0 ? 'weekdays' : 'weekends'
          ][this.$route.params.heading]"
        >
          <v-divider
            v-if="timetableIndex !== 0"
            style="width: 100%"
          ></v-divider>

          <v-list-item :key="timetable.time">
            <v-list-item-content class="d-flex justify-center">
              <v-row no-gutters align="center" justify="center">
                <v-col cols="2">
                  <span
                    v-bind:style="{
                      color: timetable.type === 'C' ? '#0E4A84' : '#FF0000',
                    }"
                  >
                    {{ timetable.type === "C" ? "순환" : "직행" }}
                  </span>
                </v-col>
                <v-col cols="5">
                  <span
                    v-bind:style="{
                      color: isTimePassed(timetable.time)
                        ? '#000000'
                        : '#7F7F7F',
                    }"
                  >
                    {{ timetable.time.replace(":", "시 ") }}분<br />
                  </span>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>
<style scoped>
.tabs {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 1;
}
.timetable {
  margin-top: 50px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
}
</style>
<script>
import axios from "axios";

export default {
  name: "ShuttleTimetablePage",
  components: {},
  computed: {
    getShuttleArrivalList() {
      return this.$store.state.shuttleRealtimeData;
    },
  },
  data() {
    return {
      tabs: ["평일", "주말"],
      selectedTabIndex: 0,
      shuttleTimetable: {},
    };
  },
  methods: {
    async getShuttleList() {
      console.log(this.$store.state.shuttleTimetableData.length);
      if (this.$store.state.shuttleTimetableData.length === 0) {
        const url = "/api/v1/shuttle/timetable";
        const res = await axios.get(url, {
          baseURL: "https://api.hyuabot.app",
        });
        console.log(res.status);
        if (res.status === 200) {
          this.$store.commit("setShuttleTimetable", res.data["timetableList"]);
          console.log(this.$store.state.shuttleTimetableData);
        } else {
          this.$router.go(-1);
        }
      }
      this.shuttleTimetable = this.$store.getters.getShuttleTimetable(
        this.$route.params.stopCode
      );
    },
    changeButtonClicked(index) {
      this.selectedTabIndex = index;
    },
    isTimePassed(shuttleTime) {
      let currentTime = new Date();
      let timeArr = shuttleTime.split(":");
      return (
        currentTime.getHours() < parseInt(timeArr[0]) ||
        (currentTime.getHours() === parseInt(timeArr[0]) &&
          currentTime.getMinutes() < parseInt(timeArr[1]))
      );
    },
  },
  created() {
    this.getShuttleList();
    console.log(this.shuttleTimetable);
  },
};
</script>
