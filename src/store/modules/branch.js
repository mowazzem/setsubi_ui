const branch = {
  state: {
    branches: []
  },
  mutations: {
    setBranches: (state, branches) => {
      state.branches = branches;
    },
    addBranch: (state, branch) => {
      state.branches.unshift(branch);
    }
  },
  actions: {
    fetchBranches({ commit }) {
      return new Promise((resolve, reject) => {
        window.axios
          .get("/api/branch/")
          .then(resp => {
            let data = resp.data;
            let code = data.code;
            let result = data.result;
            if (code == "200") {
              commit("setBranches", result);
              resolve(data);
            } else {
              reject(code);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    insertBranch({ commit }, branch) {
      return new Promise((resolve, reject) => {
        window.axios
          .post("/api/branch/", branch)
          .then(resp => {
            let data = resp.data;
            let code = data.code;
            let result = data.result;
              console.log(result)
            if (code == "200") {
              commit("addBranch", result);
              resolve(result);
            } else {
              reject(code);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  getters: {
    allBranches: state => {
      return state.branches;
    }
  }
};

export default branch;
