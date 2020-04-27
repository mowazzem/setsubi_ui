<template>
  <div>
    <h3 align="center">Companies</h3>
    <Company />
  </div>
</template>
<script>
import Company from "../../components/Company";

export default {
  components: {
    Company
  },

  data(){
    return{
    }
  },

  methods:{
  },

  created() {
  }
};
</script>
<style scoped>
h3 {
  margin-bottom: 5px;
  color: green;
}
</style>
