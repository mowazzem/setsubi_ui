<template>
  <div>
    <v-card>
      <v-snackbar v-model="snackbar" :top="true" :timeout="2000" :vertical="true">
        {{ notification }}
      </v-snackbar>
      <v-card-title> </v-card-title>
      <v-progress-linear indeterminate :active="loading" absolute bottom height="8">
      </v-progress-linear>
      <v-card-text>
        <v-form v-model="valid" ref="client_form" lazy-validation>
          <v-row class="inputsRow">
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field
                v-model="editedItem.client_name"
                label="Name"
                :rules="nameRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field
                v-model="editedItem.address"
                label="Address"
                :rules="addressRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field v-model="editedItem.phone_no1" label="Phone"></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field v-model="editedItem.fax_no1" label="Fax"></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field v-model="editedItem.website" label="Website"></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-combobox
                v-model.number="editedItem.company_id"
                :items="allCompanies"
                item-text="name"
                item-value="id"
                label="Select Company"
                :rules="companyRules"
                required
              >
              </v-combobox>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-combobox
                v-model.number="editedItem.branch_id"
                :items="allBranches"
                item-text="name"
                item-value="id"
                label="Select Branch"
                :rules="branchRules"
                required
              >
              </v-combobox>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn :disabled="disable" color="blue darken-1" class="disable=loading" text @click="save"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
      nameRules: [v => !!v || "Name is required"],
      addressRules: [v => !!v || "Address is required"],
      companyRules: [v => !!v || "Company is required"],
      branchRules: [v => !!v || "Branch is required"],
      notification: "",
      disable: false,
      loading: false,
      snackbar: false,
      editedItem: {
        client_name: "",
        address: "",
        email: "",
        phone_no1: "",
        fax_no1: "",
        website: "",
        company_id: "",
        branch_id: ""
      }
    };
  },
  computed: {
    ...mapGetters(["allCompanies", "allBranches"])
  },
  methods: {
    ...mapActions(["fetchCompanies", "fetchBranches", "insertClient"]),
    close() {
      this.$root.$emit("client-editor-close");
      this.editedItem = {};
    },
    save() {
      if (this.$refs.client_form.validate()) {
        this.editedItem.company_id = this.editedItem.company_id.id;
        this.editedItem.branch_id = this.editedItem.branch_id.id;
        this.insertClient(this.editedItem);
      }
    }
  },
  created() {
    this.fetchCompanies();
    this.fetchBranches();
  }
};
</script>
