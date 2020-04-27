const plants = {
  state: {
    plants: [],
    plant: {}
  },
  mutations: {
    setPlants: (state, data) => {
      state.plants = data;
    },
    setOnePlant: (state, data) => {
      state.plant = data;
    }
  },
  actions: {
    fetchPlants({ commit }) {
      {
        return new Promise((resolve, reject) => {
          window.axios
            .get("/api/plant/")
            .then(response => {
              let data = response.data;
              if (data.code == "200") {
                commit("setPlants", data.result);
                resolve(data.code);
              }
            })
            .catch(error => {
              reject(error);
            });
        });
      }
    },
    fetchOnePlant({ commit }, id) {
      return new Promise((resolve, reject) => {
        window.axios
          .get("/api/plant/" + id)
          .then(response => {
            let data = response.data;
            if (data.code == "200") {
              commit("setOnePlant", data.result);
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
    allPlants: state => {
      return state.plants;
    },
    getOnePlant: state => state.plant
  }
};

export default plants;
