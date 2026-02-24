"use strict";

const express = require("express");
const router = express.Router({ mergeParams: true });
const mainPageRouter = require("./homeRouter");
const loginRouter = require("./loginRouter");
const iframeRouter = require("./iframeRouter");
const settingsRouter = require("./settingsRouter");

router.use("/", mainPageRouter);
router.use("/", loginRouter);
router.use("/iframe", iframeRouter);
router.use("/settings", settingsRouter);

module.exports = router;
