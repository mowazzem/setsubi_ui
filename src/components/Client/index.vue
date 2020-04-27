<template>
  <v-data-table
    :headers="headers"
    :loading="load"
    loading-text="Loading...please wait"
    :items="items"
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
          <ClientEditor />
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- <v-progress-linear :active="loading" indeterminate absolute bottom> </v-progress-linear> -->
  </v-data-table>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ClientEditor from "../ClientEditor";
export default {
  components: {
    ClientEditor
  },
  data() {
    return {
      load: true,
      isLoading: true,
      dialog: false,
      headers: [
        { text: "Client Name", value: "client_name" },
        { text: "Address", value: "address" },
        { text: "Email", value: "email" },
        { text: "Phone No", value: "phone_no1" },
        { text: "Fax", value: "fax1" },
        { text: "Website", value: "website" },
        { text: "Company", value: "company" },
        { text: "Branch", value: "branch" }
      ]
    };
  },
  computed: {
    ...mapGetters(["allClients", "allCompanies", "allBranches"]),
    items() {
      return this.allClients.map(item => {
        return {
          client_name: item.client_name,
          address: item.address,
          email: item.email,
          phone_no1: item.phone_no1,
          fax1: item.fax1,
          website: item.website,
          company: this.allCompanies.find(company => {
            return company.id == item.company_id;
          }).name,
          branch: this.allBranches.find(branch => {
            return branch.id == item.branch_id;
          }).name
        };
      });
    }
  },
  methods: {
    ...mapActions(["fetchClients", "fetchCompanies", "fetchBranches"])
  },
  created() {
    let companyPromise = this.fetchCompanies();
    let branchPromise = this.fetchBranches();
    Promise.all([companyPromise, branchPromise]).then(() => {
      this.fetchClients().then(resp => {
        if (resp.code == "200") {
          this.load = false;
        }
      });
    });
  },
  mounted() {
    this.$root.$on("client-editor-close", () => {
      this.dialog = false;
    });
  }
};
</script>
<style scoped></style>
