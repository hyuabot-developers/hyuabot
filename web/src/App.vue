<template>
  <div id="app">
    <ShuttleHome />
    <GrowBottomNavigation :options="options"/>
  </div>
</template>

<script>
import { GrowBottomNavigation } from "bottom-navigation-vue"
import ShuttleHome from './components/Home.vue'

export default {
  name: 'App',
  components: {
    ShuttleHome, GrowBottomNavigation,
  },
  data: () => ({
    selected: 1,
    options: [
      { id: 1, icon: "fas fa-home", title: "Home", badge: 1 },
      { id: 2, icon: "fas fa-layer-group", title: "Category" },
      { id: 3, icon: "fas fa-cog", title: "Setting" },
      { id: 4, icon: "fas fa-user", title: "Account", badge: 15 },
      { id: 5, icon: "fas fa-bell", title: "Notification" },
    ],
  }),
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  white-space: nowrap;
}
</style>
