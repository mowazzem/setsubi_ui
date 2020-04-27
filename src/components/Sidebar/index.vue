<template>
  <v-card style="max-height:100%" class="overflow-auto" dark>
    <v-navigation-drawer v-model="drawerStat" app>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar width="100" height="100">
            <v-img src="https://assets.mycast.io/characters/42594_normal.jpg?1533142532"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">Mowazzem</v-list-item-title>
            <v-list-item-subtitle>mowazzem@kodensya.co.jp</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <div></div>

      <v-list nav dense>
        <v-list-item link to="/" tag="div">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="isValid(['USER', 'SUPER_ADMIN', 'BRANCH_ADMIN', 'COMPANY_ADMIN'])"
          to="setsubi-data"
        >
          <v-list-item-icon>
            <v-icon>mdi-file-document</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Setsubi Data</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="isValid(['SUPER_ADMIN'])" link to="setsubi-category">
          <v-list-item-icon>
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Setsubi Category</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="isValid(['SUPER_ADMIN'])" link to="company">
          <v-list-item-icon>
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Company</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="isValid(['SUPER_ADMIN'])" link to="branch">
          <v-list-item-icon>
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Branch</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="isValid(['SUPER_ADMIN'])" link to="client">
          <v-list-item-icon>
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Client</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="isValid(['SUPER_ADMIN'])" link to="role">
          <v-list-item-icon>
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Role</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="isValid(['SUPER_ADMIN'])" link to="resource">
          <v-list-item-icon>
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Resource</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { hasAccess, isValid } from "@/utils/auth.js";
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard"
        },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      drawerStats: "drawerStat"
    }),
    drawerStat: {
      get() {
        return this.drawerStats;
      },
      set(newDrawStat) {
        this.toggleSideBar(newDrawStat);
        return newDrawStat;
      }
    },
    bg() {
      return this.background ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" : undefined;
    }
  },
  methods: {
    ...mapActions(["toggleSideBar"]),
    hasAccess,
    isValid
  },
  mounted() {
    if (window.innerWidth <= 1024) {
      this.toggleSideBar(false);
      this.drawerStat = false;
    } else {
      this.drawerStat = true;
      
    }
  }
};
</script>

<style scoped></style>
