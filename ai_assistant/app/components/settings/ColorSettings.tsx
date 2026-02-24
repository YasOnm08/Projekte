import React from 'react';

// Define the props for the ColorSetting component
interface ColorSettingProps {
    name: string; // The name to display in the <p> tag
    value: string; // The current color value
    setValue: (newColor: string) => void; // The method to update the state
    cssVariable: string; // The CSS variable name to set
}

// Functional component definition
const ColorSetting: React.FC<ColorSettingProps> = ({ name, value, setValue, cssVariable }) => {
    // Handler to change the color value
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value; // Get the new color from the input
        setValue(newColor); // Update the state with the new color
        document.documentElement.style.setProperty(cssVariable, newColor); // Set the CSS variable
    };

    return (
        <div className="settings-option"> {/* Container for the color setting */}
            <p>{name}</p> {/* Display the name */}
            <input
                type="color" // Input type for color picker
                value={value} // Set the input value to the current color
                onChange={handleColorChange} // Call the handler on change
            />
        </div>
    );
};

export default ColorSetting;
