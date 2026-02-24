import React from 'react';

// Define the props for the CheckboxSetting component
interface CheckboxSettingProps {
  label: string; // The label to display
  checked: boolean; // The checked state of the checkbox
  setChecked: (value: boolean) => void; // Method to update the state
}

// Functional component definition
const CheckboxSetting: React.FC<CheckboxSettingProps> = ({ label, checked, setChecked }) => {
  // Handler to toggle the checkbox state
  const handleCheckboxChange = () => {
    setChecked(!checked); // Toggle the checked state
  };

  return (
    <div className="settings-option"> {/* Container for the checkbox setting */}
      <label>
        <input
          type="checkbox" // Checkbox input type
          checked={checked} // Set the checked state based on the prop
          onChange={handleCheckboxChange} // Call the handler on change
        />
        {label} {/* Display the label next to the checkbox */}
      </label>
    </div>
  );
};

export default CheckboxSetting;
