const client = {
  state: {
    clients: [],
    client: {}
  },
  mutations: {
    setClients: (state, clients) => {
      state.clients = clients;
    },
    setOneClient: (state, client) => {
      state.client = client;
    },
    addClient: (state, client) => {
      state.clients.unshift(client);
    }
  },
  actions: {
    fetchClients({ commit }) {
      return new Promise((resolve, reject) => {
        window.axios
          .get("/api/client/")
          .then(res => {
            let data = res.data;
            if (data.code == "200") {
              commit("setClients", data.result);
              resolve(data);
            }else{
                reject(data.code);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchOneClient({ commit }, id) {
      return new Promise((resolve, reject) => {
        window.axios
          .get("/api/client/" + id)
          .then(res => {
            let data = res.data;
            if (data.code == "200") {
              commit("setOneClient", data.result);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    insertClient({ commit }, client) {
      return new Promise((resolve, reject) => {
        window.axios
          .post("/api/client/", client)
          .then(resp => {
            let data = resp.data;
            let code = data.code;
            let result = data.result;
            if (code == "200") {
              commit("addClient", result);
              resolve(code);
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
    allClients: state => {
      return state.clients;
    },
    oneClient: state => {
      return state.client;
    }
  }
};
export default client;
