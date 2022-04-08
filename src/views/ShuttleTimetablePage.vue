<template>
  <v-container>
    <div>
      <ul class="tabs">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          v-bind:class="{ active: index === selectedTabIndex }"
          v-on:click="changeButtonClicked(index)"
        >
          {{ tab }}
        </li>
      </ul>
      <ul class="timetableList">
        <li
          v-for="(timetable, timetableIndex) in getShuttleTimetableList[
            this.$route.params.stopCode
          ][selectedTabIndex === 0 ? 'weekdays' : 'weekends'][
            this.$route.params.heading
          ]"
          :key="timetableIndex"
        >
          {{ timetable.time }}
        </li>
      </ul>
    </div>
  </v-container>
</template>
<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
ul.tabs {
  position: fixed;
  display: flex;
  width: 90vw;
}
.tabs li {
  display: inline-block;
  padding: 15px;
  width: 50%;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  background-color: #eee;
  color: #999;
}
.tabs li.active {
  background-color: #0e4a84;
  color: #fff;
}
div {
  flex-flow: column wrap;
}
.timetableList {
  margin-bottom: 15px;
  overflow-y: hidden;
}
.timetableList li {
  box-sizing: border-box;
  display: block;
  padding: 15px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.timetableList li:last-child {
  border-bottom: none;
}
</style>
<script>
import axios from "axios";
export default {
  name: "ShuttleTimetablePage",
  components: {},
  computed: {
    getShuttleTimetableList() {
      return this.$store.state.shuttleTimetableData;
    },
  },
  data() {
    return {
      tabs: ["평일", "주말"],
      selectedTabIndex: 0,
    };
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
          ] = res.data[0]["weekdays"];
          this.$store.state.shuttleTimetableData[this.$route.params.stopCode][
            "weekends"
          ] = res.data[0]["weekends"];
        } else {
          this.$router.go(-1);
        }
      }
      // console.log(this.getShuttleTimetableList());
    },
    changeButtonClicked(index) {
      this.selectedTabIndex = index;
    },
  },
  created() {
    this.getShuttleList();
    console.log(this.$store.state.shuttleTimetableData);
  },
};
</script>
