"use strict";

const language = require("../utils/language");
const iframeLogic = require("../utils/iframeLogic");

const IFRAME_LAYOUT = "iframeLayout";
const STATUS_CLASS_CLOSED = "closed";
const VIEW_NAME = "iframe";
const CALENDAR_PARTIAL_VIEW = "calendarWrapper";

const sendIframeError = (res, statusCode, statusText, closingText, warningTitle, warningMessage) => {
  return res.status(statusCode).render(VIEW_NAME, {
    layout: IFRAME_LAYOUT,
    statusClass: STATUS_CLASS_CLOSED,
    statusText,
    closingText,
    showWarning: true,
    warningTitle,
    warningMessage,
  });
};

const renderIframe = async (req, res) => {
  const userId = req.params.userId;
  const size = req.query.size || "medium";

  // Grab monthOffset from query, but the JS will handle this in the background
  const monthOffset = parseInt(req.query.monthOffset) || 0;
  const isPartial = req.query.partial === "true";

  if (!userId) {
    return sendIframeError(res, 400, "Fehler", "User ID nicht angegeben", "Fehler", "Keine User ID in der URL angegeben");
  }

  try {
    const viewData = await iframeLogic.getIframeData(userId, size, monthOffset);

    // If AJAX request, return ONLY the calendar HTML
    if (isPartial) {
      return res.render(CALENDAR_PARTIAL_VIEW, {
        layout: false,
        lang: language[req.params.lang],
        ...viewData,
      });
    }

    res.render(VIEW_NAME, { lang: language[req.params.lang], ...viewData });
  } catch (error) {
    console.error("Iframe Controller Error:", error);
    return sendIframeError(res, 500, "Fehler", "Server Fehler", "Fehler", "Ein interner Fehler ist aufgetreten.");
  }
};

module.exports = { renderIframe };
