<template>
  <!-- <v-card class="card" flat > -->
  <div>
    <v-snackbar vertical top v-model="snackbar" :timeout="1500">{{ notify }} </v-snackbar>
    <!-- <v-toolbar flat color="green"> -->
    <!--   <v-toolbar-title>Setsubi Category</v-toolbar-title> -->
    <!-- </v-toolbar> -->
    <v-row dense class="ma-0 pa-0" >
      <v-col v-on:click="divClick(this, -1)" class="d-flex" cols="4" lg="2" md="2" sm="6" xs="6" >
        <v-combobox
          class="ma-0"
          v-model="select"
          :items="items.master"
          item-text="name"
          item-value="val"
          outlined
          return-object
          dense
          v-on:input="onChange"
        >
        </v-combobox>
      </v-col>
      <v-col class="d-flex ma-0" dense cols="4" lg="2" md="2" sm="6" xs="6" v-for="(item, index) in selects" v-on:click="divClick(this, index)" :key="index">
        <v-combobox
          class=""
          v-model="childModels[index]"
          :items="item"
          item-text="name"
          item-value="val"
          outlined
          dense
          return-object
          v-on:input="onChange"
        ></v-combobox>
      </v-col >
      <v-col cols="4" lg="2" md="2" sm="6" xs="6" class="d-flex ma-0 ">
      <v-btn outlined dark :class="hasChild ? 'warning disabled' : 'primary'" @click="loadData">
          <v-icon>
              mdi-reload
          </v-icon>
      </v-btn>
      </v-col>

    </v-row>
    <!-- <v-card-actions> -->
      <!-- <v-spacer /> -->
    <!-- </v-card-actions> -->
  <!-- </v-card> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      hasChild: true,
      snackbar: false,
      notify: "",
      catId: 0,
      categories: [],
      items: {
        master: [{ name: "select", val: -1 }]
      },
      select: { name: "select", val: -1 },
      selects: [],
      childModels: []
    };
  },
  computed: {
    ...mapGetters(["getSetsubiCategories"])
  },
  methods: {
    ...mapActions(["fetchSetsubiCategories"]),
    onChange(item) {
      let obj = JSON.parse(JSON.stringify(item));
      let childObjArray = [];
      let hasChild = false;
      this.categories.forEach(category => {
        if (category.parent_id === obj.val) {
          let selectObj = { name: category.category_name, val: category.id };
          childObjArray.push(selectObj);
          hasChild = true;
        }
      });
      if (!hasChild && obj.val != -1) {
        this.catId = obj.val;
        this.hasChild = false;
      } else {
        this.catId = 0;
        this.hasChild = true;
      }
      if (obj.val != -1 && childObjArray.length > 0) {
        childObjArray.unshift({ name: "select", val: -1 });
        this.childModels.push({ name: "select", val: -1 });
        this.selects.push(childObjArray);
      }
    },
    divClick(e, index) {
      if (index == -1) {
        this.selects = [];
        this.childModels = [];
      } else {
        this.selects = this.selects.slice(0, index + 1);
        // this.childModels=this.childModels.slice(0,index+1);
      }
    },
    loadData() {
      if (this.catId != 0) {
        this.$root.$emit("scIdChanged", this.catId);
      }
    }
  },
  created() {
    this.fetchSetsubiCategories().then(response => {
      if (response == "200") {
        let sc = this.getSetsubiCategories;
        var res = JSON.parse(JSON.stringify(sc));
        this.categories = res;
        res.forEach(item => {
          if (item.parent_id === 0) {
            this.items.master.push({ name: item.category_name, val: item.id });
          }
        });
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.card {
  margin-bottom: 5px;
  padding: 0px;
  padding-bottom: 0px;
}
.selects {
  margin-bottom: 0px !important;
}
.gird-row {
  margin-top: 0px;
  padding: 10px;
}
.disabled {
  pointer-events: none;
}
</style>
