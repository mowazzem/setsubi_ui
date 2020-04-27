import Cookies from 'js-cookie';
const userInfo = {
  state: {
    userInfo:Cookies.get('user-info')
  },
  mutations: {
    setUserInfo: (state, userinfo) => {
      state.userInfo = userinfo;
    }
  },
  actions: {
    setUserInfo({ commit }, userinfo) {
      commit("setUserInfo", userinfo);
    }
  },
  getters: {
    getUserInfo: state => {
      return state.userInfo;
    }
  }
};

export default userInfo;
