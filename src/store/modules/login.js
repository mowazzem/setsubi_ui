import Cookies from "js-cookie";

const login = {
  state: {
    token: Cookies.get("token"),
    accessList: [],
    isLoggedIn: Cookies.get("isLogin")
  },
  mutations: {
    setToken: (state, payload) => {
      state.token = payload.token;
    },
    setLoginStatus: (state, payload) => {
      state.isLoggedIn = payload;
    },
    removeToken: state => {
      state.token = "";
    }
  },
  actions: {
    submitLogin({ commit }, payload) {
      return new Promise((resolve, reject) => {
        window.axios
          .post("/api/signin", {
            username: payload.username,
            password: payload.password
          })
          .then(response => {
            commit("setToken", response.data);
            commit("setLoginStatus", true);
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
            commit("setLoginStatus", false);
          });
      });
    },
    removeToken({ commit }) {
      return new Promise(resolve => {
        commit("removeToken");
        resolve("token-removed");
      });
    }
  },
  getters: {
    getToken: state => {
      return state.token;
    },
    isLoggedIn: state => {
      return state.isLoggedIn;
    }
  }
};
export default login;
