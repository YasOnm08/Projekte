// OpenSourceModeToggle.tsx
import React from 'react';

interface OpenSourceModeToggleProps {
  openSourceMode: boolean; // Current state of open source mode
  setOpenSourceMode: (value: boolean) => void; // Function to update open source mode
  setSelectedOption: (value: string) => void; // Function to update the selected option
}

const OpenSourceModeToggle: React.FC<OpenSourceModeToggleProps> = ({ 
  openSourceMode, 
  setOpenSourceMode, 
  setSelectedOption 
}) => {
  // Handle toggle change event
  const handleToggleChange = () => {
    const newValue = !openSourceMode; // Toggle the current state
    setOpenSourceMode(newValue); // Update the open source mode state
    
    // Update radio selection based on the new openSourceMode value
    if (newValue) {
      setSelectedOption('FOSS'); // Set to FOSS if enabling open source mode
    } else {
      setSelectedOption('None'); // Set to a default value when disabling
    }
  };

  return (
    <div className="settings-option"> {/* Container for the toggle setting */}
      <label>
        <input
          type="checkbox" // Checkbox for toggling open source mode
          checked={openSourceMode} // Check if the mode is currently enabled
          onChange={handleToggleChange} // Handle changes to the checkbox
        />
        Enable Open Source Mode
      </label>
    </div>
  );
};

export default OpenSourceModeToggle;
