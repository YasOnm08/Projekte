"use strict";

const express = require("express");
const loginController = require("../../controllers/loginController");
const configApiRouter = require("./configApiRouter").userSubRouter;
const authJWT = require("../../utils/authJWT");

const router = express.Router();

router
  .get("/", authJWT(true, false, false), loginController.getUsers)
  .post("/", loginController.postUser)
  .get("/:userId", authJWT(false, true, false), loginController.getOneUser)
  .patch("/:userId", authJWT(false, true, false), loginController.patchUser)
  .delete("/:userId", authJWT(false, true, false), loginController.deleteUser)
  .post("/login", loginController.loginUser)
  .get("/renew/:userId", authJWT(true, true, false), loginController.renewUser)
  .use("/:userId/config", configApiRouter);

module.exports = router;
