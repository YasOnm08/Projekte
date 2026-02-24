"use strict";

const StyleGenerator = require("./styleGenerator");

/**
 * Creates a Date object for the 1st of the month offset from the current month.
 * This is used to calculate the correct calendar view and month name.
 * @param {number} offset - The number of months to offset (0 for current month).
 * @returns {Date}
 */
function getDateForOffset(offset) {
  const now = new Date();
  // Use the 1st of the month for calculation, offsetting the month
  const date = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  return date;
}

/**
 * Gets the index of the first day of the month (0=Mon, 6=Sun).
 * @param {Date} date
 * @returns {number}
 */
function getFirstDayOfMonth(date) {
  // getDay() returns 0=Sun, 1=Mon, ..., 6=Sat. We want 0=Mon.
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

/**
 * Gets the number of days in the month.
 * @param {Date} date
 * @returns {number}
 */
function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Generates data structure for the calendar grid and the list of special events.
 * @param {Array} specialDays - List of all configured special days.
 * @param {number} offset - The month offset for which to render the calendar.
 * @returns {object}
 */
function generateCalendarData(specialDays, offset) {
  const targetMonthDate = getDateForOffset(offset);
  const daysInMonth = getDaysInMonth(targetMonthDate);
  const firstDayIndex = getFirstDayOfMonth(targetMonthDate); // 0=Mon, 6=Sun
  const currentMonth = targetMonthDate.getMonth();
  const currentYear = targetMonthDate.getFullYear();

  const todayActual = new Date();
  const isCurrentMonth = todayActual.getMonth() === currentMonth && todayActual.getFullYear() === currentYear;
  const todayDateNumber = isCurrentMonth ? todayActual.getDate() : -1;

  const specialDatesMap = new Map();
  const futureSpecialDaysList = [];

  // 1. Process all special days for calendar grid and future list
  specialDays.forEach((day) => {
    const dayDate = new Date(day.date);

    // Handle openTime structure (it's an array of slots, each potentially having a 'time' object)
    const openTimes = day.openTime.length === 0 || day.openTime[0].closed ? "Geschlossen" : day.openTime.map((slot) => (slot.closed ? "Geschlossen" : `${slot.time.start} - ${slot.time.end}`)).join(", ");

    // Determine if the day is fully closed
    const isClosed = day.openTime.length === 0 || day.openTime.every((slot) => slot.closed);

    // Calendar Grid (for the offset month)
    if (dayDate.getMonth() === currentMonth && dayDate.getFullYear() === currentYear) {
      const dateKey = dayDate.getDate();
      if (!specialDatesMap.has(dateKey)) {
        specialDatesMap.set(dateKey, []);
      }
      specialDatesMap.get(dateKey).push({
        name: day.name,
        hours: openTimes,
        description: day.description?.de || day.name,
        closed: isClosed,
      });
    }

    // Future Events List (only show events from today onwards, only if current offset is 0)
    if (offset === 0) {
      // Set dayDate to midnight for comparison accuracy
      const dayDateMidnight = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate());
      const todayActualMidnight = new Date(todayActual.getFullYear(), todayActual.getMonth(), todayActual.getDate());

      if (dayDateMidnight >= todayActualMidnight) {
        futureSpecialDaysList.push({
          dateObj: dayDateMidnight,
          date: dayDate.toLocaleDateString("de-DE"),
          formattedDate: dayDate.toLocaleDateString("de-DE"),
          name: day.name,
          hours: openTimes,
          closed: isClosed,
        });
      }
    }
  });

  const calendarDays = [];

  // Add empty cells for padding
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push({ empty: true });
  }

  // Add actual days
  for (let i = 1; i <= daysInMonth; i++) {
    const specialEvents = specialDatesMap.get(i) || [];
    calendarDays.push({
      dayNumber: i,
      isToday: i === todayDateNumber,
      isSpecial: specialEvents.length > 0,
      specialEvents: specialEvents, // List of events for the day
    });
  }

  // Sort future special days list
  futureSpecialDaysList.sort((a, b) => a.dateObj - b.dateObj);

  // Only return the future list if we are viewing the current month (offset 0)
  const specialDaysListToReturn = offset === 0 ? futureSpecialDaysList : [];

  return {
    calendarDays,
    specialDaysList: specialDaysListToReturn.length > 0 ? specialDaysListToReturn : null,
  };
}

function buildViewData(configData, hoursData, size = "medium", monthOffset = 0) {
  // Determine what to show based on size
  const showWeekPlan = size === "large" || size === "huge";
  // Show special days (Calendar) only for Huge size, but ensure we have data for the current month view
  const showSpecialDays = size === "huge";
  const showWarning = size === "medium" || size === "large" || size === "huge";
  const showContentArea = size !== "small"; // Don't show content area for small size

  const weekSchedule = showWeekPlan ? generateWeekSchedule(configData.weekPlan) : null;

  let specialDaysData = null;
  if (showSpecialDays) {
    specialDaysData = generateCalendarData(configData.specialDays, monthOffset);
  }

  const customStyles = StyleGenerator.generateCustomStyles(configData.styleSettings);

  const now = getDateForOffset(monthOffset);
  const currentMonthName = now.toLocaleDateString("de-DE", { month: "long", year: "numeric" });

  return {
    ...hoursData,
    weekSchedule,
    specialDays: specialDaysData,
    currentMonthName, // Pass current month name (for the offset month)
    monthOffset, // Pass offset for navigation
    userConfig: configData,
    settings: configData.settings,
    customStyles,
    layout: "iframeLayout",
    requestedSize: size,
    showWarning: showWarning && hoursData.showWarning,
    showWeekPlan: showWeekPlan,
    showSpecialDays: showSpecialDays,
    showContentArea: showContentArea,
  };
}

/**
 * FIXED: Generate week schedule that shows ALL time slots without overlapping
 * Returns array of individual time slots for proper rendering
 */
function generateWeekSchedule(weekPlan) {
  const dayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

  return weekPlan.map((day) => {
    const dayName = dayNames[day.dayAsNumber];

    if (day.openTime.length === 0) {
      return {
        day: dayName,
        timeSlots: [],
        isClosed: true,
      };
    }

    // Return array of individual time slots for rendering
    const timeSlots = day.openTime.map((slot) => `${slot.start} - ${slot.end}`);

    return {
      day: dayName,
      timeSlots: timeSlots,
      isClosed: false,
      timeSlotCount: day.openTime.length,
    };
  });
}

module.exports = { buildViewData };
