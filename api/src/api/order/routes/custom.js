module.exports = {
  routes: [
    {
      method: "GET",
      path: "/orders/:stripeId",
      handler: "order.findOne",
      config: {
        auth: false,
      },
    },
    {
      method: "PUT",
      path: "/orders/:stripeId",
      handler: "order.update",
      config: {
        auth: false,
      },
    },
  ],
};
