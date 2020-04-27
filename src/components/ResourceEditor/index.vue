<template>
  <div>
    <v-card>
      <v-form ref="resource_form" v-model="valid" lazy-validation>
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
                v-model="editedItem.url"
                label="Url"
                :rules="urlRules"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field
                v-model="editedItem.alias"
                label="Alias"
                :rules="aliasRules"
                required
              ></v-text-field>
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
      urlRules: [v => !!v || "Valid url is required"],
      aliasRules: [v => !!v || "Alias is required"],
      snackbar: false,
      notification: "New entry saved",
      disable: false,
      loading: false,
      editedItem: {
        url: "",
        alias: ""
      }
    };
  },

  methods: {
    ...mapActions(["addResource"]),
    save() {
      if (this.$refs.resource_form.validate()) {
        let obj = {
          url: this.editedItem.url,
          alias: this.editedItem.alias
        };
        this.addResource(obj).then(resp => {
          if (resp.code == "200") {
            this.snackbar = true;
          }
        });
      }
    },

    close() {
      this.editedItem = {};
      this.$root.$emit("resource_form_close");
    }
  }
};
</script>
