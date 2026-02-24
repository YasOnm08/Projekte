"use strict";

const express = require("express");
const router = express.Router({ mergeParams: true });
const homeController = require("../controllers/homeController");

router.get("/", homeController.renderHome);

module.exports = router;
