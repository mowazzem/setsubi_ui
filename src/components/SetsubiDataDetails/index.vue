<template>
  <v-card raised>
    <v-progress-linear :active="loading" indeterminate absolute top> </v-progress-linear>
    <v-simple-table id="details_card">
      <template v-slot:default>
        <span></span>
        <thead>
          <tr>
            <th class="text-left">Column</th>
            <th class="text-left">Values</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.name">
            <td>{{ item.name }}</td>
            <td v-if="typeof item.value != 'object'">{{ item.value }}</td>
            <td v-if="typeof item.value == 'object'">
              <div v-for="(v, index) in item.value" :key="index">
                <a @click.prevent="fileDownload($event)" :href="v.url" :data-href="v.url">{{
                  v.name
                }}</a>
                <br />
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <a id="target" style="display: none"></a>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// import router from '../../router';
export default {
  data() {
    return {
      loading: false,
      plant: {},
      line: {},
      client: {},
      company: {},
      items: []
    };
  },
  methods: {
    ...mapActions([
      "toggleDetailLoading",
      "fetchOnePlant",
      "fetchOneLine",
      "fetchOneClient",
      "fetchFile"
    ]),
    fileDownload(e) {
      let url = e.target.getAttribute("data-href");
      this.fetchFile(url).then(resp => {
        let contentDisposition = resp.headers["content-disposition"];
        let fileName = contentDisposition.substring(contentDisposition.indexOf("=") + 1);

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(resp.data, fileName);
        } else {
          // var link = window.document.createElement("a");
          // link.href =window.URL.createObjectURL(resp.data);
          // link.download =fileName;
          // document.body.appendChild(link);
          // link.click();
          // document.body.removeChild(link);
          // console.log(this.getFile)
          // router.push({path:'/document/'});
          window.open("/document/",'_blank');
        }
      });
    }
  },
  computed: {
    ...mapGetters([
      "getSelectedSetsubiData",
      "getOnePlant",
      "getSetsubiCategories",
      "getUserInfo",
      "getFile"
    ])
  },
  created() {
    this.$root.$on("setsubiDetailsCreated", () => {
      this.loading = true;
      let singleSetsubi = JSON.parse(JSON.stringify(this.getSelectedSetsubiData));

      let plantPromise = this.fetchOnePlant(singleSetsubi.plants_id).then(res => {
        this.plant = res.result;
      });
      let linePromise = this.fetchOneLine(singleSetsubi.lines_id).then(res => {
        this.line = res.result;
      });
      let clientPromise = this.fetchOneClient(singleSetsubi.client_id).then(res => {
        this.client = res.result;
      });

      let category = this.getSetsubiCategories.find(item => {
        return item.id == singleSetsubi.setsubi_category_id;
      });

      Promise.all([plantPromise, linePromise, clientPromise]).then(() => {
        this.items = [];
        this.items.push({ name: "Item Name", value: singleSetsubi.item_name });
        this.items.push({ name: "Category", value: category.category_name });
        this.items.push({ name: "Client", value: this.client.client_name });
        this.items.push({ name: "Plant", value: this.plant.plant_name });
        this.items.push({ name: "Line", value: this.line.line_name });
        this.items.push({ name: "Tag No", value: singleSetsubi.tag_no });
        this.items.push({ name: "Model", value: singleSetsubi.model });
        this.items.push({ name: "Serial Number", value: singleSetsubi.model });
        this.items.push({
          name: "Date of manufecture",
          value: new Date(singleSetsubi.date_of_manufec).toLocaleDateString()
        });
        this.items.push({ name: "Drawing Number", value: singleSetsubi.drawing_number });
        this.items.push({ name: "Drawing version", value: singleSetsubi.drawing_version });

        category.spec_columns.forEach(item => {
          let colName = item.name;
          let colValue = item.name.replace(/[  ]/g, "_");
          this.items.push({ name: colName, value: singleSetsubi[colValue] });
        });

        category.mainten_columns.forEach(item => {
          let colName = item.name;
          let colValue = item.name.replace(/[  ]/g, "_");
          this.items.push({ name: colName, value: singleSetsubi[colValue] });
        });
        this.loading = false;
      });
    });
  },
  watch: {},
  mounted() {}
};
</script>
<style scoped></style>
