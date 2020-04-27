<template>
  <v-data-table
    :headers="headers"
    :loading="load"
    loading-text="Loading...please wait"
    :items="allResources"
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
          <resourceEditor />
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import resourceEditor from "../ResourceEditor";
export default {
  components: {
    resourceEditor
  },

  data() {
    return {
      load: true,
      dialog: false,
      headers: [
        { text: "URL", value: "url" },
        { text: "Alias", value: "alias" }
      ]
    };
  },

  computed: {
    ...mapGetters(["allResources"])
  },

  methods: {
    ...mapActions(["fetchResources"])
  },

  created() {
    this.fetchResources().then(resp => {
      if (resp.code == "200") {
        this.load = false;
      }
    });
  },

  mounted() {
    this.$root.$on("resource_form_close", () => {
      this.dialog = false;
    });
  }
};
</script>

<style scoped></style>
