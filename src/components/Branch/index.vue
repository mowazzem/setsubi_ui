<template>
  <v-data-table
    :headers="headers"
    :loading="load"
    loading-text="Loading...please wait"
    :items="allBranches"
    :items-per-page="5"
    class="elevation-10"
  >
    <template v-slot:top>
      <v-toolbar color="" flat>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
          <v-toolbar color="green">
            <span class="headline">New Item </span>
          </v-toolbar>
          <template v-slot:activator="{ on }">
            <v-btn small fab outlined color="primary" class="mb-2" v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <BranchEditor />
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import BranchEditor from "../BranchEditor";
export default {
  components: {
    BranchEditor
  },
  data() {
    return {
      load:true,
      dialog: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Address", value: "address" }
      ],
      items: []
    };
  },
  computed: {
    ...mapGetters(["allBranches"])
  },
  methods: {
    ...mapActions(["fetchBranches"])
  },
  created() {
    this.fetchBranches()
      .then(resp=>{
        if(resp.code=="200"){
          this.load=false;
        }
      });
  },
  mounted() {
    this.$root.$on("branch-editor-close", () => {
      this.dialog = false;
    });
  }
};
</script>
<style scoped></style>
