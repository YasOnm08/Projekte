import React from 'react';

// Define the props for the ButtonSetting component
interface ButtonSettingProps {
  label: string; // The label to display on the button
  onClick: () => void; // The function to call when the button is clicked
  className?: string; // Optional additional classes for styling
}

// Functional component definition
const ButtonSetting: React.FC<ButtonSettingProps> = ({ label, onClick, className }) => {
  return (
    <div className="settings-option"> {/* Container for the button */}
      <button
        onClick={onClick} // Call the onClick function when the button is clicked
        className={`export-button ${className || ''}`} // Apply any additional classes, default to empty if not provided
      >
        {label} {/* Display the label on the button */}
      </button>
    </div>
  );
};

export default ButtonSetting;
