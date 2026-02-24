import React, { useState, useEffect } from 'react';
import {
  createAccount,
  checkCredentials,
  getSettings
} from '../backend/database';
import Settings from './settings/Settings'; // Import the Settings component
import { importDatabase } from './settings/settingUtils';

const Login: React.FC = () => {
  // State to handle popup visibility
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  // Credentials state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountName, setAccountName] = useState('');
  const [newAccountEmail, setNewAccountEmail] = useState('');
  const [newAccountPassword, setNewAccountPassword] = useState('');
  const [newAccountName, setNewAccountName] = useState('');

  // On component mount, check if there are credentials in localStorage
  useEffect(() => {
    let savedAccountName: string | null;
    let savedAccountEmail: string | null;
    let savedAccountPassword: string | null;
    if (typeof localStorage !== 'undefined') {
      savedAccountName = localStorage.getItem('accountName');
      savedAccountEmail = localStorage.getItem('accountEmail');
      savedAccountPassword = localStorage.getItem('accountPassword');

      // If credentials are found in localStorage, log the user in
      if (savedAccountName && savedAccountEmail && savedAccountPassword) {
        setAccountName(savedAccountName);
        setEmail(savedAccountEmail);
        setPassword(savedAccountPassword);
        const check = async () => {
          if (savedAccountName !== null && savedAccountPassword !== null) {
            const success = await checkCredentials(savedAccountName, savedAccountPassword);
            setIsLoggedIn(success); // Automatically log in
            const useName = localStorage.getItem("accountName");
            const usePassword = localStorage.getItem("accountPassword");

            if (useName && usePassword) {
              await importDatabase(useName, usePassword);
            }


          }
        };
        check();
      }
    }
  }, []);

  // Function to toggle the login popup
  const toggleLoginPopup = () => setShowLoginPopup(!showLoginPopup);

  // Function to toggle the sign-up popup
  const toggleSignUpPopup = () => {
    setShowSignUpPopup(!showSignUpPopup);
    setShowLoginPopup(false);
  };

  // Function to handle login
  const handleLogin = async () => {
    if (accountName && password) {
      const success = await checkCredentials(accountName, password);
      if (success) {
        setIsLoggedIn(true); // Successful login
        const data = await getSettings(accountName, password)
        if (data) {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem("dataFromServer", data)
          }
        }
        setShowLoginPopup(false); // Close the login popup
        const useName = localStorage.getItem("accountName");
        const usePassword = localStorage.getItem("accountPassword");

        if (useName && usePassword) {
          await importDatabase(useName, usePassword);
        }

        window.location.reload();
      } else {
        alert('Incorrect credentials');
      }
    } else {
      alert('Incorrect credentials');
    }
  };

  // Function to handle account creation
  const handleCreateAccount = async () => {
    if (newAccountName !== "" && newAccountEmail !== "" && newAccountPassword !== "") {
      const success = await createAccount(newAccountName, newAccountEmail, newAccountPassword);
      if (success) {
        alert('Account created successfully! You can now log in.');
        toggleSignUpPopup(); // Close sign-up popup
      } else {
        alert('Account creation failed. Please try again.');
      }
    } else {
      alert('Account creation failed. Please do not leave any field empty.');
    }
  };

  // Function to toggle the settings popup
  const toggleSettingsPopup = () => setShowSettingsPopup(!showSettingsPopup);

  return (
    <div>
      {/* Login or Settings Button */}
      <button className='header-login-button' onClick={isLoggedIn ? toggleSettingsPopup : toggleLoginPopup}>
        {isLoggedIn ? <svg style={{ fill: "var(--text-color)" }} viewBox="0 0 512 512" width={25} height={35} preserveAspectRatio="xMidYMid meet"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" /></svg> : 'Log In'}
      </button>

      {/* Conditional rendering of the Login Popup */}
      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Log In</h2>

            {/* Close Button */}
            <button className="close-popup" onClick={toggleLoginPopup} aria-label="Close popup">
              Close
            </button>

            {/* Name or Email Input */}
            <div>
              <input
                type="text"
                placeholder="Name or Email"
                value={email || accountName} // Display whichever is set
                onChange={(e) => {
                  const input = e.target.value;
                  setEmail(input); // Update both email and accountName states
                  setAccountName(input);
                }}
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Log In Button */}
            <div>
              <button className="log-into-account" onClick={handleLogin}>Log In</button>
            </div>

            {/* Text for creating an account */}
            <p>
              Don&apos;t have an account yet? Create one{' '}
              <span
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={toggleSignUpPopup}
              >
                here
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Conditional rendering of the Sign-Up Popup */}
      {showSignUpPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Create Account</h2>

            {/* New Account Email Input */}
            <div>
              <input
                type="text"
                placeholder="Email"
                value={newAccountEmail}
                onChange={(e) => setNewAccountEmail(e.target.value)}
              />
            </div>

            {/* New Account Name Input */}
            <div>
              <input
                type="text"
                placeholder="Name"
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
              />
            </div>

            {/* New Account Password Input */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={newAccountPassword}
                onChange={(e) => setNewAccountPassword(e.target.value)}
              />
            </div>

            {/* Create Account Button */}
            <div>
              <button className="create-account" onClick={handleCreateAccount}>Create Account</button>
            </div>

            {/* Close Button */}
            <button className="close-popup" onClick={toggleSignUpPopup} aria-label="Close popup">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Conditional rendering of the Settings Popup */}
      {showSettingsPopup && <Settings closeSettings={toggleSettingsPopup} accountName={accountName} />}
    </div>
  );
};

export default Login;
