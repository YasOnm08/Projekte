"use strict";

function isDataEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (key === "__v" || key === "_id") continue;

    if (key === "weekPlan" || key === "specialDays") {
      if (!compareArrays(obj1[key], obj2[key])) return false;
    } else if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      if (!isDataEqual(obj1[key], obj2[key])) return false;
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

function compareArrays(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return arr1 === arr2;
  }

  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
      return false;
    }
  }
  return true;
}

module.exports = { isDataEqual };
