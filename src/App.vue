<template>
  <div id="app">
    <v-app>
      <!-- Bottom nav height : 56px-->
      <v-main style="padding-bottom: 36px">
        <v-slide-x-transition mode="out-in">
          <router-view></router-view>
        </v-slide-x-transition>
      </v-main>
      <v-bottom-navigation :value="sSelect" color="primary" fixed>
        <v-btn to="/">
          <span>셔틀</span>
          <v-icon>mdi-bus</v-icon>
        </v-btn>
        <v-btn to="/subway">
          <span>전철</span>
          <v-icon>mdi-train</v-icon>
        </v-btn>
        <v-btn to="/bus">
          <span>버스</span>
          <v-icon>mdi-bus-multiple</v-icon>
        </v-btn>
        <v-btn to="/cafeteria">
          <span>학식</span>
          <v-icon>mdi-silverware</v-icon>
        </v-btn>
        <v-btn to="/more">
          <span>더보기</span>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-app>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}

v-main {
  height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
<script>
export default {
  name: "App",
  data() {
    return {
      sSelect: "자전거",
    };
  },
};
</script>
