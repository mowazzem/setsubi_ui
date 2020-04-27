const sensorDatas = {
  state: {
    sensorDatas: [],
    temperatureDatas: {},
    humidityDatas: {},
    motoVibrationDatas: []
  },
  mutations: {
    addTempDataY: (state, data) => {
      state.tempDatas.y.push(data);
    },
    setTemperatureDatas: (state, temp_datas) => {
      state.temperatureDatas = temp_datas;
    },
    setHumidityDatas: (state, humi_datas) => {
      state.humidityDatas = humi_datas;
    }
  },
  actions: {
    addTempDataY({ commit }, data) {
      commit("addTempDataY", data);
    },
    fetchTemperatureDatas({ commit },qParams) {
      return new Promise((resolve, reject) => {
        window.axios
          .get("/api/sensor-data/", {
            params:qParams
          })
          .then(res => {
            let data = res.data;
            commit("setTemperatureDatas", data.result);
            resolve(data.result);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchHumidityDatas({ commit },qParams) {
      return new Promise((resolve, reject) => {
        window.axios
          .get("/api/sensor-data/", {
            params:qParams
          })
          .then(res => {
            let data = res.data;
            commit("setHumidityDatas", data.result);
            resolve(data.result);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  getters: {
    allSensorDatas: state => {
      return state.sensorDatas;
    },
    allTemperatureDatas: state => {
      return state.temperatureDatas;
    },
    allHumidityDatas: state => {
      return state.humidityDatas;
    },
    allMotorVibrationDatas: state => {
      return state.motorVibrationDatas;
    }
  }
};
export default sensorDatas;
