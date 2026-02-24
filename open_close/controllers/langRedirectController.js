"use strict";

const language = require("../utils/language");

const languageRedirectCreator = (onlyForRoot) => (req, res, next) => {
  if (!Object.keys(language).find((lang) => lang == req.params.lang) && (!onlyForRoot || req.originalUrl == "/")) {
    req.params.lang = (req.headers["accept-language"] || "en").substring(0, 2);
    if (!Object.keys(language).find((lang) => lang == req.params.lang)) {
      req.params.lang = "en";
    }
    res.redirect("/" + req.params.lang + req.originalUrl);
  } else {
    next();
  }
};

module.exports = {
  languageRedirectCreator,
};
