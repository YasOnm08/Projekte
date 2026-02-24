"use strict";

const express = require("express");
const router = express.Router({ mergeParams: true });
const loginUiController = require("../controllers/loginUiController");

router.get("/login", loginUiController.renderLogin).get("/payment", loginUiController.paymentController).get("/payment/success", loginUiController.registerController);

module.exports = router;
