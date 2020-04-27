const dataTypes = {
  state: {
    dataTypes: [
      { name: "Alphanumeric", type: "string" },
      { name: "Number", type: "float" },
      { name: "File", type: "file" }
    ]
  },
  getters: {
    getDataTypes: state => {
      return state.dataTypes;
    }
  }
};

export default dataTypes;
