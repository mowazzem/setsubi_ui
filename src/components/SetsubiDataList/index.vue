<template>
  <div>
    <v-card class="card" raised>
      <v-data-table
        :headers="headers"
        :loading="isLoading"
        loading-text="Loading....Please wait."
        :items="items"
        :items-per-page="5"
        class="elevation-1"
        @click:row="rowClick"
      >
        <template v-slot:top>
          <SetsubiCategoryDropDown />
          <v-toolbar color="" flat>
            <!-- <v-toolbar-title style="color:green">Setsubi Data list</v-toolbar-title> -->
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="700px">
              <v-toolbar color="green">
                <span class="headline">{{ formTitle }}</span>
              </v-toolbar>
              <template v-if="hasAccess('setsubi-data', ['CREATE'])" v-slot:activator="{ on }">
                <v-btn small fab outlined color="primary" class="mb-2" v-on="on">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <SetsubiDataEditor />
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon class="mr-2" color="purple" @click="gotoDetails(item)">
            mdi-details
          </v-icon>
          <v-icon class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon class="mr-2" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SetsubiDataEditor from "../SetsubiDataEditor";
import SetsubiCategoryDropDown from "../SetsubiCategoryDropDown";
import { hasAccess } from "@/utils/auth.js";
export default {
  components: {
    SetsubiDataEditor,
    SetsubiCategoryDropDown
  },
  data() {
    return {
      dialog: false,
      isLoading: false,
      defaultItem: {
        client_id: "",
        setsubi_category_id: "",
        plants_id: "",
        lines_id: "",
        tag_no: "",
        item_name: "",
        model: "",
        serial_number: "",
        date_of_manufec: new Date().toISOString().substr(0, 10),
        drawing_number: 0,
        drawing_version: 0,
        branch_id: "",
        company_id: "",
        spec_columns_val: [],
        mainten_columns_val: [],
        files: []
      }
    };
  },
  methods: {
    ...mapActions([
      "fetchSetsubiDatas",
      "setSelectedSetsubiData",
      "toggleDetailLoading",
      "setSetsubiDataEditedItem",
      "changeSetsubiDataEditedItemIndex"
    ]),
    hasAccess,
    renderTableDatas() {
      let objs = this.getSetsubiDatas;

      let setsubiDatas = JSON.parse(JSON.stringify(objs));

      setsubiDatas.forEach(item => {
        item.spec_columns_val.map(scv => {
          item[scv.name] = scv.value;
        });
        item.mainten_columns_val.map(mcv => {
          item[mcv.name] = mcv.value;
        });
        // item.date_of_manufec = new Date(item.date_of_manufec).toISOString().substr(0,10);
      });
      this.items = setsubiDatas;
    },
    rowClick() {
      //this.setSelectedSetsubiData(item);
      //this.$root.$emit("setsubiDataRowClicked");
    },
    gotoDetails(item) {
      this.setSelectedSetsubiData(item);
      this.$root.$emit("setsubiDataRowClicked");
      setTimeout(() => {
        this.$vuetify.goTo("#details_card", {});
      }, 1000);
    },

    editItem(item) {
      let indx = this.items.indexOf(item);
      this.setSetsubiDataEditedItem(Object.assign({},item));
      this.changeSetsubiDataEditedItemIndex(indx);
      this.dialog = true;
    },

    deleteItem(item) {
      this.changeSetsubiDataEditedItemIndex(-1);
      console.log(item);
    },

    close() {
      this.setSetsubiDataEditedItem(this.defaultItem);
      this.changeSetsubiDataEditedItemIndex(-1);
    }
  },
  computed: {
    ...mapGetters([
      "getSetsubiDatas",
      "getSetsubiCategories",
      "getDetailLoading",
      "getUserInfo",
      "setsubiDataEditedItemIndex"
    ]),

    items(){
      let objs = this.getSetsubiDatas;

      let setsubiDatas = JSON.parse(JSON.stringify(objs));

      setsubiDatas.forEach(item => {
        item.spec_columns_val.map(scv => {
          item[scv.name] = scv.value;
        });
        item.mainten_columns_val.map(mcv => {
          item[mcv.name] = mcv.value;
        });
        if(typeof(item.date_of_manufec)=="string"){
        item.date_of_manufec = new Date(item.date_of_manufec).toISOString().substr(0,10);
        }else{
          item.date_of_manufec=item.date_of_manufec.toISOString().substr(0,10);
        }
      });
      return setsubiDatas;

    },

    formTitle() {
      return this.setsubiDataEditedItemIndex == -1 ? "New Entry" : "Edit Entry";
    },

    headers: {
      get() {
        return [
          { text: this.$t("setsubi_data").item_name, value: "item_name" },
          { text: this.$t("setsubi_data").tag_no, value: "tag_no" },
          { text: this.$t("setsubi_data").model, value: "model" },
          { text: this.$t("setsubi_data").serial_number, value: "serial_number" },
          { text: this.$t("setsubi_data").date_of_menufec, value: "date_of_manufec" },
          { text: this.$t("setsubi_data").drawing_no, value: "drawing_number" },
          { text: this.$t("setsubi_data").drawing_version, value: "drawing_version" },
          { text: this.$t("setsubi_data").actions, value: "actions" }
        ];
      },
      set(val) {return val}
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },

  },

  created() {
    this.$root.$on("scIdChanged", scId => {
      this.isLoading = true;
      this.fetchSetsubiDatas({
        setsubi_category_id: scId,
        branch_id: this.getUserInfo.bid,
        company_id: this.getUserInfo.cid
      })
        .then(response => {
          if (response == "200") {
            this.isLoading = false;
            this.headers = this.headers.slice(0, 7);
          }
        })
        .catch(error => {
          console.log(error);
        });
    });

    this.$root.$on("dialogClose", () => {
      this.dialog = false;
    });

    // this.$root.$on("SetsubiDataStored", scId => {
    //   this.renderTableDatas(scId);
    // });
  }
};
</script>
<style scooped>
.card {
  padding: 0px;
}
</style>
