const stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports = new (class {
  constructor() {}

  async init() {
    this.price = (await stripe.products.list()).data.find((product) => {
      return product.name === "iFrame";
    }).default_price;
  }

  async createPaySession(host) {
    return (
      await stripe.checkout.sessions.create({
        success_url: `${host}/payment/success?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${host}`,
        line_items: [
          {
            price: this.price,
            quantity: 1,
          },
        ],
        mode: "payment",
      })
    ).url;
  }

  async getPaySession(sessionId) {
    return await stripe.checkout.sessions.retrieve(sessionId);
  }
})();
