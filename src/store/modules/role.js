const roles = {
  state: {
    roles: []
  },
  mutations: {
    setRoles: (state, roles) => {
      state.roles = roles;
    },

    addRole: (state, role) => {
      state.roles.unshift(role);
    }
  },
  actions: {
    fetchRoles({ commit }) {
      return new Promise((resolve, reject) => {
        window.axios
          .get("/api/role/")
          .then(res => {
            let data = res.data;
            if (data.code == "200") {
              commit("setRoles", data.result);
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

    addRole({ commit }, role) {
      return new Promise((resolve, reject) => {
        window.axios
          .post("/api/role/", role)
          .then(response => {
            let data = response.data;
            if (data.code == "200") {
              commit("addRole", data.result);
              resolve(data);
            } else {
              reject(data.code);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  getters: {
    allRoles: state => {
      return state.roles;
    }
  }
};

export default roles;
