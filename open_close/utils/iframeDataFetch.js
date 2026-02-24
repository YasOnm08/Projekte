// 019a73a1-41f9-71d4-992d-65c9797fb8be

"use strict";

const baseString = "http://127.0.0.1:5500/api/v1/users/";

async function fetchUserById(userId) {
  if (!userId) {
    return null;
  }

  try {
    const userDataResponse = await fetch(baseString + userId + "/config");

    if (!userDataResponse.ok) {
      throw new Error(`Response status: ${userDataResponse.status}`);
    }

    const userData = await userDataResponse.json();
    return userData || null;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetchUserById,
};
