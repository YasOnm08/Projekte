"use strict";

const express = require("express");

const loginApiRouter = require("./loginApiRouter");
const configApiRouter = require("./configApiRouter").router;

const router = express.Router();

router.use("/users", loginApiRouter);
router.use("/config", configApiRouter);

module.exports = router;
