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
        <v-form v-model="valid" ref="branch_form" lazy-validation>
          <v-row class="inputsRow">
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field
                v-model="editedItem.name"
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
              <!-- <v-text-field v-model="editedItem.setsubi_category_id" label="Category ID"></v-text-field> -->
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
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      valid: true,
      nameRules: [v => !!v || "Name is required"],
      addressRules: [v => !!v || "Address is required"],
      companyRules: [v => !!v || "Company is required"],
      notification: "",
      disable: false,
      loading: false,
      snackbar: false,
      editedItem: {
        name: "",
        address: "",
        company_id: ""
      }
    };
  },
  computed: {
    ...mapGetters(["allCompanies"])
  },
  methods: {
    ...mapActions(["insertBranch", "fetchCompanies"]),
    save() {
      if (this.$refs.branch_form.validate()) {
        this.editedItem.company_id = this.editedItem.company_id.id;
        this.insertBranch(this.editedItem);
      }
    },
    close() {
      this.$root.$emit("branch-editor-close");
      this.editedItem = {};
    }
  },
  mounted() {
    this.fetchCompanies();
  }
};
</script>
