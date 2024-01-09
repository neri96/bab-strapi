module.exports = ({ env }) => [
  "strapi::errors",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      // headers: "*",
      origin: [
        "https://babushkamarket.com",
        `${env("CLIENT")}`,
        `${env("URL")}`,
      ],
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::favicon",
  "strapi::public",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            `${env("DO_SPACE_BUCKET")}.${env("DO_SPACE_ENDPOINT")}`,
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            `${env("DO_SPACE_BUCKET")}.${env("DO_SPACE_ENDPOINT")}`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];
