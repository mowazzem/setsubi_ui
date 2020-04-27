<template>
  <v-app-bar id="app-bar" color="#EEEEEE" flat app class="d-inline-block">
    <v-app-bar-nav-icon id="" @click="check">
      <template v-slot:default>
        <v-icon>fa-ellipsis-v</v-icon>
      </template>
    </v-app-bar-nav-icon>
    <v-toolbar-title class="title-display">K-fis</v-toolbar-title>
    <v-icon class="icon-disply">mdi-hammer-screwdriver</v-icon>
    <v-spacer />
    <v-row align="center" justify="center" class="mt-1">
      <v-col class="d-flex" lg="10" sm="9" xs="11"></v-col>
      <v-col class="d-flex" lg="2" sm="3" xs="1">
        <v-select
          :menu-props="{ bottom: true, offsetY: true }"
          :items="locales"
          v-model="locale"
          item-text="text"
          item-value="val"
          v-on:input="onChange"
        ></v-select>
      </v-col>
    </v-row>

    <v-btn @click="logout" class="" icon>
      <v-icon>mdi-logout-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import router from "@/router";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      locale: { text: "English", val: "en" },
      locales: [
        { text: "English", val: "en" },
        { text: "日本語", val: "ja" }
      ]
    };
  },
  computed: {
    ...mapGetters(["drawerStat", "getToken", "getUserInfo"])
  },
  methods: {
    ...mapActions(["toggleLoginStatus", "removeToken"]),
    check() {
      this.$store.dispatch("toggleSideBar", !this.drawerStat);
    },
    onChange(e) {
      this.$i18n.locale = e;
    },
    logout() {
      this.removeToken().then(() => {
        Cookies.remove("token");
        router.push({ name: "login" });
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
#app-bar {
  background-color: transparent;
}

@media (min-width: 1025px) {
  .lang-form {
    width: 10%;
  }
  .icon-disply {
    display: none;
  }
}

@media (max-width: 1024px) and (min-width: 600px) {
  .lang-form {
    width: 25%;
  }
}

@media (max-width: 600px) {
  .lang-form {
    width: 40%;
    padding: 0px;
    height: 5px;
  }
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
  .icon-display {
    display: block;
  }
  .title-display {
    display: none;
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
.visibility {
  display: none;
}
</style>
