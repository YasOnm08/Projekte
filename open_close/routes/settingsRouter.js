"use strict";

const express = require("express");
const router = express.Router({ mergeParams: true });
const settingsController = require("../controllers/settingsController");
const authJWT = require("../utils/authJWT");

router.get("/", authJWT(false, false, true), settingsController.renderSettings);
router.get("/statistics", authJWT(true, false, true), settingsController.renderStatistics);
router.get("/orders", authJWT(false, false, true), settingsController.renderOrders);
router.get("/iframe/:tab?", authJWT(false, false, true), settingsController.renderSettingsiFrame);

module.exports = router;
