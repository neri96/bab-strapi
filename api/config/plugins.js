module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: env("EMAIL_ADMIN"),
        defaultReplyTo: env("EMAIL_ADMIN"),
      },
    },
  },
});
