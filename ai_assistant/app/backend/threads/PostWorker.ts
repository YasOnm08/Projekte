import axios from "axios";

// Event listener for incoming messages
onmessage = (e) => {
    const { messages, ai_model, model_type, access_token, api_key, windowname } = e.data;

    // Construct the message object to send to the API
    const Message = {
        messages: messages,
        ai_model: ai_model,
        model_type: model_type,
        access_token: access_token,
        api_key: api_key
    };

    const apiURL = new URL("http://localhost:5000/interstellar_ai/api/ai_send");
    apiURL.hostname = windowname; // Set the hostname for the API request


    // Make a POST request to the API with the message object
    axios.post(apiURL.href, Message)
        .then(response => {
            const status = response.data.status;
            postMessage({ status }); // Send the response status back
        })
        .catch(error => {
            console.log("Error calling API:", error);
            postMessage({ status: 500 }); // Send error status if API call fails
        });
}
