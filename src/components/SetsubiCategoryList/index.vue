<template>
  <div>
    <v-snackbar v-model="snackbar" :top="true" :timeout="2000" :vertical="true">
      item added successfully
    </v-snackbar>
    <v-data-table
      :headers="headers"
      :loading="isloaded"
      loading-text="Loading...please wait"
      :items="items"
      :items-per-page="5"
      class="elevation-10"
    >
      <template v-slot:top>
        <v-toolbar flat color="">
          <v-btn @click="loadCategories" small color="primary" dark fab outlined>
            <v-icon>mdi-reload</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-dialog class="" v-model="dialog" max-width="750px">
            <v-toolbar color="green">
              <span class="headline">New Item </span>
            </v-toolbar>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" small dark fab outlined class="mt-2" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card class="" style="padding:0px; margin:0px;">
              <v-progress-linear :active="loading" indeterminate absolute bottom> </v-progress-linear>
              <v-card-title> </v-card-title>
              <v-card-text class="pa-2">
                <v-form class="pa-0 ma-0" ref="form" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="6" md="4" hidden>
                      <v-text-field v-model="editedItem.id" label="Id"></v-text-field>
                    </v-col>
                    <v-col cols="6" style="margin-top:5px">
                      <v-text-field
                        v-model="editedItem.category_name"
                        filled
                        label="Category Name"
                        :rules="nameRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <label style="color:green">Set Parent Category</label>
                      <v-combobox
                        dense
                        v-model="parentModel"
                        :items="categories"
                        item-text="category_name"
                        item-value="id"
                        return-object
                        outlined
                        :rules="parentRules"
                        required
                      >
                      </v-combobox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-card class="" raised>
                        <v-toolbar dense flat color="light-green">
                          <label>Specifications</label>
                          <v-spacer></v-spacer>
                          <v-btn text @click="specAdd">
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </v-toolbar>
                        <v-row no-gutters class="ma-0 pa-1 " v-for="(scm, index) in editedItem.spec_columns" :key="index">
                          <v-col lg="8" md="8" sm="8" cols="8">
                            <div class="d-flex" style="width:100%;">
                              <label style="margin-top:15px">Column {{ index + 1 }}</label>
                              <v-spacer></v-spacer>
                              <v-btn text @click="specAdd"><v-icon>mdi-plus</v-icon></v-btn>
                            </div>
                            <v-text-field v-model="scm.name" dense filled></v-text-field>
                          </v-col>
                          <v-col lg="3" md="3" sm="3" cols="2" style="margin-top:20px">
                            <label style="color:green;">Type</label>
                            <v-select dense v-model="scm.type" :items="dataTypes" item-text="name" item-value="type"> </v-select>
                          </v-col>
                          <v-col lg="1" md="1" sm="1" cols="2" style="margin-top:40px">
                            <v-btn text @click="specFieldClose(index)"><v-icon>mdi-close</v-icon></v-btn>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row>
                    <v-col cols="12">
                      <v-card class="" raised>
                        <v-toolbar dense flat color="light-green">
                          <label>Maintenance</label>
                          <v-spacer></v-spacer>
                          <v-btn text @click="maintenAdd">
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </v-toolbar>
                        <v-row no-gutters class="ma-0 pa-1" v-for="(mcm, index) in editedItem.mainten_columns" :key="index">
                          <v-col lg="8" md="8" sm="8" cols="8">
                            <div class="d-flex" style="width:100%">
                              <label style="margin-top:15px">Column {{ index + 1 }}</label>
                              <v-spacer></v-spacer>
                              <v-btn text @click="maintenAdd"><v-icon>mdi-plus</v-icon></v-btn>
                            </div>
                            <v-text-field v-model="mcm.name" dense filled></v-text-field>
                          </v-col>
                          <v-col lg="3" md="3" sm="3" cols="2" style="margin-top:20px">
                            <label style="color:green;">Type</label>
                            <v-select dense v-model="mcm.type" :items="dataTypes" item-text="name" item-value="type"> </v-select>
                          </v-col>
                          <v-col lg="1" md="1" sm="1" cols="2" style="margin-top:40px">
                            <v-btn text @click="maintenFieldClose(index)">
                              <v-icon>
                                mdi-close
                              </v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" class="disable=loading" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      valid:true,
      nameRules:[
        v=>!!v||"Category name is required"
      ],
      parentRules:[
        v=>!!v||"Parent category is required"
      ],
      loading: false,
      isloaded: true,
      dialog: false,
      snackbar: false,
      fieldRules: [v => !!v || "E-mail is required"],
      headers: [
        {
          text: "Category Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Parent", value: "parent" }
      ],
      dataTypes: [],
      categories: [],
      parentModel: { id: null, category_name: "select parent", spec_columns: [], mainten_columns: [], parent_id: 0 },
      editedItem: {
        id: 0,
        category_name: "",
        spec_columns: [],
        mainten_columns: [],
        parent_id: 0
      },
      items: []
    };
  },
  computed: {
    ...mapGetters(["getSetsubiCategories", "getDataTypes"])
  },
  methods: {
    ...mapActions(["fetchSetsubiCategories", "pushSetsubiCategory"]),
    loadCategories() {
      let datas = JSON.parse(JSON.stringify(this.getSetsubiCategories));
      this.categories = datas;
      this.renderCategories(this.categories);
    },
    close() {
      this.dialog = false;
      this.editedItem.spec_columns = [];
      this.editedItem.mainten_columns = [];
      this.dataType = {};
      this.mcDataType = {};
    },
    save() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.editedItem.parent_id = this.parentModel.id;
        this.pushSetsubiCategory(this.editedItem).then(response => {
          let obj = JSON.parse(JSON.stringify(response));
          this.categories.unshift(obj);
          this.renderCategories(this.categories);
          this.loading = false;
          this.snackbar = true;
        });
      }
    },
    specAdd() {
      this.editedItem.spec_columns.push({ name: "", type: "" });
    },
    maintenAdd() {
      this.editedItem.mainten_columns.push({ name: "", type: "" });
    },
    specFieldClose(index) {
      this.editedItem.spec_columns.splice(index, 1);
      this.dataType = {};
    },
    maintenFieldClose(index) {
      this.editedItem.mainten_columns.splice(index, 1);
      this.mcDataType = {};
    },
    renderCategories(categories) {
      let items = [];
      let datas = categories;
      datas.forEach(data => {
        let jsonObj = new Object();
        jsonObj.name = data.category_name;
        datas.forEach(d => {
          if (d.parent == 0) {
            jsonObj.parent = "null";
            return false;
          } else if (data.parent_id == d.id) {
            jsonObj.parent = d.category_name;
            return false;
          }
        });
        items.push(jsonObj);
      });
      this.items = items;
    },
    mcOnChange() {},
    scOnChange() {}
  },
  created() {
    this.fetchSetsubiCategories().then(response => {
      if (response == "200") {
        let objs = this.getSetsubiCategories;
        let datas = JSON.parse(JSON.stringify(objs));
        this.categories = datas;
        this.renderCategories(this.categories);

        let dts = this.getDataTypes;
        dts = JSON.parse(JSON.stringify(dts));
        this.dataTypes = dts;

        this.isloaded = false;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.col {
  margin: 0px;
}
.itemCard {
  padding: 5px;
}
</style>
