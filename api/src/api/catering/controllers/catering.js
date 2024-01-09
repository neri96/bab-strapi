"use strict";

/**
 * catering controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::catering.catering",
  ({ strapi }) => ({
    async send(ctx) {
      try {
        await strapi.plugins["email"].services.email.send({
          to: process.env.EMAIL,
          from: process.env.EMAIL_ADMIN,
          subject: "Catering Request",
          html: `
                <div>
                <header
                  style="height: 50px; width: 100%; background: #666; position: relative;"
                >
                  <h2
                    style="
                      color: #fff;
                      margin: 0;
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    "
                  >
                    Catering Request
                  </h2>
                </header>
                  <div style="padding: 10px 20px;">
                    ${Object.entries(ctx.request.body)
                      .map((entry) => {
                        return `
                        <div style="padding: 10px 0;">
                          <h4 style="margin: 0; position: relative;">
                            <div
                              style="
                                position: absolute;
                                top: 50%;
                                left: 40px;
                                transform: translateY(-50%);
                              "
                            >
                              <h3 style="margin:0">${entry[0]}</h3>
                              <h4 style="margin:0">${entry[1]}</h4>
                            </div>
                          </h4>
                        </div>
                      `;
                      })
                      .join("")}
                  </div>
                </div>
              </div>
              `,
        });

        return { success: true };
      } catch (error) {
        return { success: false };
      }
    },
  })
);
