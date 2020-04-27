<template>
  <div>
    <h3 align="center">Clients</h3>
    <Client />
  </div>
</template>
<script>
import Client from "../../components/Client";

export default {
  components: {
    Client
  },

  data() {
    return {};
  },

  methods: {},

  created() {}
};
</script>
<style scoped>
h3 {
  margin-bottom: 5px;
  color: green;
}
</style>
