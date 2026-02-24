import React from 'react';

interface TextSettingProps {
  label: string; // The label to display
  value: string; // The current text value
  setValue: (newText: string) => void; // The method to update the state
  type: 'text' | 'email' | 'password'; // The type of input field
  placeholder?: string; // Optional placeholder text
}

const TextSetting: React.FC<TextSettingProps> = ({ label, value, setValue, type, placeholder }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value; // Get the new value from the input
    setValue(newText); // Update the state in the parent component
  };

  return (
    <div className="settings-option">
      <label>{label}</label>
      <input
        type={type} // Use the type prop for the input
        value={value} // Set the current value
        onChange={handleTextChange} // Handle input changes
        placeholder={placeholder} // Set the placeholder text
        className='textInputField'
      />
    </div>
  );
};

export default TextSetting;
