module.exports = {
  routes: [
    {
      method: "POST",
      path: "/caterings/send",
      handler: "catering.send",
      config: {
        auth: false,
      },
    },
  ],
};
