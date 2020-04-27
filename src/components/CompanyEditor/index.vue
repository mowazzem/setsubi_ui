<template>
  <div>
    <v-card>
      <v-form v-model="valid" ref="company_form" lazy-validation>
        <v-snackbar v-model="snackbar" :top="true" :timeout="2000" :vertical="true">
          {{ notification }}
        </v-snackbar>
        <v-card-title> </v-card-title>
        <v-progress-linear indeterminate :active="loading" absolute bottom height="8">
        </v-progress-linear>
        <v-card-text>
          <v-row class="inputsRow">
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field
                v-model.number="editedItem.name"
                label="Name"
                :rules="nameRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field
                v-model.number="editedItem.address"
                label="Address"
                :rules="addressRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field
                v-model.number="editedItem.email"
                label="Email"
                :rules="emailRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field v-model="editedItem.phone1" label="Phone"></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field v-model="editedItem.fax1" label="Fax"></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field v-model="editedItem.website" label="Website"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn
            :disabled="disable"
            color="blue darken-1"
            class="disable=loading"
            text
            @click="save"
            >Save</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
      nameRules: [v => !!v || "Name is required"],
      addressRules: [v => !!v || "Address is required"],
      emailRules: [v => !!v || "Email is required"],
      notification: "",
      disable: false,
      loading: false,
      snackbar: false,
      editedItem: {
        name: "",
        address: "",
        email: "",
        phone1: "",
        fax1: "",
        website: ""
      }
    };
  },

  methods: {
    ...mapActions(["insertCompany"]),
    save() {
      if (this.$refs.company_form.validate()) {
        this.insertCompany(this.editedItem)
          .then(resp => {
            console.log(resp);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    close() {
      this.$root.$emit("company-editor-close");
      this.editedItem = {};
    }
  }
};
</script>
