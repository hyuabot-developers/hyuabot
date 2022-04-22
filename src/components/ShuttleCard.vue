<template>
  <q-card class="full-width">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{ this.$t(`shuttle.${shuttle.stopCode}`) }}</div>
    </q-card-section>
    <q-card-section />
    <q-card-section></q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'ShuttleCard',
  props: {
    shuttle: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
q-card {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
