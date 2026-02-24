"use strict";

const { fetchUserById } = require("./iframeDataFetch");
const DataComparator = require("./dataComparator");
const HoursCalculator = require("./hoursCalculator");
const ViewDataBuilder = require("./viewDataBuilder");

let cachedData = new Map();

async function getIframeData(userId, size = "medium") {
  const userConfig = await fetchUserById(userId);

  if (!userConfig) {
    const error = new Error(`User ID: ${userId} nicht gefunden`);
    error.status = 404;
    throw error;
  }

  const configData = userConfig.data || userConfig;
  const cacheKey = `${userId}_${size}`;
  const cached = cachedData.get(cacheKey);

  // If data hasn't changed, return cache
  if (cached && DataComparator.isDataEqual(cached.configData, configData)) {
    return cached.viewData;
  }

  const hoursData = HoursCalculator.getOpeningHoursData(userConfig);
  // We pass 0 as offset permanently to just show the current month
  const viewData = ViewDataBuilder.buildViewData(configData, hoursData, size, 0);

  cachedData.set(cacheKey, { configData, viewData });
  return viewData;
}

module.exports = { getIframeData };
