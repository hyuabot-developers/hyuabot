<template>
  <v-layout column align-center>
    <v-flex class="tabs">
      <v-tabs fixed-tabs v-model="current_key">
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
      <v-list
        v-if="
          Object.keys(
            this.shuttleTimetable[
              selectedTabIndex === 0 ? 'weekdays' : 'weekends'
            ]
          ).includes(this.$route.params.heading)
        "
      >
        <template
          v-for="(timetable, timetableIndex) in this.shuttleTimetable[
            selectedTabIndex === 0 ? 'weekdays' : 'weekends'
          ][this.$route.params.heading]"
        >
          <v-divider
            v-if="timetableIndex !== 0"
            style="width: 100%"
          ></v-divider>
          <ShuttleListItem
            v-bind:timetable="timetable"
            v-bind:shuttleStop="stopCode"
            v-bind:shuttleType="heading"
            v-bind:selected-tab-index="selectedTabIndex"
            v-bind:key="
              'shuttle-list-item-' +
              (selectedTabIndex === 0 ? 'weekdays' : 'weekends') +
              '-' +
              timetableIndex
            "
          />
        </template>
      </v-list>
    </v-flex>
    <v-snackbar v-model="snackbar" style="padding-bottom: 56px" :timeout="1500">
      시간을 클릭하시면 정차 정류소를 볼 수 있습니다.
    </v-snackbar>
  </v-layout>
</template>
<style scoped>
.tabs {
  position: fixed;
  left: 0;
  top: 48px;
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
import ShuttleListItem from "@/components/ShuttleListItem";

export default {
  name: "ShuttleTimetablePage",
  components: { ShuttleListItem },
  computed: {
    getShuttleArrivalList() {
      return this.$store.state.shuttleRealtimeData;
    },
  },
  created() {
    this.getShuttleList();
    this.setTitle();
  },
  data() {
    return {
      tabs: ["평일", "주말"],
      selectedTabIndex: 0,
      shuttleTimetable: {},
      current_key: 0,
      stopCode: this.$route.params.stopCode.toString(),
      heading: this.$route.params.heading.toString(),
      snackbar: true,
    };
  },
  methods: {
    async getShuttleList() {
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
    setTitle() {
      const shuttleNameDict = {
        Dormitory: {
          name: "기숙사",
          busForStation: "한대앞/셔틀콕",
          busForTerminal: "예술인/셔틀콕",
        },
        Shuttlecock_O: {
          name: "셔틀콕",
          busForStation: "한대앞",
          busForTerminal: "예술인",
        },
        Station: {
          name: "한대앞",
          busForStation: "기숙사/셔틀콕",
          busForTerminal: "예술인",
        },
        Terminal: {
          name: "예술인",
          busForStation: "기숙사/셔틀콕",
          busForTerminal: "기숙사/셔틀콕",
        },
        Shuttlecock_I: {
          name: "셔틀콕 건너편",
          busForStation: "기숙사",
          busForTerminal: "기숙사",
        },
      };
      this.$store.commit(
        "setAppTitle",
        `${shuttleNameDict[this.$route.params.stopCode].name} ➔ ${
          shuttleNameDict[this.$route.params.stopCode][
            this.$route.params.heading
          ]
        }`
      );
    },
  },
  mounted() {
    let currentTime = new Date();
    this.current_key =
      currentTime.getDay() === 0 || currentTime.getDay() === 6 ? 1 : 0;
  },
};
</script>
