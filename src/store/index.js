import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import login from "./modules/login";
import userInfo from "./modules/user-info";
import setsubiData from "./modules/setsubi-data";
import setsubiCategory from "./modules/setsubi-category.js";
import dataTypes from "./modules/data-types.js";
import plants from "./modules/plants.js";
import lines from "./modules/lines.js";
import clients from "./modules/client.js";
import companies from "./modules/company.js";
import sensorDatas from "./modules/sensor-data.js";
import sensors from "./modules/sensors.js";
import fileServer from "./modules/file-server.js";
import branches from "./modules/branch.js";
import roles from "./modules/role.js";
import resources from "./modules/resource.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    login,
    userInfo,
    setsubiData,
    setsubiCategory,
    dataTypes,
    plants,
    lines,
    clients,
    companies,
    sensorDatas,
    sensors,
    fileServer,
    branches,
    roles,
    resources
  }
});
