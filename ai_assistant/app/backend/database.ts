import axios from "axios";

// Construct the base API URL based on the environment
const apiURL = new URL("http://localhost:5000/interstellar_ai/db");
if (typeof window !== 'undefined') {
  apiURL.hostname = window.location.hostname; // Set hostname for browsers
} else {
  apiURL.hostname = "localhost"; // Default to localhost for non-browser environments
}

// Function to send data to the database and return a success status
export const sendToDatabase = async (data: object): Promise<boolean> => {
  try {
    const response = await axios.post(apiURL.href, data);
    const status = response.data.status;
    const success = response.data.response;
    postMessage({ status, success }); // Send status back to the main thread
    return success; // Return success status
  } catch (error) {
    postMessage({ status: 500, success: false }); // Handle errors
    console.log(error);
    return false; // Return false on error
  }
};

// Function to send data and get a string response
export const sendToDatabaseAndGetString = async (data: object): Promise<string> => {
  try {
    const response = await axios.post(apiURL.href, data);
    const status = response.data.status;
    const success = response.data.response;
    postMessage({ status, success });
    return success; // Return response string
  } catch (error) {
    postMessage({ status: 500, success: false });
    console.log(error);
    return "false"; // Return "false" on error
  }
};

// Functions for each action
export const createAccount = async (username: string, email: string, password: string) => {
  const data = {
    action: "create_account",
    username: username,
    email: email,
    password: password,
  };
  return await sendToDatabase(data); // Send account creation request
};

export const changePassword = async (usernameOrEmail: string, password: string, newPassword: string) => {
  const data = {
    action: "change_password",
    username: usernameOrEmail.includes('@') ? undefined : usernameOrEmail,
    email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
    password,
    new_password: newPassword,
  };
  return await sendToDatabase(data); // Send password change request
};

export const getSettings = async (usernameOrEmail: string, password: string) => {
  const data = {
    action: "get_settings",
    username: usernameOrEmail.includes('@') ? undefined : usernameOrEmail,
    email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
    password,
  };
  return await sendToDatabaseAndGetString(data); // Get user settings
};

export const changeSettings = async (usernameOrEmail: string, password: string, newData: object) => {
  const data = {
    action: "change_settings",
    username: usernameOrEmail.includes('@') ? undefined : usernameOrEmail,
    email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
    password,
    data: newData,
  };
  return await sendToDatabase(data); // Send settings change request
};

export const getHistory = async (usernameOrEmail: string, password: string) => {
  const data = {
    action: "get_history",
    username: usernameOrEmail.includes('@') ? undefined : usernameOrEmail,
    email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
    password,
  };
  return await sendToDatabaseAndGetString(data); // Get user history
};

export const changeHistory = async (usernameOrEmail: string, password: string, newData: object) => {
  const data = {
    action: "change_history",
    username: usernameOrEmail.includes('@') ? undefined : usernameOrEmail,
    email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
    password,
    data: newData,
  };
  return await sendToDatabase(data); // Send history change request
};

export const getEmail = async (usernameOrEmail: string, password: string): Promise<string> => {
  const data = {
    action: "get_email",
    username: usernameOrEmail.includes('@') ? undefined : usernameOrEmail,
    email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
    password,
  };
  return await sendToDatabaseAndGetString(data); // Get user email
};

export const getName = async (usernameOrEmail: string, password: string): Promise<string> => {
  const data = {
    action: "get_name",
    username: usernameOrEmail.includes('@') ? undefined : usernameOrEmail,
    email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
    password,
  };
  return await sendToDatabaseAndGetString(data); // Get user name
};

export const checkCredentials = async (usernameOrEmail: string, password: string) => {
  const data = {
    action: "check_credentials",
    username: usernameOrEmail.includes('@') ? undefined : usernameOrEmail,
    email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
    password,
  };
  const sendBack = await sendToDatabase(data); // Check user credentials
  if (sendBack) {
    if (typeof localStorage !== 'undefined') {
      // Store user data in localStorage if credentials are valid
      localStorage.setItem("accountEmail", await getEmail(usernameOrEmail, password));
      localStorage.setItem("accountName", await getName(usernameOrEmail, password));
      localStorage.setItem("accountPassword", password);
    }
  }
  return sendBack; // Return success status
};

export const deleteAccount = async (usernameOrEmail: string, password: string) => {
  const data = {
    action: "delete_account",
    username: usernameOrEmail.includes('@') ? undefined : usernameOrEmail,
    email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
    password,
  };
  return await sendToDatabase(data); // Send account deletion request
};
