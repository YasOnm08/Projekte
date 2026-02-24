import React, { useState, ForwardedRef, useEffect } from 'react';
import "../styles/variables.css";

interface InputProps {
  message: string;
  onSendClick: (message: string, override: boolean) => void;
  onMicClick: () => void;
  inputDisabled: boolean;
  isRecording: boolean;
}

const InputFrontend = React.forwardRef<HTMLDivElement, InputProps>(
  ({ message, onSendClick, onMicClick, inputDisabled, isRecording }, ref: ForwardedRef<HTMLDivElement>) => {
    const [inputValue, setInputValue] = useState('');

    // Sync the inputValue state with the message prop
    useEffect(() => {
      setInputValue(message);
    }, [message]);

    // Handle the input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    // Handle 'Enter' key press
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!inputDisabled && event.key === 'Enter') {
        onSendClick(inputValue, false); // Send the message on Enter
        setInputValue(''); // Clear the input after submission
        event.preventDefault(); // Prevent the default Enter action
      }
    };

    // Handle the Send button click
    const handleSendClick = () => {
      if (inputValue.trim() !== "") {
        onSendClick(inputValue, false);  // Send message
        setInputValue('');               // Clear input after sending
      }
    };

    return (
      <div className="input" id="inputForm" ref={ref}>
        {/* Input field for typing messages */}
        <input
          type="text"
          name="user_message"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="textInputField"
          disabled={inputDisabled}  // Disable when inputDisabled is true
        />

        {/* Send button */}
        <button type="button" onClick={handleSendClick} disabled={inputDisabled}>
          <svg style={{ fill: "var(--text-color)" }} viewBox="0 0 512 512" width={20}>
            <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
          </svg>
        </button>

        {/* Microphone button */}
        <button className={`microphone-button ${isRecording ? "red" : "var(--input-button-color)"}`} type="button" onClick={onMicClick}>
          <svg style={{ fill: "var(--text-color)" }} viewBox="0 0 384 512" width={15}>
            <path d="M192 0C139 0 96 43 96 96l0 160c0 53 43 96 96 96s96-43 96-96l0-160c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6c85.8-11.7 152-85.3 152-174.4l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-40z" />
          </svg>
        </button>
      </div>
    );
  }
);

InputFrontend.displayName = "InputFrontend";

export default InputFrontend;
