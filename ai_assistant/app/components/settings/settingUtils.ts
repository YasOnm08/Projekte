// settingsManager.ts
import { changeSettings, getSettings } from "@/app/backend/database";

// Method to export localStorage to a JSON object
export function exportSettings(): string {
    const settings: { [key: string]: string } = {};

    // Loop through all keys in localStorage and add them to the settings object
    if (typeof localStorage !== 'undefined') {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                // Exclude sensitive information
                if (key !== "accountName" && key !== "accountPassword" && key !== "accountEmail") {
                    settings[key] = localStorage.getItem(key) || "";
                }
            }
        }
    }

    // Convert settings object to JSON string
    return JSON.stringify(settings, null, 2);
}

// Method to import settings from a JSON object, clearing old localStorage
export function importSettings(jsonData: string): void {
    try {
        const parsedSettings = JSON.parse(jsonData);

        // Loop through parsed settings and save them in localStorage
        if (typeof localStorage !== 'undefined') {
            Object.keys(parsedSettings).forEach((key) => {
                localStorage.setItem(key, parsedSettings[key]);
            });
        }

    } catch (error) {
        console.error("Invalid JSON data:", error);
    }
}

// Send current settings to the database
export const sendToDatabase = async () => {
    const useName = localStorage.getItem("accountName");
    const usePassword = localStorage.getItem("accountPassword");

    if (useName && usePassword) {
        const result = await changeSettings(useName, usePassword, JSON.parse(exportSettings()));
        if (result === true) {
            // Only reload if the settings change was successful
            window.location.reload();
        }
    }
};

// Import settings from the database based on username and password
export const importDatabase = async (useName: string, usePassword: string) => {
    const databaseSettings = await getSettings(useName, usePassword);

    // Ensure user settings exist before flattening and storing
    if (typeof databaseSettings === 'object' && databaseSettings) {
        importSettings(JSON.stringify(databaseSettings, null, 2)); // Pass only the current user's settings
    } else {
        console.error('Database settings are not in the expected format.');
    }
};
