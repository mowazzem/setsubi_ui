<template>
  <div>
    <v-card>
      <v-form v-model="valid" ref="setsubi_data_form" lazay-validation>
        <v-snackbar v-model="snackbar" :top="true" :timeout="2000" :vertical="true">
          {{ notification }}
        </v-snackbar>
        <v-card-title> </v-card-title>
        <v-progress-linear indeterminate :active="loading" absolute bottom height="8">
        </v-progress-linear>
        <v-card-text>
          <v-row class="inputsRow">
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-select
                v-model.number="editedItem.client_id"
                :items="allClients"
                item-text="client_name"
                item-value="id"
                label="Select Clients"
                :rules="clientRules"
                required
              >
              </v-select>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <!-- <v-text-field v-model="editedItem.setsubi_category_id" label="Category ID"></v-text-field> -->
              <v-select
                v-model.number="editedItem.setsubi_category_id"
                :items="setsubiCategories"
                item-text="name"
                item-value="value"
                label="Select Setsubi Category"
                v-on:input="onChange"
                :rules="categoryRules"
                required
              >
              </v-select>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-select
                v-model.number="editedItem.plants_id"
                :items="allPlants"
                item-text="plant_name"
                item-value="id"
                label="Select Plant"
                :rules="plantRules"
                required
              >
              </v-select>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-select
                v-model.number="editedItem.lines_id"
                :items="allLines"
                item-text="line_name"
                item-value="id"
                label="Select Line"
                :rules="lineRules"
                required
              >
              </v-select>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field v-model="editedItem.tag_no" label="Tag No."></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field
                v-model="editedItem.item_name"
                label="Item Name"
                :rules="itemnameRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field v-model="editedItem.model" label="Model"></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field v-model="editedItem.serial_number" label="Serial Number"></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateComputed"
                    label="Date of Manufecture"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="editedItem.date_of_manufec" no-title @input="menu=false">
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field
                v-model.number="editedItem.drawing_number"
                label="Drawing Number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-text-field
                v-model.number="editedItem.drawing_version"
                label="Drawing Version"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-select
                v-model.number="editedItem.company_id"
                :items="allCompanies"
                item-text="name"
                item-value="id"
                label="Select Company"
                :rules="companyRules"
                required
              >
              </v-select>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xs="6">
              <v-select
                v-model.number="editedItem.branch_id"
                :items="allBranches"
                item-text="name"
                item-value="id"
                label="Select Branch"
                :rules="branchRules"
                required
              >
              </v-select>
            </v-col>
            <v-col
              cols="12"
              lg="6"
              md="6"
              sm="6"
              xs="6"
              v-for="(scv, index) in editedItem.spec_columns_val"
              :key="'s' + index"
            >
              <v-text-field
                v-if="fileType(scv.type, 'string')"
                v-model="scv.value"
                :label="scv.name"
              ></v-text-field>
              <v-text-field
                v-if="fileType(scv.type, 'float')"
                v-model="scv.value"
                :label="scv.name"
              ></v-text-field>
              <v-file-input
                v-on:change="fileChange"
                v-model="dummyFile[scv.name]"
                multiple
                :label="scv.name"
                v-if="fileType(scv.type, 'file')"
              ></v-file-input>
            </v-col>
            <v-col
              cols="12"
              lg="6"
              md="6"
              sm="6"
              xs="6"
              v-for="(mcv, index) in editedItem.mainten_columns_val"
              :key="'m' + index"
            >
              <v-text-field
                v-if="fileType(mcv.type, 'string')"
                v-model="mcv.value"
                :label="mcv.name"
              ></v-text-field>
              <v-text-field
                v-if="fileType(mcv.type, 'float')"
                v-model="mcv.value"
                :label="mcv.name"
              ></v-text-field>
              <v-file-input
                v-on:change="fileChange"
                v-model="dummyFile[mcv.name]"
                multiple
                :label="mcv.name"
                v-if="fileType(mcv.type, 'file')"
              ></v-file-input>
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      date:new Date().toISOString().substr(0,10),
      valid: true,
      clientRules: [v => !!v || "Client is required"],
      categoryRules: [v => !!v || "Category is required"],
      plantRules: [v => !!v || "Plant is required"],
      lineRules: [v => !!v || "Line is required"],
      itemnameRules: [v => !!v || "Item name is required"],
      companyRules: [v => !!v || "Company is required"],
      branchRules: [v => !!v || "Branch is required"],
      notification: "",
      disable: false,
      loading: false,
      snackbar: false,
      menu: false,
      dummyFile: {}
    };
  },
  computed: {
    ...mapGetters([
      "getSetsubiCategories",
      "allCompanies",
      "allBranches",
      "allClients",
      "allPlants",
      "allLines",
      "setsubiDataEditedItem",
      "setsubiDataEditedItemIndex"
    ]),

    dateComputed(){
      return new Date(this.editedItem.date_of_manufec.toString()).toISOString().substr(0,10);

    },

    setsubiCategories() {
      let categories = this.getSetsubiCategories;
      let formatedCategories = [];
      categories.forEach(item => {
        formatedCategories.push({
          name: item.category_name,
          value: item.id,
          parent_id: item.parent_id
        });
      });
      return formatedCategories;
    },

    editedItem: {
      get() {
        return this.setsubiDataEditedItem;
      },
      set(item) {
        this.setSetsubiDataEditedItem(item);
        return this.setsubiDataEditedItem;
      }
    }
  },

  methods: {
    ...mapActions([
      "insertSetsubiData",
      "setSetsubiData",
      "fetchCompanies",
      "fetchBranches",
      "fetchClients",
      "fetchPlants",
      "fetchLines",
      "setSetsubiDataEditedItem",
      "changeSetsubiDataEditedItemIndex",
      "updateSetsubiData"
    ]),
    fileType(str1, str2) {
      if (str1 === str2) {
        return true;
      }
      return false;
    },
    onChange(val) {
      let categories = JSON.parse(JSON.stringify(this.getSetsubiCategories));
      let selectedCat = categories.find(item => {
        return item.id == val;
      });

      let hasChild = false;

      categories.forEach(item => {
        if (item.parent_id == selectedCat.id) {
          hasChild = true;
          return false;
        }
      });

      if (!hasChild) {
        let specCols = [];
        let maintenCols = [];
        selectedCat.spec_columns.forEach(item => {
          specCols.push({ name: item.name.replace(/[  ]/g, "_"), value: "", type: item.type });
        });
        selectedCat.mainten_columns.forEach(item => {
          maintenCols.push({ name: item.name.replace(/[  ]/g, "_"), value: "", type: item.type });
        });
        this.editedItem.spec_columns_val = specCols;
        this.editedItem.mainten_columns_val = maintenCols;
      } else {
        this.editedItem.spec_columns_val = [];
        this.editedItem.mainten_columns_val = [];
      }
    },

    close() {
      this.$root.$emit("dialogClose");
    },

    save() {
      let indx = this.setsubiDataEditedItemIndex;
      if (this.$refs.setsubi_data_form.validate()) {
        for (let k in this.dummyFile) {
          let f = this.dummyFile[k];
          f.forEach(item => {
            let blob = item.slice(0, item.size, item.type);
            let nwFile = new File([blob], k + "_" + item.name, { type: item.type });
            this.editedItem.files.push(nwFile);
          });
        }
        let objItem=Object.assign({},this.editedItem);
        objItem.date_of_manufec = new Date(objItem.date_of_manufec);
        this.loading = true;
        this.disable = true;

        if (indx > -1) {
          this.updateSetsubiData(objItem)
            .then(resp => {
              if (resp.code == "200") {
                this.notification = "item updated successfully";
                this.snackbar = true;
                this.loading = false;
                this.disable = false;
              }
            })
            .catch(() => {
              this.notification = "An error occured";
              this.snackbar = "true";
              this.loading = false;
              this.disable = false;
            });
        } else {
          this.insertSetsubiData(objItem)
            .then(() => {
              this.notification = "item added successfully";
              this.snackbar = true;
              this.loading = false;
              this.disable = false;
              this.$root.$emit("SetsubiDataStored", this.editedItem.setsubi_category_id);
            })
            .catch(() => {
              this.notification = "An error occured";
              this.snackbar = "true";
              this.loading = false;
              this.disable = false;
            });
        }
      }
    },

    fileChange(files) {
      console.log(files);
    }
  },

  created() {
    this.fetchCompanies();
    this.fetchBranches();
    this.fetchClients();
    this.fetchPlants();
    this.fetchLines();
  }
};
</script>
<style scoped>
.inputsRow {
  padding: 5px;
}
</style>
