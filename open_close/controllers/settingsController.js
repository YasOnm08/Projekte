"use strict";
const iFrameModel = require("../models/iFrameModel");
const userModel = require("../models/userModel");
const shopHistoryModel = require("../models/shopHistoryModel");
const language = require("../utils/language");
const { mongooseControllerCatch } = require("../utils/mongooseControllerCatch");

const renderSettings = mongooseControllerCatch(async (req, res) => {
  if (req.params.isAdmin) {
    const data = await userModel.find({ isAdmin: false });
    res.render("layouts/adminSettingsLayout", {
      lang: language[req.params.lang],
      statistics: false,
      users: data.map((user) => ({
        userId: user.userId,
        email: user.email,
        company: user.company,
        name: user.name,
        surname: user.surname,
        street: user.street,
        postalCode: user.postalCode,
        city: user.city,
        country: user.country,
        phoneNumber: user.phoneNumber,
        latitude: user.coordinates.latitude,
        longitude: user.coordinates.longitude,
      })),
    });
  } else {
    const data = await userModel.findOne({ userId: req.params.userId });
    res.render("layouts/settingsLayout", {
      lang: language[req.params.lang],
      orders: false,
      user: {
        userId: data.userId,
        company: data.company,
        name: data.name,
        surname: data.surname,
        street: data.street,
        postalCode: data.postalCode,
        city: data.city,
        country: data.country,
        phoneNumber: data.phoneNumber,
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude,
      },
    });
  }
}, "Failed to render settings page!");

const renderStatistics = mongooseControllerCatch(async (req, res) => {
  const payments = await shopHistoryModel.find();
  const purchaseCounts = payments.reduce((purchaseCounts, payment) => {
    purchaseCounts[payment.userId] = (purchaseCounts[payment.userId] || 0) + 1;
    return purchaseCounts;
  }, {});

  let customerRenewAmount = 0;
  let customerNonRenewAmount = 0;

  Object.values(purchaseCounts).forEach((purchaseCount) => {
    if (purchaseCount > 1) {
      customerRenewAmount++;
    } else {
      customerNonRenewAmount++;
    }
  });

  res.render("layouts/adminSettingsLayout", {
    lang: language[req.params.lang],
    statistics: true,
    customerAmount: customerNonRenewAmount + customerRenewAmount,
    customerNonRenewAmount,
    customerRenewAmount,
  });
}, "Failed to render statistics page!");

const renderOrders = mongooseControllerCatch(async (req, res) => {
  const histories = (await shopHistoryModel.find({ userId: req.params.userId })).map((history) => ({
    creationDate: history.creationDate.toISOString().split("T")[0],
    expirationDate: history.expirationDate.toISOString().split("T")[0],
  }));
  res.render("layouts/settingsLayout", { lang: language[req.params.lang], orders: true, history: histories });
}, "Failed to render orders page!");

const renderSettingsiFrame = async (req, res) => {
  try {
    const uid = req.params.userId;
    // const uid = "019adf52-e3d1-7432-9014-a8aaf6ce1d40";

    if (!uid) {
      return res.redirect("/login");
    }

    const iFrame = await iFrameModel.findOne({ userId: uid }).lean();

    if (!iFrame) {
      return res.status(404).end("iFrame not found");
    }

    const validTabs = ["close", "weekplan", "special", "display"];
    let activeTab = req.params.tab;
    if (!validTabs.includes(activeTab)) {
      activeTab = "display";
    }

    res.render("layouts/iframeSettings", {
      iFrame,
      activeTab,
      currentLang: req.params.lang,
      lang: language[req.params.lang],
    });
  } catch (error) {
    console.error("Error in renderSettingsiFrame:", error);
    res.status(500).send("An error occurred: " + error.message);
  }
};

module.exports = {
  renderSettings,
  renderStatistics,
  renderOrders,
  renderSettingsiFrame,
};
