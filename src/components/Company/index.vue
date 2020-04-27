<template>
  <v-data-table
    :headers="headers"
    :loading="load"
    loading-text="Loading...please wait"
    :items="allCompanies"
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
          <companyEditor />
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import companyEditor from "../CompanyEditor";
export default {
  components: {
    companyEditor
  },
  data() {
    return {
      load: true,
      dialog: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Address", value: "address" },
        { text: "Email", value: "email" },
        { text: "Phone No", value: "phone_no1" },
        { text: "Fax", value: "fax1" },
        { text: "Website", value: "website" }
      ],
      items: []
    };
  },
  computed: {
    ...mapGetters(["allCompanies"])
  },
  methods: {
    ...mapActions(["fetchCompanies"])
  },
  created() {
    this.fetchCompanies().then(resp => {
      if (resp.code == "200") {
        this.load = false;
      }
    });
  },
  mounted() {
    this.$root.$on("company-editor-close", () => {
      this.dialog = false;
    });
  }
};
</script>
<style scoped></style>
