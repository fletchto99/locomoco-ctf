module.exports = {
  prepareDevResponse: error => {
      if (process.env.DEVELOPER_MODE !== "true") {
          delete error.dev_error;
      }
  },
  isDeveloperEnabled: () => {
  	return process.env.DEVELOPER_MODE === "true"
  }
};
