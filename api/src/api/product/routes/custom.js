module.exports = {
  routes: [
    {
      method: "POST",
      path: "/products/send",
      handler: "product.send",
      config: {
        auth: false,
      },
    },
  ],
};
