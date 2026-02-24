"use strict";

const TimeParser = require("./timeParser");

function getOpeningHoursData(userConfig) {
  const configData = userConfig.data || userConfig;
  const now = new Date();
  const today = now.getDay();

  const isEmergencyClosed = configData.emergencyClosed?.closed || false;
  const todaySchedule = configData.weekPlan.find((day) => day.dayAsNumber === today);
  const todaySpecialDay = findTodaySpecialDay(configData.specialDays, now);

  const { isCurrentlyOpen, nextClosingTime } = calculateCurrentStatus(isEmergencyClosed, todaySchedule, todaySpecialDay, now);

  return buildHoursResponse(isCurrentlyOpen, nextClosingTime, isEmergencyClosed, todaySchedule, todaySpecialDay, configData);
}

function findTodaySpecialDay(specialDays, now) {
  return specialDays.find((day) => {
    const specialDate = new Date(day.date);
    return specialDate.toDateString() === now.toDateString();
  });
}

function calculateCurrentStatus(isEmergencyClosed, todaySchedule, todaySpecialDay, now) {
  if (isEmergencyClosed) return { isCurrentlyOpen: false, nextClosingTime: null };

  if (todaySpecialDay) {
    return calculateSpecialDayStatus(todaySpecialDay, now);
  }

  return calculateRegularDayStatus(todaySchedule, now);
}

function calculateSpecialDayStatus(todaySpecialDay, now) {
  const hasSpecialOpening = todaySpecialDay.openTime.length > 0 && !todaySpecialDay.openTime[0].closed;

  if (!hasSpecialOpening) {
    return { isCurrentlyOpen: false, nextClosingTime: null };
  }

  const currentTime = now.toTimeString().slice(0, 8);
  const currentDateTime = TimeParser.parseTimeString(currentTime);

  for (const timeSlot of todaySpecialDay.openTime) {
    const startTime = TimeParser.parseTimeString(timeSlot.time.start);
    const endTime = TimeParser.parseTimeString(timeSlot.time.end);

    if (currentDateTime >= startTime && currentDateTime <= endTime) {
      return { isCurrentlyOpen: true, nextClosingTime: endTime };
    }
  }

  return { isCurrentlyOpen: false, nextClosingTime: null };
}

function calculateRegularDayStatus(todaySchedule, now) {
  const isOpenToday = todaySchedule && todaySchedule.openTime.length > 0;

  if (!isOpenToday) {
    return { isCurrentlyOpen: false, nextClosingTime: null };
  }

  const currentTime = now.toTimeString().slice(0, 8);
  const currentDateTime = TimeParser.parseTimeString(currentTime);

  for (const timeSlot of todaySchedule.openTime) {
    const startTime = TimeParser.parseTimeString(timeSlot.start);
    const endTime = TimeParser.parseTimeString(timeSlot.end);

    if (currentDateTime >= startTime && currentDateTime <= endTime) {
      return { isCurrentlyOpen: true, nextClosingTime: endTime };
    }
  }

  return { isCurrentlyOpen: false, nextClosingTime: null };
}

function buildHoursResponse(isCurrentlyOpen, nextClosingTime, isEmergencyClosed, todaySchedule, todaySpecialDay, configData) {
  const statusClass = isCurrentlyOpen ? "open" : "closed";
  const statusText = isCurrentlyOpen ? "Geöffnet" : "Geschlossen";

  const closingText = buildClosingText(isCurrentlyOpen, nextClosingTime, todaySchedule, todaySpecialDay, isEmergencyClosed);

  const todayHours = generateTodayHours(todaySchedule, todaySpecialDay, isEmergencyClosed);

  const { warningTitle, warningMessage } = buildWarningData(isEmergencyClosed, todaySpecialDay, configData);

  return {
    statusClass,
    statusText,
    closingText,
    showWarning: isEmergencyClosed || !!todaySpecialDay,
    warningTitle,
    warningMessage,
    todayHours,
    todaySpecialDay,
  };
}

function buildClosingText(isCurrentlyOpen, nextClosingTime, todaySchedule, todaySpecialDay, isEmergencyClosed) {
  if (isCurrentlyOpen && nextClosingTime) {
    const closingTime = nextClosingTime.toTimeString().slice(0, 5);
    return `Schliesst um ${closingTime}`;
  }

  if (!isCurrentlyOpen && todaySchedule && !isEmergencyClosed && !todaySpecialDay) {
    return "Öffnet später";
  }

  if (!isCurrentlyOpen && (todaySpecialDay?.openTime[0]?.closed || isEmergencyClosed)) {
    return "Heute geschlossen";
  }

  return "";
}

function generateTodayHours(todaySchedule, todaySpecialDay, isEmergencyClosed) {
  if (isEmergencyClosed) return "Heute geschlossen";

  if (todaySpecialDay) {
    if (todaySpecialDay.openTime.length === 0 || todaySpecialDay.openTime[0].closed) {
      return "Heute geschlossen";
    }
    return todaySpecialDay.openTime.map((slot) => (slot.closed ? "Geschlossen" : `${slot.time.start} - ${slot.time.end}`)).join(", ");
  }

  if (!todaySchedule || todaySchedule.openTime.length === 0) return "Heute geschlossen";

  return todaySchedule.openTime.map((slot) => `${slot.start} - ${slot.end}`).join(", ");
}

function buildWarningData(isEmergencyClosed, todaySpecialDay, configData) {
  if (isEmergencyClosed) {
    return {
      warningTitle: "Wichtig",
      warningMessage: configData.emergencyClosed.description?.de || "Vorübergehend geschlossen",
    };
  }

  if (todaySpecialDay) {
    return {
      warningTitle: "Besonderer Tag",
      warningMessage: todaySpecialDay.description?.de || "Besondere Öffnungszeiten heute",
    };
  }

  return { warningTitle: "", warningMessage: "" };
}

module.exports = { getOpeningHoursData };
