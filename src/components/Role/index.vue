<template>
  <v-data-table
    :headers="headers"
    :loading="load"
    loading-text="Loading...please wait"
    :items="allRoles"
    :items-per-page="5"
    class="elevation-10"
  >
    <template v-slot:top>
      <v-toolbar color="" flat>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
          <v-toolbar color="green">
            <span class="headline">New Item </span>
          </v-toolbar>
          <template v-slot:activator="{ on }">
            <v-btn small fab outlined color="primary" class="mb-2" v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <roleEditor/>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import roleEditor from "../RoleEditor";
export default {
  components:{
    roleEditor
  },

  data() {
    return {
      load:true,
      dialog:false,
      headers: [
        { text: "Name", value: "role_name" },
        { text: "Generic Type", value: "generic_role" }
      ]
    };
  },

  computed: {
    ...mapGetters(["allRoles"])
  },

  methods: {
    ...mapActions(["fetchRoles"])
  },

  created() {
    this.fetchRoles()
      .then(resp=>{
        if(resp.code=="200"){
          this.load=false;
        }
      });
  },

  mounted(){
    this.$root.$on('role-editor-close',()=>{
      this.dialog=false;
    });

  }


};
</script>

<style scoped></style>
