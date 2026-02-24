import React from 'react';

// Define the structure of each option in the dropdown
interface Option {
    value: string; // The actual value to be used
    label: string; // The label to display for the option
}

// Define the props for the DropdownSetting component
interface DropdownSettingProps {
    label: string; // The label to display above the dropdown
    value: string; // The currently selected value
    setValue: (newValue: string) => void; // Method to update the state with the new value
    options: Option[]; // List of options for the dropdown
}

// Functional component definition
const DropdownSetting: React.FC<DropdownSettingProps> = ({ label, value, setValue, options }) => {
    // Handler to change the selected option
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value; // Get the new selected value
        setValue(newValue); // Update the state with the new value
    };

    return (
        <div className="settings-option"> {/* Container for the dropdown setting */}
            <label>{label}</label> {/* Display the label */}
            <select value={value} onChange={handleSelectChange}> {/* Dropdown selection */}
                {options.map((option) => ( // Map through options to create <option> elements
                    <option key={option.value} value={option.value}>
                        {option.label} {/* Display the label for the option */}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownSetting;
