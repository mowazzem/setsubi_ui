<template>
  <v-app-bar id="app-bar" app flat class="d-inline-block">
    <v-app-bar-nav-icon id="nav-icon" @click="check" />
    <v-toolbar-title>Application</v-toolbar-title>
    <v-spacer />
    <v-select
      class="selec"
      v-model="locale"
      :items="locales"
      prepend-icon="mdi-flag-checkered"
      dense
      flat
      auto
    ></v-select>

    <v-btn to="/login" icon>
      <v-icon>mdi-login</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      locale: "English",
      locales: ["English", "日本語"]
    };
  },
  computed: {
    ...mapGetters(["drawerStat"])
  },
  methods: {
    check() {
      this.$store.dispatch("toggleSideBar", !this.drawerStat);
    }
  }
};
</script>

<style lang="scss" scoped>
#app-bar {
  background-color: transparent;
}

@media (min-width: 1024px) {
  #nav-icon {
    display: none;
  }
}

@media (max-width: 1024px) {
  #nav-icon {
    display: block;
  }
}

.selec {
  width: 100%;
  margin: 0px;
}
.card {
  width: 10%;
  padding-top: 0px;
  margin-top: 10px;
}
@media (max-width: 1024px) {
  .card {
    width: 10px;
    font-size: 2%;
  }
}
</style>
