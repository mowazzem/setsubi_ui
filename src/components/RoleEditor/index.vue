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
        <v-form ref="role_form" v-model="valid" lazy-validation>
          <v-row class="inputsRow">
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field
                v-model="editedItem.role_name"
                label="Name"
                :rules="rolenameRules"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-combobox
                v-model="editedItem.generic_role"
                :items="genericRoles"
                item-text="label"
                item-value="value"
                label="Select Generic Type"
                :rules="genericRolesRules"
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
      rolenameRules: [v => !!v || "Name is Required"],
      genericRolesRules: [v => !!v || "Generic Type Required"],
      notification: "New entry saved",
      disable: false,
      loading: false,
      snackbar: false,
      editedItem: {
        role_name: "",
        generic_role: ""
      },
      genericRoles: [
        { label: "User", value: "USER" },
        { label: "Super Admin", value: "SUPER_ADMIN" },
        { label: "Company Admin", value: "COMPANY_ADMIN" },
        { label: "Branch Admin", value: "BRANCH_ADMIN" }
      ]
    };
  },

  methods: {
    ...mapActions(["addRole"]),

    close() {
      this.$root.$emit("role-editor-close");
      this.editedItem = {};
    },

    save() {
      if (this.$refs.role_form.validate()) {
        let obj = {
          role_name: this.editedItem.role_name,
          generic_role: this.editedItem.generic_role.value
        };
        this.addRole(obj)
          .then(resp => {
            if(resp.code=="200"){
            this.snackbar = true;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
