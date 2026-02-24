// FontSizeSetting.tsx
import React from 'react';

interface FontSizeSettingProps {
  fontSize: string; // The current font size as a string (e.g., "16px")
  setFontSize: (newSize: string) => void; // Function to update the font size
}

const FontSizeSetting: React.FC<FontSizeSettingProps> = ({ fontSize, setFontSize }) => {
  // Handle changes to the font size input
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = `${e.target.value}px`; // Create the new font size string
    setFontSize(newSize); // Update the font size state
    document.documentElement.style.setProperty('--font-size', newSize); // Update the CSS variable
  };

  return (
    <div className="settings-option"> {/* Container for the font size setting */}
      <p>Font Size</p> {/* Label for the setting */}
      <input
        type="range" // Range input for selecting font size
        min="12" // Minimum font size
        max="30" // Maximum font size
        value={parseInt(fontSize, 10)} // Ensure value is a number for the slider
        onChange={handleFontSizeChange} // Update font size on change
      />
      <span>{fontSize}</span> {/* Display the current font size */}
    </div>
  );
};

export default FontSizeSetting;
