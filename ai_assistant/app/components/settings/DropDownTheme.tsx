// ThemeDropdown.tsx
import React from 'react';

const ThemeDropdown: React.FC<{
  selectedTheme: string; // Currently selected theme
  setSelectedTheme: (theme: string) => void; // Function to update the selected theme
}> = ({ selectedTheme, setSelectedTheme }) => {
  // Define available theme options
  const themeOptions = [
    { value: 'IOMARKET', label: 'IOMARKET' },
    { value: 'WHITE', label: 'WHITE' },
    { value: 'BLACK', label: 'BLACK' },
    { value: 'BASIC-CUSTOM', label: 'BASIC-CUSTOM' },
    { value: 'CUSTOM', label: 'CUSTOM' },
  ];

  return (
    <div className="settings-option"> {/* Container for the dropdown */}
      <p>Select Theme</p> {/* Label for the dropdown */}
      <select
        value={selectedTheme} // Current selected theme
        onChange={(e) => { // Handler for dropdown changes
          const theme = e.target.value; // Get the selected value
          if (theme !== 'default' && typeof localStorage !== 'undefined') {
            setSelectedTheme(theme); // Update the selected theme state
            localStorage.setItem('selectedTheme', theme); // Save the theme to localStorage
          }
        }}
      >
        <option value="default">Select your style...</option> {/* Default option */}
        {themeOptions.map((option) => ( // Map through theme options to create <option> elements
          <option key={option.value} value={option.value}>
            {option.label} {/* Display the label for the option */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeDropdown;
