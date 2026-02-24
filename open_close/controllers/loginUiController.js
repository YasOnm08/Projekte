"use strict";

const language = require("../utils/language");
const stripe = require("../utils/stripe");

const renderLogin = (req, res) => {
  res.render("login", { lang: language[req.params.lang] });
};

const paymentController = async (req, res) => {
  res.redirect(await stripe.createPaySession(req.protocol + "://" + req.get("host")));
};

const registerController = async (req, res) => {
  try {
    const session = await stripe.getPaySession(req.query.sessionId);
    if (session) {
      res.render("register", { email: session.customer_details.email, lang: language[req.params.lang] });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
};

module.exports = {
  renderLogin,
  paymentController,
  registerController,
};
