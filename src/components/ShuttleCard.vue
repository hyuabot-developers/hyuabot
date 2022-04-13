<template>
  <v-card width="95vw" v-bind:height="cardHeight(item)">
    <v-container>
      <v-row
        no-gutters
        justify="center"
        style="height: 40px; font-size: 1.25em"
      >
        {{ item["stopName"] }}
      </v-row>
      <v-divider />
      <v-row
        no-gutters
        style="height: 75px"
        align="center"
        justify="center"
        v-on:click="
          moveToTimetable(
            $event,
            item['stopCode'],
            shuttleHeadingList[item['stopCode']].length > 1
              ? 'busForStation'
              : 'busForTerminal'
          )
        "
      >
        <v-col cols="5" style="font-size: 1em">
          {{ shuttleHeadingList[item["stopCode"]][0] }}행
        </v-col>
        <v-col cols="2">
          <li
            v-show="item['busForTerminal'].length > 0"
            v-for="timeItem in item[
              shuttleHeadingList[item['stopCode']].length > 1
                ? 'busForStation'
                : 'busForTerminal'
            ].slice(
              0,
              Math.min(
                2,
                item[
                  shuttleHeadingList[item['stopCode']].length > 1
                    ? 'busForStation'
                    : 'busForTerminal'
                ].length
              )
            )"
            style="margin-bottom: 20px"
            v-bind:style="{
              color: timeItem['type'] === 'C' ? '#0E4A84' : '#FF0000',
            }"
          >
            {{ timeItem["type"] === "C" ? "순환" : "직행" }}
            <br />
          </li>
        </v-col>
        <v-col cols="5">
          <li
            v-show="
              item[
                shuttleHeadingList[item['stopCode']].length > 1
                  ? 'busForStation'
                  : 'busForTerminal'
              ].length > 0
            "
            v-for="timeItem in item[
              shuttleHeadingList[item['stopCode']].length > 1
                ? 'busForStation'
                : 'busForTerminal'
            ].slice(
              0,
              Math.min(
                2,
                item[
                  shuttleHeadingList[item['stopCode']].length > 1
                    ? 'busForStation'
                    : 'busForTerminal'
                ].length
              )
            )"
            style="margin-bottom: 20px"
          >
            {{ timeItem["time"].replace(":", "시 ") }}분
            <br />
          </li>
          <span
            v-show="
              item[
                shuttleHeadingList[item['stopCode']].length > 1
                  ? 'busForStation'
                  : 'busForTerminal'
              ].length === 0
            "
          >
            운행 종료
          </span>
        </v-col>
      </v-row>
      <v-divider v-if="shuttleHeadingList[item['stopCode']].length > 1" />
      <v-row
        no-gutters
        v-if="shuttleHeadingList[item['stopCode']].length > 1"
        style="height: 75px"
        align="center"
        justify="center"
        v-on:click="moveToTimetable($event, item['stopCode'], 'busForTerminal')"
      >
        <v-col cols="5">
          {{ shuttleHeadingList[item["stopCode"]][1] }}행
        </v-col>
        <v-col cols="2">
          <li
            v-show="item['busForTerminal'].length > 0"
            v-for="timeItem in item['busForTerminal'].slice(
              0,
              Math.min(2, item['busForTerminal'].length)
            )"
            style="margin-bottom: 20px"
            v-bind:style="{
              color: timeItem['type'] === 'C' ? '#0E4A84' : '#FF0000',
            }"
          >
            {{ timeItem["type"] === "C" ? "순환" : "직행" }}
            <br />
          </li>
        </v-col>
        <v-col cols="5">
          <li
            v-show="item['busForTerminal'].length > 0"
            v-for="timeItem in item['busForTerminal'].slice(
              0,
              Math.min(2, item['busForTerminal'].length)
            )"
            style="margin-bottom: 20px"
          >
            {{ timeItem["time"].replace(":", "시 ") }}분
            <br />
          </li>
          <span
            v-show="
              item[
                shuttleHeadingList[item['stopCode']].length > 1
                  ? 'busForStation'
                  : 'busForTerminal'
              ].length === 0
            "
          >
            운행 종료
          </span>
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
  name: "ShuttleCard",
  methods: {
    cardHeight: function (item) {
      return this.shuttleHeadingList[item["stopCode"]].length > 1 ? 200 : 125;
    },
    moveToTimetable: function (event, stopCode, heading) {
      this.$store.commit("setShuttleSnackBarVisible", false);
      this.$router.push({
        name: "Shuttle Timetable Page",
        params: {
          stopCode: stopCode,
          heading: heading,
        },
      });
    },
  },
  data() {
    return {
      shuttleHeadingList: {
        Dormitory: ["셔틀콕/한대앞", "셔틀콕/예술인"],
        Shuttlecock_O: ["한대앞", "예술인"],
        Station: ["셔틀콕/기숙사", "예술인"],
        Terminal: ["셔틀콕/기숙사"],
        Shuttlecock_I: ["기숙사"],
      },
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
