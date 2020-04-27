<template>
  <v-app style="background-color:#EEEEEE">
    <router-view :key="$route.fullPath"/>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
