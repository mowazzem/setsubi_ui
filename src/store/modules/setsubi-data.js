// import {formatDate} from "../../utils/formatDate.js";
const setsubiData = {
  state: {
    setsubiDatas: [],
    selectedSetsubiData: {},
    detailLoading: false,
    editedItem: {
      client_id: "",
      setsubi_category_id: "",
      plants_id: "",
      lines_id: "",
      tag_no: "",
      item_name: "",
      model: "",
      serial_number: "",
      date_of_manufec: new Date().toISOString().substr(0,10),
      drawing_number: 0,
      drawing_version: 0,
      branch_id: "",
      company_id: "",
      spec_columns_val: [],
      mainten_columns_val: [],
      files: []
    },
    editedItemIndex: -1
  },
  mutations: {
    setSetsubiDatas: (state, datas) => {
      state.setsubiDatas = datas;
    },

    setSetsubiData: (state, data) => {
      state.setsubiDatas.push(data);
    },

    setSelectedSetsubiData: (state, data) => {
      state.selectedSetsubiData = data;
    },

    toggleDetailLoading: (state, data) => {
      state.detailLoading = data;
    },

    setEditedItem: (state, editedItem) => {
      state.editedItem = editedItem;
    },

    changeEditedItemIndex: (state, index) => {
      state.editedItemIndex = index;
    },

    updateSetsubiData: (state, data) => {
      state.setsubiDatas = state.setsubiDatas.map(item => {
          if(item.id==data.id){
              let dom=data.date_of_manufec;
              if(typeof(dom)=="string"){
                  data.date_of_manufec=new Date(dom).toISOString().substr(0,10);
              }else if(typeof(dom)=="object"){
                  data.date_of_manufec=dom.toISOString().substr(0,10);
              }
              return data;
          }else{
              return item;
          }
      });
    }
  },

  actions: {
    fetchSetsubiDatas: ({ commit }, queryParams) => {
      return new Promise((resolve, reject) => {
        window.axios
          .get("/api/setsubi-data/", { params: queryParams })
          .then(response => {
            if (response.data.code == "200") {
              commit("setSetsubiDatas", response.data.result);
              resolve(response.data.code);
            } else {
              reject(response.data.code);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    insertSetsubiData({ commit }, data) {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        let files = data.files;
        delete data.files;

        let body = JSON.stringify(data);
        formData.append("body", body);
        files.forEach(item => {
          formData.append("files", item);
        });
        window.axios
          .post("/api/setsubi-data/", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(response => {
            if (response.data.code == 200) {
              commit("setSetsubiData", response.data.result);
              resolve(response.data.result);
            } else {
              reject(response.data.code);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    updateSetsubiData({ commit }, editItem) {
      return new Promise((resolve, reject) => {
        window.axios
          .put("/api/setsubi-data/" + editItem.id, editItem)
          .then(resp => {
            let data = resp.data;
            if (data.code == "200") {
              commit("updateSetsubiData", data.result);
              resolve(data);
            }
          })
          .catch(error => {
              console.log(error)
            reject(error);
          });
      });
    },

    setSetsubiData({ commit }, data) {
      commit("setSetsubiData", data);
    },

    setSelectedSetsubiData({ commit }, data) {
      commit("setSelectedSetsubiData", data);
    },

    toggleDetailLoading({ commit }, data) {
      commit("toggleDetailLoading", data);
    },

    setSetsubiDataEditedItem({ commit }, editedItem) {
      commit("setEditedItem", editedItem);
    },

    changeSetsubiDataEditedItemIndex({ commit }, index) {
      commit("changeEditedItemIndex", index);
    },
  },
  getters: {
    getSetsubiDatas: state => {
      return state.setsubiDatas;
    },

    getSelectedSetsubiData: state => {
      return state.selectedSetsubiData;
    },

    getDetailLoading: state => state.detailLoading,

    setsubiDataEditedItem: state => state.editedItem,

    setsubiDataEditedItemIndex: state => state.editedItemIndex
  }
};

export default setsubiData;
