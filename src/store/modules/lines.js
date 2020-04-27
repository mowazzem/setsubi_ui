const lines = {
  state: {
    lines: [],
    line: {}
  },
  mutations: {
    setLines: (state, datas) => {
      state.lines = datas;
    },
    setOneLine: (state, data) => {
      state.line = data;
    }
  },
  actions: {
    fetchLines({ commit }) {
      return new Promise((resolve, reject) => {
        window.axios
          .get("/api/line/")
          .then(response => {
            let data = response.data;
            if (data.code == "200") {
              commit("setLines", data.result);
              resolve(data.code);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchOneLine({ commit }, id) {
      return new Promise((resolve, reject) => {
        window.axios
          .get("/api/line/" + id)
          .then(response => {
            let data = response.data;
            if (data.code == "200") {
              commit("setOneLine", data.result);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  getters: {
    allLines: state => {
      return state.lines;
    }
  }
};

export default lines;
