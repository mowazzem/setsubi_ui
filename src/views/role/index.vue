<template>
  <div>
    <h3 align="center">Roles</h3>
    <roleList />
  </div>
</template>

<script>
import roleList from "../../components/Role";
export default {
  components: {
    roleList
  },
  methods: {}
};
</script>

<style scoped>
h3 {
  margin-bottom: 5px;
  color: green;
}
</style>
