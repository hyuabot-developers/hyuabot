<template>
  <div id="app">
    <v-app>
      <v-main style="margin-bottom: 56px">
        <v-slide-x-transition mode="out-in">
          <router-view></router-view>
        </v-slide-x-transition>
      </v-main>
      <v-footer>
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
      </v-footer>
    </v-app>
  </div>
</template>

<style scoped>
#app {
  font-family: Godo, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}

@font-face {
  font-family: "Godo";
  font-style: normal;
  font-weight: 400;
  src: url("//cdn.jsdelivr.net/korean-webfonts/1/corps/godo/Godo/GodoM.woff2")
      format("woff2"),
    url("//cdn.jsdelivr.net/korean-webfonts/1/corps/godo/Godo/GodoM.woff")
      format("woff");
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
