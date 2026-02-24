"use strict";

const express = require("express");
const configController = require("../../controllers/configController");
const authJWT = require("../../utils/authJWT");

const router = express.Router();

router.get("/", configController.getAlliFrames);

const userSubRouter = express
  .Router({ mergeParams: true })
  .post("/", authJWT(false, true, false), configController.createiFrame)
  .get("/", configController.getiFrameById)
  .patch("/", authJWT(false, true, false), configController.updateiFrameById)
  .delete("/", authJWT(false, true, false), configController.deleteiFrameById);

module.exports = { router, userSubRouter };
