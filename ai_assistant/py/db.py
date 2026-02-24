import hashlib
import json
import os
import pycouchdb

class DB:
    def __init__(self):
        # Initialize the database dictionary to store user data
        self.database = {}

    def ensure_username(self, data):
        # Ensure a username can be retrieved either from username or email
        if "username" in data:
            return data.get("username")
        elif "email" in data:
            for index, entry in self.database.items():
                if entry.get("email") == data.get("email"):
                    return index

    @staticmethod
    def hash_password(password):
        # Hash the password with a salt for secure storage
        salt = "your_secret_salt"  # Consider using a secure random salt
        hashed_password = hashlib.sha256((password + salt).encode()).hexdigest()
        return hashed_password

    def add_user(self, data):
        # Add a new user to the database if username is unique
        username = data.get("username")
        password = data.get("password")
        email = data.get("email")
        hashed_password = self.hash_password(password)  # Hash the password
        user_data = {
            "hashed_password": hashed_password,
            "email": email,
            "settings": None,
            "history": None,
        }
        if username not in self.database:
            self.database[username] = user_data
            self.save_database()  # Save changes to the database
            return True
        return False  # User already exists

    def delete_user(self, data):
        # Delete a user from the database if credentials are valid
        username = self.ensure_username(data)
        if not self.check_credentials(data):
            return False  # Invalid credentials

        del self.database[username]  # Remove user from database
        self.save_database()  # Save changes
        return True

    def update_password(self, data):
        # Update the user's password if credentials are valid
        username = self.ensure_username(data)
        new_password = data.get("new_password")
        if not self.check_credentials(data):
            return False  # Invalid credentials

        hashed_new_password = self.hash_password(new_password)  # Hash the new password
        self.database[username].update({"hashed_password": hashed_new_password})
        self.save_database()  # Save changes
        return True

    def check_credentials(self, data):
        # Verify if provided credentials match stored data
        username = self.ensure_username(data)
        password = data.get("password")
        if username not in self.database:
            return False  # User not found

        stored_hashed_password = self.database[username]["hashed_password"]
        entered_hashed_password = self.hash_password(password)
        return stored_hashed_password == entered_hashed_password  # Check hashed password

    def change_settings(self, data):
        # Change user settings if credentials are valid
        username = self.ensure_username(data)
        if not self.check_credentials(data):
            return False  # Invalid credentials

        self.database[username]["settings"] = data.get("data")  # Update settings
        self.save_database()  # Save changes
        return True

    def get_settings(self, data):
        # Retrieve user settings if credentials are valid
        username = self.ensure_username(data)
        if not self.check_credentials(data):
            return None  # Invalid credentials

        send_back = self.database[username].get("settings")  # Get settings
        return send_back

    def change_history(self, data):
        # Change user history if credentials are valid
        username = self.ensure_username(data)
        if not self.check_credentials(data):
            return False  # Invalid credentials

        self.database[username]["history"] = data.get("data")  # Update history
        self.save_database()  # Save changes
        return True

    def get_history(self, data):
        # Retrieve user history if credentials are valid
        username = self.ensure_username(data)
        if not self.check_credentials(data):
            return None  # Invalid credentials

        send_back = self.database[username].get("history")  # Get history
        return send_back

    def get_email(self, data):
        # Retrieve user email if credentials are valid
        username = self.ensure_username(data)
        if not self.check_credentials(data):
            return None  # Invalid credentials

        send_back = self.database[username].get("email")  # Get email
        return send_back

    def get_name(self, data):
        # Retrieve username if credentials are valid
        if not self.check_credentials(data):
            return None  # Invalid credentials

        send_back = self.ensure_username(data)  # Get username
        return send_back

    def save_database(self):
        # Save the database to the specified storage (CouchDB or JSON file)
        if os.environ.get("PRODUCTION") == "YES":
            server = pycouchdb.Server("http://admin:admin@localhost:5984/")
            db = server.database("interstellar_ai")
            db.save(self.database)  # Save to CouchDB

        else:
            with open("database.json", "w") as file:
                json.dump(self.database, file)  # Save to JSON file

    def load_database(self):
        # Load the database from the specified storage (CouchDB or JSON file)
        if os.environ.get("PRODUCTION") == "YES":
            server = pycouchdb.Server("http://admin:admin@localhost:5984/")
            db = server.database("interstellar_ai")
            if db:
                self.database = db  # Load from CouchDB
            else:
                server.create("interstellar_ai")  # Create database if it doesn't exist
                db = server.database("interstellar_ai")
                db.save(self.database)  # Save initial empty database
        else:
            try:
                with open("database.json", "r") as file:
                    self.database = json.load(file)  # Load from JSON file
            except FileNotFoundError:
                pass  # File not found, do nothing
