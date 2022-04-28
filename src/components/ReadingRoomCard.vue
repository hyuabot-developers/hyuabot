<template>
  <q-card class="full-width">
    <q-card-section class="text-white bg-primary" style="padding: 10px">
      <div class="text-h6">{{ readingRoom.name }}</div>
    </q-card-section>
    <q-card-section style="padding-top: 0; padding-bottom: 0">
      <q-list dense>
        <q-item>
          <div class="col-6 items-center">총 좌석</div>
          <div class="col-6 items-center">{{ readingRoom.total }} 석</div>
        </q-item>
        <q-item>
          <div class="col-6 items-center">사용중</div>
          <div class="col-6 items-center">{{ readingRoom.occupied }} 석</div>
        </q-item>
        <q-item>
          <div class="col-6 items-center">잔여 좌석</div>
          <div class="col-6 items-center">{{ readingRoom.available }} 석</div>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'ReadingRoomCard',
  props: {
    readingRoom: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
div .items-center {
  display: flex;
  justify-content: center;
}
</style>
