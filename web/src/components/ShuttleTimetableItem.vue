<template>
  <q-item clickable class="full-width" @click="popUpOpened = true">
    <q-item-section
      :style="{color: item.type === 'C' ? 'var(--q-secondary)' : '#FF0000'}">
      {{ item.type === "C" ? "순환" : "직행" }}
    </q-item-section>
    <q-item-section
      :style="{color: isTimePassed(item.time) ? 'var(--q-text-color)' : '#7F7F7F'}">
      {{ item.time.replace(":", "시 ") }}분
    </q-item-section>
  </q-item>
  <q-dialog v-model="popUpOpened">
    <q-card style="width: 500px">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ $t('shuttle.timetable.departureTime') }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-list separator>
          <q-item
            v-for="(timeDelta, index) in timeDeltaArray" :key="index"
            :style="{color: timeDelta >= 0 ? 'var(--q-text-color)' : '#7F7F7F'}"
          >
            <q-item-section>
              <div>{{ shuttleStopList[index] }}</div>
            </q-item-section>
            <q-item-section>
              <div>
                {{ calculateTime(item.time, timeDelta) }}
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn v-close-popup flat label="확인" style="width: 100%"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {ref} from 'vue';

export default {
  name: 'ShuttleTimetableListItem',
  props: {
    shuttleStop: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true
    }
  },
  setup(props: { item: { type: string; }; shuttleStop: string; }) {
    function calculateTime(time: string, timeDelta: number) {
      let hour = parseInt(time.split(':')[0]);
      let minute = parseInt(time.split(':')[1]);
      minute += timeDelta;
      if (minute >= 60) {
        hour += 1;
        minute -= 60;
      } else if (minute < 0) {
        hour -= 1;
        minute += 60;
      }
      return `${hour.toString().padStart(2, '0')}시 ${minute.toString().padStart(2, '0')}분`;
    }

    function isTimePassed(time: string) {
      const now = new Date();
      const target = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(time.split(':')[0]),
        parseInt(time.split(':')[1])
      );
      return now < target;
    }

    const popUpOpened = ref(false);
    let shuttleStopList: string[] = [];
    let timeDeltaArray: number[] = [];
    if (props.item.type === 'DH') {
      shuttleStopList = ['기숙사', '셔틀콕', '한대앞', '셔틀콕 건너편'];
      if (props.shuttleStop === 'Dormitory') {
        timeDeltaArray = [0, 5, 15, 25];
      } else if (props.shuttleStop === 'Shuttlecock_O') {
        timeDeltaArray = [-5, 0, 10, 20];
      } else if (props.shuttleStop === 'Station') {
        timeDeltaArray = [-15, -10, 0, 10];
      } else if (props.shuttleStop === 'Shuttlecock_I') {
        timeDeltaArray = [-25, -20, -10, 0];
      }
    } else if (props.item.type === 'DY') {
      shuttleStopList = ['기숙사', '셔틀콕', '예술인', '셔틀콕 건너편'];
      if (props.shuttleStop === 'Dormitory') {
        timeDeltaArray = [0, 5, 15, 25];
      } else if (props.shuttleStop === 'Shuttlecock_O') {
        timeDeltaArray = [-5, 0, 10, 20];
      } else if (props.shuttleStop === 'Terminal') {
        timeDeltaArray = [-15, -10, 0, 10];
      } else if (props.shuttleStop === 'Shuttlecock_I') {
        timeDeltaArray = [-25, -20, -10, 0];
      }
    } else {
      shuttleStopList = [
        '기숙사',
        '셔틀콕',
        '한대앞',
        '예술인',
        '셔틀콕 건너편',
      ];
      if (props.shuttleStop === 'Dormitory') {
        timeDeltaArray = [0, 5, 15, 20, 30];
      } else if (props.shuttleStop === 'Shuttlecock_O') {
        timeDeltaArray = [-5, 0, 10, 15, 25];
      } else if (props.shuttleStop === 'Station') {
        timeDeltaArray = [-15, -10, 0, 5, 15];
      } else if (props.shuttleStop === 'Terminal') {
        timeDeltaArray = [-20, -15, -5, 0, 10];
      } else if (props.shuttleStop === 'Shuttlecock_I') {
        timeDeltaArray = [-30, -25, -15, -10, 0];
      }
    }
    return {calculateTime, isTimePassed, popUpOpened, shuttleStopList, timeDeltaArray};
  }
}
</script>

<style scoped>

</style>
