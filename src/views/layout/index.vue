<template>
    <div>
      <Sidebar />
      <Appbar />
      <v-content class="app-content ">
        <v-container class="container" fluid>
          <router-view :key="$route.fullPath"/>
        </v-container>
      </v-content>
    </div>
</template>

<script>

import Sidebar from "@/components/Sidebar";
import Appbar from "@/components/Appbar";
export default {
  components: {
    Sidebar,
    Appbar
  },
  data() {
    return {
      drawer: true
    };
  }
};
</script>
<style scoped>
.container{
}
</style>
