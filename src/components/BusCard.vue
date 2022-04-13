<template>
  <v-card width="95vw" v-bind:height="cardHeight(item)">
    <v-container>
      <v-row
        no-gutters
        justify="center"
        style="height: 40px; font-size: 1.25em"
        v-bind:style="{ color: getLineColor(item.lineName) }"
      >
        {{ item.lineName }} ({{ item.busStopName }})
      </v-row>
      <v-divider />
      <v-row no-gutters style="height: 150px">
        <v-col cols="3">
          <v-row
            no-gutters
            align="center"
            justify="center"
            style="width: 100%; height: 100%"
          >
            {{ item.terminalStop }}
          </v-row>
        </v-col>
        <v-col cols="9">
          <v-row
            no-gutters
            style="height: 75px"
            align="center"
            justify="center"
          >
            <li
              v-for="(arrivalItem, index) in item.arrivalList.slice(
                0,
                Math.min(2, item.arrivalList.length)
              )"
              :key="index"
              style="width: 100%"
            >
              <v-divider v-if="index === 1" style="width: 100%"></v-divider>
              <template>
                <v-row
                  no-gutters
                  style="height: 75px"
                  align="center"
                  justify="center"
                  v-if="arrivalItem.location > 0"
                >
                  {{ parseInt(arrivalItem["remainedTime"]) }}분 후 도착
                  {{
                    arrivalItem.remainedSeat >= 0
                      ? `(${arrivalItem["remainedSeat"]} 석)`
                      : ""
                  }}<br />
                </v-row>
                <v-row
                  no-gutters
                  style="height: 75px"
                  align="center"
                  justify="center"
                  v-else
                >
                  <v-col cols="12">
                    {{ parseInt(arrivalItem["remainedTime"]) }}분 후 종점 출발
                    예정
                  </v-col>
                </v-row>
              </template>
            </li>
          </v-row>
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
  name: "SubwayCard",
  methods: {
    getLineColor: function (lineName) {
      console.log(lineName);
      switch (lineName) {
        case "10-1":
          return "#33CC99";
        default:
          return "#eE0012";
      }
    },
    cardHeight: function (item) {
      console.log(item.arrivalList.length);
      return item.arrivalList.length > 1 ? 206 : 131;
    },
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
