"use strict";

function parseTimeString(timeStr) {
  const [hours, minutes] = timeStr.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return date;
}

module.exports = { parseTimeString };
