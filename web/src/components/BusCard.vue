<template>
  <v-card>
    <v-container pa-1>
      <v-layout row>
        <v-flex xs7>
          <v-card-title primary-title>
            <div>
              <div class="grey--text">전체 사용자</div>
              <h3 class="headline">123</h3>
            </div>
          </v-card-title>
        </v-flex>
        <v-flex xs5>
          <v-card-title primary-title>
            <v-avatar>
              <v-icon medium color="success">person</v-icon>
            </v-avatar>
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
      <v-card-actions class="pa-2">
        <v-icon small color="primary">update</v-icon>
        <span class="grey--text caption font-italic">&nbsp;5분전</span>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-container>
  </v-card>
</template>
<style scoped></style>
<script>
export default {
  name: "BusCard",
};
</script>
