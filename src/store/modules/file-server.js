const fileServer = {
  state: {
    file: window.localStorage.getItem("file")
  },
  mutations: {
    setFile: (state, data) => {
        state.file=data;
        localStorage.setItem('file',URL.createObjectURL(data));
    }
  },
  actions: {
    fetchFile({ commit }, path) {
      return new Promise((resolve, reject) => {
        window.axios
          .get("/api/serve-file/?file=" + path, {
            responseType: "blob"
          })
          .then(resp => {
            let data = resp.data;
            commit("setFile", data);
            resolve(resp);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    }
  },
  getters: {
    getFile: state => {
      return state.file;
    }
  }
};

export default fileServer;
