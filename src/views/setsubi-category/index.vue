<template>
  <div>
    <h3 align="center">Setsubi Categories</h3>
    <SetsubiCategoryList />
  </div>
</template>
<script>
import SetsubiCategoryList from "../../components/SetsubiCategoryList";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },

  components: {
    SetsubiCategoryList
  },

  computed: {
    ...mapGetters(["getFile"])
  },

  methods: {
  },
  created() {
  },
  mounted() {
    // console.log(this.getFile);
  }
};
</script>
<style scoped>
h3 {
  margin-bottom: 5px;
  color: green;
}
</style>
