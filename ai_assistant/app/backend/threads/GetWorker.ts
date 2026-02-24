import axios from "axios";

let windownameGlobal = ""; // Global variable to hold the window name
let accesstoken = ""; // Variable to store the access token

onmessage = (event) => {
    const { action, access_token, windowname } = event.data;
    accesstoken = access_token;
    windownameGlobal = windowname;

    if (action === "start") {
        fetchData(); // Start fetching data on 'start' action
    }
}

const fetchData = () => {
    const apiURL = new URL("http://localhost:5000/interstellar_ai/api/ai_get?access_token=" + accesstoken);
    apiURL.hostname = windownameGlobal; // Set the hostname

    axios.get(apiURL.href)
        .then(response => {
            postMessage(response.data); // Send data back on success
            setTimeout(fetchData, 100); // Schedule next fetch
        })
        .catch(error => {
            console.log('Error fetching data:', error);
            postMessage({ error: "failed fetching data" }); // Send error message
            setTimeout(() => fetchData(), 1000); // Retry after 1 second
        });
}
