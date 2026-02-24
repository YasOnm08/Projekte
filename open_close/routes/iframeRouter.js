"use strict";

const express = require("express");
const router = express.Router({ mergeParams: true });
const iframeController = require("../controllers/iframeController");

// Route with userID parameter
router.get("/:userId", iframeController.renderIframe);

// Optional: Keep the existing route for backward compatibility
router.get("/", iframeController.renderIframe);

module.exports = router;
