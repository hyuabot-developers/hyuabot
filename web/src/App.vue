<template>
  <v-app>
    <v-bottom-navigation :value="value" color="teal" grow fixed height="200px" width="100%">
      <v-btn text height="100%">Recent<v-icon>mdi-history</v-icon></v-btn>
      <v-btn text height="100%">Favorites<v-icon>mdi-heart</v-icon></v-btn>
      <v-btn text height="100%">Nearby<v-icon>mdi-map-marker</v-icon></v-btn>
      <v-btn text height="100%">Favorites<v-icon>mdi-heart</v-icon></v-btn>
      <v-btn text height="100%">Nearby<v-icon>mdi-map-marker</v-icon></v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
<style scoped>

</style>
<script>
export default {
  name: 'App',
  components: {
  },

  data: () => ({
    value: 0
  }),
};
</script>
