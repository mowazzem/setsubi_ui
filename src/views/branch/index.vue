<template>
  <div>
    <h3 align="center">Branches</h3>
    <Branch />
  </div>
</template>
<script>
import Branch from "../../components/Branch";

export default {
  components: {
    Branch
  },

  data(){
    return{
    }
  },

  methods:{
  },

  created(){
  }
};
</script>
<style scoped>
h3 {
  margin-bottom: 5px;
  color: green;
}
</style>
