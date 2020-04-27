<template>
  <div>
    <h3 align="center">Setsubi Data List</h3>
    <SetsubiDataList />
    <br />
    <div v-if="clicked">
      <SetsubiDataDetails />
    </div>
  </div>
</template>

<script>
import SetsubiDataList from "../../components/SetsubiDataList";
import SetsubiDataDetails from "../../components/SetsubiDataDetails";
export default {

  data() {
    return {
      clicked: false
    };
  },

  components: {
    SetsubiDataList,
    SetsubiDataDetails
  },

  mounted() {
    this.$root.$on("setsubiDataRowClicked", () => {
      if (this.clicked == true) {
        this.clicked = false;
      }
      this.clicked = true;
      window.setTimeout(() => {
        this.$root.$emit("setsubiDetailsCreated");
      }, 0);
    });
      this.$root.$on("scIdChanged",()=>{
          this.clicked=false;
      });
  }

};
</script>
<style lang="scss" scoped>

h3 {
  color: green;
  margin-bottom: 5px;
}

</style>
