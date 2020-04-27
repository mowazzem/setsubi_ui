const setsubiCategory = {
  state: {
    setsubiCategories: []
  },
  mutations: {
    setSetsubiCategories: (state, categories) => {
      state.setsubiCategories = categories;
    },
    setSetsubiCategory: (state, category) => {
      state.setsubiCategories.push(category);
    }
  },
  actions: {
    fetchSetsubiCategories({ commit }) {
      return new Promise((resolve, reject) => {
        window.axios
          .get(`/api/setsubi-category/`)
          .then(response => {
            commit("setSetsubiCategories", response.data.result);
            resolve(response.data.code);
          })
          .catch(error => {
            console.log("vuex error" + error);
            reject(error);
          });
      });
    },
    pushSetsubiCategory({ commit }, category) {
      return new Promise((resolve, reject) => {
        window.axios
              .post("/api/setsubi-category/",{
                  id:category.id,
                  category_name:category.category_name,
                  spec_columns:category.spec_columns,
                  mainten_columns:category.mainten_columns,
                  parent_id:category.parent_id
              })
          .then(response => {
            commit("setSetsubiCategory", response.data.result);
            resolve(response.data.result);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    }
  },
  getters: {
    getSetsubiCategories: state => {
      return state.setsubiCategories;
    }
  }
};

export default setsubiCategory;
