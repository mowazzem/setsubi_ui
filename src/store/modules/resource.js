const resources = {
  state: {
    resources: []
  },

  mutations: {
    setResources: (state, resources) => {
      state.resources = resources;
    },

    addResource: (state, resource) => {
      state.resources.unshift(resource);
    }
  },

  actions: {
    fetchResources({ commit }) {
      return new Promise((resolve, reject) => {
        window.axios
          .get("/api/resource/")
          .then(resp => {
            let data = resp.data;
            if (data.code == "200") {
              commit("setResources", data.result);
              resolve(data);
            } else {
              reject(data.code);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    addResource({ commit }, resource) {
      return new Promise((resolve, reject) => {
        window.axios.post("/api/resource/", resource).then(resp => {
          let data = resp.data;
          if (data.code == "200") {
            commit("addResource", data.result);
            resolve(data);
          } else {
            reject(data.code);
          }
        });
      });
    }
  },

  getters: {
    allResources: state => {
      return state.resources;
    }
  }
};

export default resources;
