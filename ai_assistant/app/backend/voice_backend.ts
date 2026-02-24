import axios from "axios";

export const sendToVoiceRecognition = (audio_data: Blob): Promise<string> => {
    // Create a new FormData instance to send the audio file
    const formdata = new FormData();
    formdata.append("audio", audio_data); // Append the audio data to the FormData

    // Set the API URL dynamically based on the environment
    const apiURL = new URL("http://localhost:5000/interstellar_ai/api/voice_recognition");
    if (typeof window !== 'undefined') {
        apiURL.hostname = window.location.hostname; // Use the current hostname in the browser
    } else {
        apiURL.hostname = "localhost"; // Fallback for server-side
    }

    // Send the audio data to the API using POST request
    return axios.post(apiURL.href, formdata)
        .then((response) => {
            return response.data.response; // Return the response from the API
        })
        .catch(error => {
            console.log("Error calling API:", error); // Log any error that occurs
            postMessage({ status: 500 }); // Indicate an error status to the worker
            return "Error"; // Return a fallback error message
        });
};
