<template>
  <v-flex>
    <v-list-item @click.stop="dialog = true">
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
                color: isTimePassed(timetable.time) ? '#000000' : '#7F7F7F',
              }"
            >
              {{ timetable.time.replace(":", "시 ") }}분<br />
            </span>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
    <v-dialog v-model="dialog">
      <v-layout column align-center>
        <v-card
          ref="shuttleStopDialog"
          v-click-outside="onClickOutside"
          width="100%"
        >
          <v-list>
            <template
              v-for="(timeDelta, timeDeltaIndex) in this.timeDeltaArray"
            >
              <v-divider
                v-if="timeDeltaIndex !== 0"
                style="width: 100%"
              ></v-divider>
              <v-flex>
                <v-list-item>
                  <v-list-item-content class="justify-center">
                    <v-row
                      no-gutters
                      align="center"
                      justify="center"
                      v-bind:style="{
                        color: timeDelta >= 0 ? '#000000' : '#7F7F7F',
                      }"
                    >
                      <v-col cols="6">
                        {{ shuttleStopList[timeDeltaIndex] }}
                      </v-col>
                      <v-col cols="6">
                        {{ calculateTime(timetable.time, timeDelta) }}
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-flex>
            </template>
          </v-list>
        </v-card>
      </v-layout>
    </v-dialog>
  </v-flex>
</template>

<script>
export default {
  name: "ShuttleListItem",
  components: {},
  data() {
    return {
      shuttleStopList: [],
      timeDeltaArray: [],
      dialog: false,
    };
  },
  methods: {
    isTimePassed(time) {
      const now = new Date();
      const target = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        time.split(":")[0],
        time.split(":")[1]
      );
      return now < target;
    },
    calculateTime(time, timeDelta) {
      let hour = parseInt(time.split(":")[0]);
      let minute = parseInt(time.split(":")[1]);
      minute += timeDelta;
      if (minute >= 60) {
        hour += 1;
        minute -= 60;
      } else if (minute < 0) {
        hour -= 1;
        minute += 60;
      }
      return `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
    },
    onClickOutside() {
      this.$refs.shuttleStopDialog.hide();
    },
  },
  created() {
    if (this.timetable.type === "DH") {
      this.shuttleStopList = ["기숙사", "셔틀콕", "한대앞", "셔틀콕 건너편"];
      if (this.shuttleStop === "Dormitory") {
        this.timeDeltaArray = [0, 5, 15, 25];
      } else if (this.shuttleStop === "Shuttlecock_O") {
        this.timeDeltaArray = [-5, 0, 10, 20];
      } else if (this.shuttleStop === "Station") {
        this.timeDeltaArray = [-15, -10, 0, 10];
      } else if (this.shuttleStop === "Shuttlecock_I") {
        this.timeDeltaArray = [-25, -20, -10, 0];
      }
    } else if (this.timetable.type === "DY") {
      this.shuttleStopList = ["기숙사", "셔틀콕", "예술인", "셔틀콕 건너편"];
      if (this.shuttleStop === "Dormitory") {
        this.timeDeltaArray = [0, 5, 15, 25];
      } else if (this.shuttleStop === "Shuttlecock_O") {
        this.timeDeltaArray = [-5, 0, 10, 20];
      } else if (this.shuttleStop === "Terminal") {
        this.timeDeltaArray = [-15, -10, 0, 10];
      } else if (this.shuttleStop === "Shuttlecock_I") {
        this.timeDeltaArray = [-25, -20, -10, 0];
      }
    } else {
      this.shuttleStopList = [
        "기숙사",
        "셔틀콕",
        "한대앞",
        "예술인",
        "셔틀콕 건너편",
      ];
      if (this.shuttleStop === "Dormitory") {
        this.timeDeltaArray = [0, 5, 15, 20, 30];
      } else if (this.shuttleStop === "Shuttlecock_O") {
        this.timeDeltaArray = [-5, 0, 10, 15, 25];
      } else if (this.shuttleStop === "Station") {
        this.timeDeltaArray = [-15, -10, 0, 5, 15];
      } else if (this.shuttleStop === "Terminal") {
        this.timeDeltaArray = [-20, -15, -5, 0, 10];
      } else if (this.shuttleStop === "Shuttlecock_I") {
        this.timeDeltaArray = [-30, -25, -15, -10, 0];
      }
    }
  },
  props: {
    shuttleStop: {
      type: String,
      required: true,
    },
    shuttleType: {
      type: String,
      required: true,
    },
    timetable: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
