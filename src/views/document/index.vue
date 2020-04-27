<template>
  <div></div>
</template>
<script>
      import {mapGetters} from 'vuex';
    export default {
      computed:{
        ...mapGetters(["getFile"])
      },
      created(){
      },
      mounted(){
        let file=localStorage.getItem('file')
        window.location=file;
      }
    };
</script>
<style scoped></style>
