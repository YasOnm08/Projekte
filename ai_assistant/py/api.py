from time import sleep
from flask import Flask, request, jsonify
from flask_cors import CORS
import secrets
import threading
from ai import AI
from db import DB
from weather import Weather
from voice import VoiceRecognition
from tts import TTS


class API:
    def __init__(self):
        # Initialize the API class with necessary components and configurations
        self.crypt_size = 64  # Size for generating secure tokens
        self.app = Flask(__name__)  # Create a Flask app instance
        self.ai_response = {}  # Dictionary to store AI responses keyed by access token
        self.ai = AI()  # AI processing instance
        self.db = DB()  # Database instance
        self.weather = Weather()  # Weather data retrieval instance
        self.voice = VoiceRecognition()  # Voice recognition instance
        self.tts = TTS()  # Text-to-Speech instance
        self.db.load_database()  # Load the database on startup
        self.ai_response_lock = threading.Lock()  # Lock for thread-safe access to AI responses
        CORS(self.app)  # Enable Cross-Origin Resource Sharing

    def run(self):
        # Route to create a new AI session
        @self.app.route("/interstellar_ai/api/ai_create", methods=["GET"])
        def create_ai():
            access_token = secrets.token_urlsafe(self.crypt_size)  # Generate a secure access token

            # Ensure the access token is unique
            while access_token in self.ai_response:
                access_token = secrets.token_urlsafe(self.crypt_size)

            self.ai_response[access_token] = ""  # Initialize the response for the new session
            return jsonify({"status": 200, "access_token": access_token})

        # Route to send messages to the AI
        @self.app.route("/interstellar_ai/api/ai_send", methods=["POST"])
        def send_ai():
            data = request.get_json()  # Get JSON data from the request
            messages = data.get("messages")  # Extract messages
            model_type = data.get("model_type")  # Extract model type
            ai_model = data.get("ai_model")  # Extract AI model name
            access_token = data.get("access_token")  # Extract access token

            print(model_type)  # Debugging output
            if access_token not in self.ai_response:
                return jsonify({"status": 401, "error": "Invalid access token"})  # Token validation

            # Start a new thread to process AI requests based on the model type
            if model_type == "local":
                thread = threading.Thread(
                    target=self.ai.process_local,
                    args=(ai_model, messages, self, access_token),
                )
                thread.start()
                thread.join()  # Wait for the thread to complete
                sleep(0.5)  # Sleep for a short duration
                return jsonify({"status": 200})
            elif model_type == "mistral":
                print(model_type)  # Debugging output
                api_key = data.get("api_key")  # Get API key
                thread = threading.Thread(
                    target=self.ai.process_mistralai,
                    args=(ai_model, messages, self, access_token, api_key),
                )
                thread.start()
                thread.join()
                sleep(0.5)
                return jsonify({"status": 200})
            elif model_type == "openai":
                api_key = data.get("api_key")  # Get API key
                thread = threading.Thread(
                    target=self.ai.process_openai,
                    args=(ai_model, messages, self, access_token, api_key),
                )
                thread.start()
                thread.join()
                sleep(0.5)
                return jsonify({"status": 200})
            elif model_type == "anthropic":
                api_key = data.get("api_key")  # Get API key
                thread = threading.Thread(
                    target=self.ai.process_anthropic,
                    args=(ai_model, messages, self, access_token, api_key),
                )
                thread.start()
                thread.join()
                sleep(0.5)
                return jsonify({"status": 200})
            elif model_type == "google":
                api_key = data.get("api_key")  # Get API key
                thread = threading.Thread(
                    target=self.ai.process_google,
                    args=(ai_model, messages, self, access_token, api_key),
                )
                thread.start()
                thread.join()
                sleep(0.5)
                return jsonify({"status": 200})

            return jsonify({"status": 401, "error": "Invalid AI model type"})  # Model type validation

        # Route to retrieve AI response based on access token
        @self.app.route("/interstellar_ai/api/ai_get", methods=["GET"])
        def get_ai():
            data = request.args.get("access_token")  # Get access token from query parameters
            if data not in self.ai_response:
                return jsonify({"status": 401, "error": "Invalid access token"})  # Token validation
            return jsonify({"status": 200, "response": self.ai_response[data]})  # Return AI response

        # Route for database operations
        @self.app.route("/interstellar_ai/db", methods=["POST"])
        def db_manipulate():
            sent_data = request.get_json()  # Get JSON data from the request
            action = sent_data.get("action")  # Extract action type
            if action == "create_account":
                return jsonify({"status": 200, "response": self.db.add_user(sent_data)})  # Add user
            elif action == "change_password":
                return jsonify(
                    {"status": 200, "response": self.db.update_password(sent_data)}  # Update password
                )
            elif action == "get_settings":
                return jsonify(
                    {"status": 200, "response": self.db.get_settings(sent_data)}  # Get user settings
                )
            elif action == "change_settings":
                return jsonify(
                    {"status": 200, "response": self.db.change_settings(sent_data)}  # Change user settings
                )
            elif action == "get_history":
                return jsonify(
                    {"status": 200, "response": self.db.get_history(sent_data)}  # Get user history
                )
            elif action == "change_history":
                return jsonify(
                    {"status": 200, "response": self.db.change_history(sent_data)}  # Change user history
                )
            elif action == "check_credentials":
                return jsonify(
                    {"status": 200, "response": self.db.check_credentials(sent_data)}  # Check user credentials
                )
            elif action == "delete_account":
                return jsonify(
                    {"status": 200, "response": self.db.delete_user(sent_data)}  # Delete user account
                )
            elif action == "get_email":
                return jsonify(
                    {"status": 200, "response": self.db.get_email(sent_data)}  # Get user email
                )
            elif action == "get_name":
                return jsonify({"status": 200, "response": self.db.get_name(sent_data)})  # Get user name

            return jsonify({"status": 401, "response": "Invalid action"})  # Action validation

        # Route for voice recognition
        @self.app.route("/interstellar_ai/api/voice_recognition", methods=["POST"])
        def voice_recognition():
            audio = request.files.get("audio")  # Get audio file from request
            text = self.voice.recognition(audio)  # Perform voice recognition
            return jsonify({"status": 200, "response": text})  # Return recognized text

        # Route for weather information retrieval
        @self.app.route("/interstellar_ai/api/weather", methods=["POST"])
        def get_weather():
            sent_data = request.get_json()  # Get JSON data from the request
            unit_type = sent_data.get("unit_type")  # Extract unit type (metric, imperial)
            city = sent_data.get("city")  # Extract city name
            weather_data = self.weather.getweather(unit_type, city)  # Get weather data
            return jsonify({"status": 200, "response": weather_data})  # Return weather data

        self.app.run(debug=True, host="0.0.0.0", port=5000)  # Start the Flask app

        # Route for Text-to-Speech conversion
        @self.app.route("/interstellar_ai/api/tts", methods=["POST"])
        def tts():
            text = request.args.get("text")  # Get text from query parameters
            return jsonify({"status": 200, "response": self.tts.gen_tts(text)})  # Generate TTS and return response


# Initialize the API class and run the application
api = API()
api.run()
