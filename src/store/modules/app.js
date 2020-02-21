const app = {
  state: {
    drawer: true
  },
  mutations: {
    toggleSideBar: (state, status) => {
      state.drawer = status;
    }
  },
  actions: {
    toggleSideBar: ({ commit }, status) => {
      commit("toggleSideBar", status);
    }
  },
  getters: {
    drawerStat: state => {
      return state.drawer;
    }
  }
};

export default app;
