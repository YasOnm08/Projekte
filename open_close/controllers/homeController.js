"use strict";

const language = require("../utils/language");
const jwt = require("jsonwebtoken");

const renderHome = (req, res) => {
  let decoded = null;
  if (req.cookies && req.cookies.token) {
    decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
  }
  const email = decoded ? decoded.email : "";
  const login = email.split("@")[0];
  res.render("index", {
    lang: language[req.params.lang],
    login: login || language[req.params.lang].navigation.login,
    loggedIn: login ? true : false,
  });
};

module.exports = {
  renderHome,
};
