<template>
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
              color: isTimePassed(timetable.time) ? '#000000' : '#7F7F7F',
            }"
          >
            {{ timetable.time.replace(":", "시 ") }}분<br />
          </span>
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "ShuttleListItem",
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
  },
  props: ["timetable"],
};
</script>

<style scoped></style>
