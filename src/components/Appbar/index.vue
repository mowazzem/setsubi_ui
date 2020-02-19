<template>
  <v-app-bar id="app-bar" app dense flat>
    <v-app-bar-nav-icon id="nav-icon" @click="check" />
    <v-toolbar-title>Application</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn to="/login" icon>
      <v-icon>mdi-login</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      drawer: true
    };
  },
  methods: {
    check() {
      this.drawer = !this.drawer;
      this.$root.$emit("drawer", this.drawer);
    },
    deviceSizeCheck() {
      return screen.availWidth;
    }
  },
  beforeMount() {
    if (this.deviceSizeCheck() <= 1024) {
      this.drawer = false;
    }
  },
  mounted() {
    this.$root.$on("navFocusOut", arg => {
      this.drawer = arg;
    });
  }
};
</script>

<style scoped>
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
</style>
