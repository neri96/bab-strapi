"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { date, items } = ctx.request.body;

    try {
      const productsData = [...items];

      const lineItems = await Promise.all(
        items.map(async (itemElem, index) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(itemElem.id);

          productsData[index].title = item.title;
          productsData[index].price = item.price;
          productsData[index].quantity = itemElem.price;

          const discount = item.discount;
          const itemPrice = discount
            ? item.price - item.price * (discount / 100)
            : item.price;

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.title,
              },
              unit_amount: Math.round(itemPrice * 100),
            },
            quantity: itemElem.quantity,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        phone_number_collection: {
          enabled: true,
        },
        mode: "payment",
        success_url: `${process.env.CLIENT}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT}/failed`,
        line_items: lineItems,
        payment_method_types: ["card"],
      });

      await strapi.service("api::order.order").create({
        data: {
          date,
          products: productsData,
          stripeId: session.id,
        },
      });

      return { session };
    } catch (error) {
      console.log(error);
    }
  },
  async update(ctx) {
    const entity = await strapi.entityService.findMany("api::order.order", {
      filters: { stripeId: ctx.params.stripeId },
    });

    if (!entity || !entity.length) return { success: false };

    if (entity[0].completed) return { completed: true };

    const session = await stripe.checkout.sessions.retrieve(
      ctx.params.stripeId
    );

    if (!session) return { success: false };

    const { name, phone, email, date } = session.customer_details;

    if (session.payment_status === "paid" && session.status === "complete") {
      try {
        await strapi.plugins["email"].services.email.send({
          to: process.env.EMAIL,
          from: process.env.EMAIL_ADMIN,
          subject: "NEW ORDER",
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
                NEW ORDER
              </h2>
            </header>
            <div style="color: #fff; background: #333;">
              <div style="padding: 10px 20px;">
                <div style="padding: 10px 0;">
                  <h3 style="margin: 0;">Name:</h3>
                  <h4 style="margin: 0; color: #ccc;">${name}</h4>
                </div>
                <div style="padding: 10px 0;">
                  <h3 style="margin: 0;">Phone:</h3>
                  <h4 style="margin: 0; color: #ccc;">${phone}</h4>
                </div>
                <div style="padding: 10px 0;">
                  <h3 style="margin: 0;">Email:</h3>
                  <h4 style="margin: 0; color: #ccc;">${email}</h4>
                </div>
                <div style="padding: 10px 0;">
                  <h3 style="margin: 0;">Pick up date:</h3>
                  <h4 style="margin: 0; color: #ccc;">${date}</h4>
                </div>
              </div>

              <div
                style="
                  height: 50px;
                  width: 100%;
                  background: #666;
                  position: relative;
                "
              >
                <h2
                  style="
                    margin: 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                  "
                >
                  Order Details
                </h2>
              </div>

              <div style="padding: 10px 20px;">
                ${entity[0].products
                  .map((product) => {
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
                          <span>${product.quantity}, </span>
                          <span>${
                            product.title.charAt(0).toUpperCase() +
                            product.title.slice(1)
                          }, </span>
                          <span>${product.price * product.quantity}$</span>
                        </div>
                      </h4>
                    </div>
                  `;
                  })
                  .join("")}

                <div style="padding: 15px 0;">
                  <h4 style="margin: 0;">
                    Total: ${session.amount_total / 100}$
                  </h4>
                </div>
              </div>
            </div>
          </div>
          `,
        });
      } catch (error) {
        return { success: false };
      }
    }

    try {
      await strapi.db.query("api::order.order").update({
        where: { id: entity[0].id },
        data: {
          customer: name,
          email,
          phone,
          total: session.amount_total / 100,
          completed: true,
        },
      });

      return { success: true };
    } catch (error) {
      return { success: false };
    }
  },
}));
