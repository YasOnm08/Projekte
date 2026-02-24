// PrivacySettings.tsx
import React from 'react';

interface PrivacySettingsProps {
  selectedOption: string; // The currently selected option
  handleRadioChange: (option: string) => void; // Function to handle option changes
  openSourceMode: boolean; // Boolean to check if the mode is open source
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ selectedOption, handleRadioChange, openSourceMode }) => {
  return (
    <>
      {/* AI Mode Radio Options */}
      <div className="settings-option">
        <p>Disable Options:</p>
        <div className="slider">
          {/* Offline Option */}
          <div
            className={`slider-option ${selectedOption === 'Offline' ? 'active' : ''}`} // Active class based on selection
            onClick={() => handleRadioChange('Offline')} // Handle selection change
          >
            Offline tools{openSourceMode ? ' (FOSS)' : ''} {/* Display FOSS label if applicable */}
          </div>

          {/* Online Option */}
          <div
            className={`slider-option ${selectedOption === 'Online' ? 'active' : ''}`} // Active class based on selection
            onClick={() => handleRadioChange('Online')} // Handle selection change
          >
            Online tools{openSourceMode ? ' (FOSS)' : ''} {/* Display FOSS label if applicable */}
          </div>

          {/* None Option */}
          <div
            className={`slider-option ${selectedOption === 'None' ? 'active' : ''}`} // Active class based on selection
            onClick={() => handleRadioChange('None')} // Handle selection change
          >
            None{openSourceMode ? ' (FOSS)' : ''} {/* Display FOSS label if applicable */}
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default PrivacySettings;
