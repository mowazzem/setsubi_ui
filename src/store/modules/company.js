export default {
  state: {
    companies: []
  },
  mutations: {
    setCompanies: (state, companies) => {
      state.companies = companies;
    },
    addCompany: (state, company) => {
      state.companies.unshift(company);
    }
  },
  actions: {
    fetchCompanies({ commit }) {
      return new Promise((resolve, reject) => {
        window.axios
          .get("/api/company/")
          .then(res => {
            let data = res.data;
            if (data.code == "200") {
              commit("setCompanies", data.result);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchOneCompany({ commit }, id) {
      return new Promise((resolve, reject) => {
        window.axios
          .get("/api/company/" + id)
          .then(res => {
            let data = res.data;
            if (data.code == "200") {
              commit();
              resolve(data.result);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    insertCompany({ commit }, company) {
      return new Promise((resolve, reject) => {
        window.axios
          .post("/api/company/", company)
          .then(resp => {
            let data = resp.data;
            commit("addCompany", data.result);
            resolve(data.result);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  getters: {
    allCompanies: state => {
      return state.companies;
    }
  }
};
