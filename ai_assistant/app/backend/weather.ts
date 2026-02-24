import axios from "axios";

// Initialize the API URL for the weather service
const apiURL = new URL("http://localhost:5000/interstellar_ai/api/weather");
if (typeof window !== 'undefined') {
    apiURL.hostname = window.location.hostname; // Use current hostname in the browser
} else {
    apiURL.hostname = "localhost"; // Fallback for server-side
}

// Function to get weather data
export const getWeather = async (data: object): Promise<string> => {
    try {
        // Make a POST request to the weather API with the provided data
        const response = await axios.post(apiURL.href, data);
        const status = response.data.status; // Extract the status from the response
        const success = response.data.response; // Extract the actual weather data from the response

        // Send the status and success response back to the worker
        postMessage({ status, success });
        return JSON.stringify(success); // Return the weather data as a JSON string
    } catch (error) {
        // Handle any errors that occur during the request
        postMessage({ status: 500, success: false });
        console.log(error); // Log the error for debugging
        return ""; // Return an empty string in case of an error
    }
};
