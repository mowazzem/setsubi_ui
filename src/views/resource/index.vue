<template>
  <div>
    <h3 align="center">Resources</h3>
    <resourceList />
  </div>
</template>

<script>
import resourceList from "../../components/Resource";
export default {
  components: {
    resourceList
  }
};
</script>

<style scoped>
h3 {
  margin-bottom: 5px;
  color: green;
}
</style>
