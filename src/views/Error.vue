<template>
  <div class="about">
      <h1>{{msg}}</h1>
  </div>
</template>
<script>
export default{
    data(){
        return {
            msg:"an error occured"
        }
    }, 
    mounted(){
        if(this.$route.query.status=='401'){
            this.msg="you are unauthorized to this page";
        }else if(this.$route.query.status=="400"){
            this.msg="Bad request";
        }else if(this.$route.query.status=="500"){
            this.msg="Internal server error occured";
        }
    }
}
</script>
