<template>
  <v-card>
    <v-layout>
      <v-app-bar color="#0E4A84" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>휴아봇</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" bottom >
        <v-list :items="items" />
      </v-navigation-drawer>
      <v-main>
        <ShuttleHome />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import ShuttleHome from "@/components/Home";
export default {
  name: 'App',
  components: {
    ShuttleHome
  },
  data: () => ({
    drawer: false,
    items: [
      {
        title: '셔틀',
        value: 'shuttle',
      },
      {
        title: '버스',
        value: 'bus',
      },
      {
        title: '전철',
        value: 'subway',
      },
      {
        title: '학식',
        value: 'cafeteria',
      },
    ],
  }),
}
</script>

<style>

</style>
