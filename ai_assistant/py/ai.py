from mistralai import Mistral
from openai import OpenAI
import google.generativeai as genai
import anthropic
import ollama

class AI:
    @staticmethod
    def process_local(model, messages, return_class, access_token):
        """Process chat messages using the Ollama model locally."""
        # Stream the chat response from the Ollama model
        stream = ollama.chat(
            model=model,
            messages=messages,
            stream=True,
            options={"temperature": 0.5},
        )

        # Initialize the AI response for the given access token
        with return_class.ai_response_lock:
            return_class.ai_response[access_token] = ""

        # Collect the response chunks and append to the response for the given access token
        for chunk in stream:
            with return_class.ai_response_lock:
                return_class.ai_response[access_token] += chunk["message"]["content"]

    @staticmethod
    def process_mistralai(model, messages, return_class, access_token, api_key):
        """Process chat messages using the Mistral AI model."""
        client = Mistral(api_key=api_key)

        # Stream the chat response from the Mistral model
        stream_response = client.chat.stream(model=model, messages=messages)

        # Initialize the AI response for the given access token
        with return_class.ai_response_lock:
            return_class.ai_response[access_token] = ""

        # Collect the response chunks and append to the response for the given access token
        for chunk in stream_response:
            with return_class.ai_response_lock:
                return_class.ai_response[access_token] += chunk.data.choices[0].delta.content

    @staticmethod
    def process_openai(model, messages, return_class, access_token, api_key):
        """Process chat messages using the OpenAI model."""
        client = OpenAI(api_key=api_key)

        # Stream the chat response from the OpenAI model
        stream_response = client.chat.completions.create(
            model=model, messages=messages, stream=True
        )

        # Initialize the AI response for the given access token
        with return_class.ai_response_lock:
            return_class.ai_response[access_token] = ""

        # Collect the response chunks and append to the response for the given access token
        for chunk in stream_response:
            with return_class.ai_response_lock:
                return_class.ai_response[access_token] += chunk.choices[0].delta.content

    @staticmethod
    def process_anthropic(model, messages, return_class, access_token, api_key):
        """Process chat messages using the Anthropic model."""
        client = anthropic.Anthropic(api_key=api_key)

        # Initialize the AI response for the given access token
        with return_class.ai_response_lock:
            return_class.ai_response[access_token] = ""

        # Stream the chat response from the Anthropic model
        with client.messages.stream(
            max_tokens=1024,
            model=model,
            messages=messages,
        ) as stream:
            for text in stream.text_stream:
                with return_class.ai_response_lock:
                    return_class.ai_response[access_token] += text

    @staticmethod
    def process_google(model, messages, return_class, access_token, api_key):
        """Process chat messages using the Google Generative AI model."""
        message = messages[-1]["content"]  # Get the latest message content
        messages.pop()  # Remove the latest message from the list

        # Prepare messages for the Google Generative AI format
        for msg in messages:
            msg["parts"] = msg.pop()["content"]

        # Change 'assistant' role to 'model' for compatibility
        for msg in messages:
            if msg["role"] == "assistant":
                msg["role"] = "model"

        # Configure the Google Generative AI client
        genai.configure(api_key=api_key)

        # Start a chat session with the specified model and message history
        model = genai.GenerativeModel(model)
        chat = model.start_chat(history=messages)

        # Send the message and stream the response
        response = chat.send_message(message, stream=True)
        for chunk in response:
            return_class.ai_response[access_token] += chunk.text
