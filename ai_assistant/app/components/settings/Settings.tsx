//#region imports
import React, { useState, useEffect } from 'react';
import { applyTheme } from './theme';
import { exportSettings, importSettings, sendToDatabase, importDatabase } from './settingUtils'; // Import utility functions
import { getAllLocalStorageItems } from '../../backend/GetLocalStorage';
import ColorSetting from './ColorSettings';
import TextSettings from './TextSettings'
import ButtonSetting from './ButtonSettings';
import DropdownSetting from './DropDown';
import CheckboxSetting from './CheckBox';
import PrivacySettings from './PrivacySettings';
import FontSizeSetting from './FontSize';
import OpenSourceModeToggle from './OpenSourceToggle';
import {
  changeSettings,
  createAccount,
  deleteAccount,
} from '../../backend/database';
import ThemeDropdown from './DropDownTheme';

const Settings: React.FC<{ closeSettings: () => void; accountName: string }> = ({ closeSettings, accountName }) => {

  const getItemFromLocalStorage = (key: string) => {
    const item = localStorage.getItem(key);

    if (item) {
      try {
        return JSON.parse(item); // Attempt to parse the item
      } catch (e) {
        console.error(`Error parsing JSON for key "${key}":`, e);
        return false; // Return false if parsing fails
      }
    }

    return false; // Default to false if item is null or empty
  };

  //#region variables

  // Active section
  const [activeSection, setActiveSection] = useState(() => localStorage.getItem('activeSection') || 'general');

  // Language setting
  const [preferredLanguage, setPreferredLanguage] = useState(() => localStorage.getItem('preferredLanguage') || 'en');

  // Currency setting
  const [preferredCurrency, setPreferredCurrency] = useState(() => localStorage.getItem('preferredCurrency') || 'usd');

  // Date and time format settings
  const [dateFormat, setDateFormat] = useState(() => localStorage.getItem('dateFormat') || 'mm/dd/yyyy');
  const [timeFormat, setTimeFormat] = useState(() => localStorage.getItem('timeFormat') || '12-hour');
  const [timeZone, setTimeZone] = useState(() => localStorage.getItem('timeZone') || 'GMT');

  // Online AI and chat history settings
  const [selectedOption, setSelectedOption] = useState('Offline'); // Default to 'Offline'
  const [disableChatHistory, setDisableChatHistory] = useState(() => getItemFromLocalStorage('disableChatHistory'));
  const [disableAIMemory, setDisableAIMemory] = useState(() => getItemFromLocalStorage('disableAIMemory'));
  const [openSourceMode, setOpenSourceMode] = useState(() => getItemFromLocalStorage('openSourceMode'));

  // User credentials
  const [newName, setNewName] = useState(() => localStorage.getItem('newName') || '');
  const [newEmail, setNewEmail] = useState(() => localStorage.getItem('newEmail') || '');
  const [newPassword, setNewPassword] = useState(() => localStorage.getItem('newPassword') || '');

  // Measurement setting
  const [preferredMeasurement, setPreferredMeasurement] = useState(() => localStorage.getItem('preferredMeasurement') || 'Metric');

  //#region Theme settings
  const [backgroundColor, setBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim());
  const [headerBackground, setHeaderBackground] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--header-background-color').trim());
  const [textColor, setTextColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim());
  const [inputBackgroundColor, setInputBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--input-background-color').trim());
  const [inputButtonColor, setInputButtonColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--input-button-color').trim());
  const [inputButtonHoverColor, setInputButtonHoverColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--input-button-hover-color').trim());
  const [userMessageBackgroundColor, setUserMessageBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--user-message-background-color').trim());
  const [userMessageTextColor, setUserMessageTextColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--user-message-text-color').trim());
  const [aiMessageBackgroundColor, setAiMessageBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--ai-message-background-color').trim());
  const [aiMessageTextColor, setAiMessageTextColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--ai-message-text-color').trim());
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--button-background-color').trim());
  const [buttonHoverBackgroundColor, setButtonHoverBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--button-hover-background-color').trim());
  const [modelsBackgroundColor, setModelsBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--models-background-color').trim());
  const [historyBackgroundColor, setHistoryBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--history-background-color').trim());
  const [leftPanelBackgroundColor, setLeftPanelBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--left-panel-background-color').trim());
  const [conversationBackgroundColor, setConversationBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--conversation-background-color').trim());
  const [popUpTextColor, setPopUpTextColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--pop-up-text').trim());
  const [inputBorderColor, setInputBorderColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--input-border-color').trim());
  const [fontFamily, setFontFamily] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--font-family').trim());
  const [fontSize, setFontSize] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--font-size').trim());
  const [burgerMenu] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--burger-menu-background-color').trim());
  const [burgerMenuBackgroundColor, setBurgerMenuBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--burger-menu-background-color').trim());
  const [faqBackgroundColor, setFaqBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--faq-background-color').trim());
  const [faqHeadingColor, setFaqHeadingColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--faq-heading-color').trim());
  const [faqItemBackgroundColor, setFaqItemBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--faq-item-background-color').trim());
  const [faqItemHeadingColor, setFaqItemHeadingColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--faq-item-heading-color').trim());
  const [faqItemTextColor, setFaqItemTextColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--faq-item-text-color').trim());
  const [faqItemHoverBackgroundColor, setFaqItemHoverBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--faq-item-hover-background-color').trim());
  const [popupBackgroundColor, setPopupBackgroundColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--popup-background-color').trim());
  const [overlayTextColor, setOverlayTextColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--overlay-text-color').trim());
  const [closeButtonColor, setCloseButtonColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--close-button-color').trim());
  const [closeButtonHoverColor, setCloseButtonHoverColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--close-button-hover-color').trim());
  const [applyButtonColor, setApplyButtonColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--apply-button-color').trim());
  const [applyButtonHoverColor, setApplyButtonHoverColor] = useState(() => getComputedStyle(document.documentElement).getPropertyValue('--apply-button-hover-color').trim());

  // Per default a purple color gradient
  const [primaryColor, setPrimaryColor] = useState(localStorage.getItem("primaryColor") || "#dc8add");
  const [secondaryColor, setSecondaryColor] = useState(localStorage.getItem("secondaryColor") || "#c061cb");
  const [accentColor, setAccentColor] = useState(localStorage.getItem("accentColor") || "#9141ac");
  const [basicBackgroundColor, setBasicBackgroundColor] = useState(localStorage.getItem("basicBackgroundColor") || "#813d9c");
  const [basicTextColor, setBasicTextColor] = useState(localStorage.getItem("basicTextColor") || "#fefefe");

  // Theme selection
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  // Weather selection
  const [weatherInfo, setWeatherInfo] = useState(localStorage.getItem('weatherInfo') || "");

  // API Keys

  const [mistral, setMistral] = useState(localStorage.getItem('mistral') || "");
  const [openai, setOpenai] = useState(localStorage.getItem('openai') || "");
  const [anthropic, setAnthropic] = useState(localStorage.getItem('anthropic') || "");
  const [google, setGoogle] = useState(localStorage.getItem('google') || "");
  const [myBoolean, setMyBoolean] = useState<boolean>(() => getItemFromLocalStorage('myBoolean'));

  //#region Json
  const settings = {
    userPreferences: {
      activeSection,
      preferredLanguage,
      preferredCurrency,
      preferredMeasurement,
      dateFormat,
      timeFormat,
      timeZone,
      selectedOption,
      disableChatHistory,
      disableAIMemory,
      openSourceMode,
      weatherInfo,
      myBoolean
    },
    theme: {
      backgroundColor,
      headerBackground,
      textColor,
      inputBackgroundColor,
      inputButtonColor,
      inputButtonHoverColor,
      userMessageBackgroundColor,
      userMessageTextColor,
      aiMessageBackgroundColor,
      aiMessageTextColor,
      buttonBackgroundColor,
      buttonHoverBackgroundColor,
      modelsBackgroundColor,
      historyBackgroundColor,
      leftPanelBackgroundColor,
      conversationBackgroundColor,
      popUpTextColor,
      inputBorderColor,
      fontFamily,
      fontSize,
      selectedTheme,
      faqBackgroundColor,
      faqHeadingColor,
      faqItemBackgroundColor,
      faqItemHeadingColor,
      faqItemTextColor,
      faqItemHoverBackgroundColor,
      popupBackgroundColor,
      overlayTextColor,
      primaryColor,
      secondaryColor,
      accentColor,
      basicBackgroundColor,
      basicTextColor
    },
    apiKeys: {
      mistral,
      openai,
      anthropic,
      google,
    },
    generalSettings: {
      burgerMenu,
    },
  };

  //#region color settings
  const colorSettings = [
    { name: "Background Color", value: backgroundColor, setValue: setBackgroundColor, cssVariable: "--background-color" },
    { name: "Header Background Color", value: headerBackground, setValue: setHeaderBackground, cssVariable: "--header-background-color" },
    { name: "Text Color", value: textColor, setValue: setTextColor, cssVariable: "--text-color" },
    { name: "Input Background Color", value: inputBackgroundColor, setValue: setInputBackgroundColor, cssVariable: "--input-background-color" },
    { name: "Input Button Color", value: inputButtonColor, setValue: setInputButtonColor, cssVariable: "--input-button-color" },
    { name: "Input Button Hover Color", value: inputButtonHoverColor, setValue: setInputButtonHoverColor, cssVariable: "--input-button-hover-color" },
    { name: "User Message Background Color", value: userMessageBackgroundColor, setValue: setUserMessageBackgroundColor, cssVariable: "--user-message-background-color" },
    { name: "User Message Text Color", value: userMessageTextColor, setValue: setUserMessageTextColor, cssVariable: "--user-message-text-color" },
    { name: "AI Message Background Color", value: aiMessageBackgroundColor, setValue: setAiMessageBackgroundColor, cssVariable: "--ai-message-background-color" },
    { name: "AI Message Text Color", value: aiMessageTextColor, setValue: setAiMessageTextColor, cssVariable: "--ai-message-text-color" },
    { name: "Button Background Color", value: buttonBackgroundColor, setValue: setButtonBackgroundColor, cssVariable: "--button-background-color" },
    { name: "Button Hover Background Color", value: buttonHoverBackgroundColor, setValue: setButtonHoverBackgroundColor, cssVariable: "--button-hover-background-color" },
    { name: "Models Background Color", value: modelsBackgroundColor, setValue: setModelsBackgroundColor, cssVariable: "--models-background-color" },
    { name: "History Background Color", value: historyBackgroundColor, setValue: setHistoryBackgroundColor, cssVariable: "--history-background-color" },
    { name: "Left Panel Background Color", value: leftPanelBackgroundColor, setValue: setLeftPanelBackgroundColor, cssVariable: "--left-panel-background-color" },
    { name: "Conversation Background Color", value: conversationBackgroundColor, setValue: setConversationBackgroundColor, cssVariable: "--conversation-background-color" },
    { name: "Pop-up Text Color", value: popUpTextColor, setValue: setPopUpTextColor, cssVariable: "--pop-up-text" },
    { name: "Input Border Color", value: inputBorderColor, setValue: setInputBorderColor, cssVariable: "--input-border-color" },
    { name: "FAQ Background Color", value: faqBackgroundColor, setValue: setFaqBackgroundColor, cssVariable: "--faq-background-color" },
    { name: "FAQ Heading Color", value: faqHeadingColor, setValue: setFaqHeadingColor, cssVariable: "--faq-heading-color" },
    { name: "FAQ Item Background Color", value: faqItemBackgroundColor, setValue: setFaqItemBackgroundColor, cssVariable: "--faq-item-background-color" },
    { name: "FAQ Item Heading Color", value: faqItemHeadingColor, setValue: setFaqItemHeadingColor, cssVariable: "--faq-item-heading-color" },
    { name: "FAQ Item Text Color", value: faqItemTextColor, setValue: setFaqItemTextColor, cssVariable: "--faq-item-text-color" },
    { name: "FAQ Item Hover Background Color", value: faqItemHoverBackgroundColor, setValue: setFaqItemHoverBackgroundColor, cssVariable: "--faq-item-hover-background-color" },
    { name: "Popup Background Color", value: popupBackgroundColor, setValue: setPopupBackgroundColor, cssVariable: "--popup-background-color" },
    { name: "Overlay Text Color", value: overlayTextColor, setValue: setOverlayTextColor, cssVariable: "--overlay-text-color" },
    { name: "Close Button Color", value: closeButtonColor, setValue: setCloseButtonColor, cssVariable: "--close-button-color" },
    { name: "Close Button Hover Color", value: closeButtonHoverColor, setValue: setCloseButtonHoverColor, cssVariable: "--close-button-hover-color" },
    { name: "Apply Button Color", value: applyButtonColor, setValue: setApplyButtonColor, cssVariable: "--apply-button-color" },
    { name: "Apply Button Hover Color", value: applyButtonHoverColor, setValue: setApplyButtonHoverColor, cssVariable: "--apply-button-hover-color" },
    { name: "Burger Menu Background Color", value: burgerMenuBackgroundColor, setValue: setBurgerMenuBackgroundColor, cssVariable: "--burger-menu-background-color" },
  ];

  //#region time settings
  const timeZoneOptions = [
    { value: 'GMT', label: 'GMT' },
    { value: 'EST', label: 'EST' },
    { value: 'CST', label: 'CST' },
    { value: 'MST', label: 'MST' },
    { value: 'PST', label: 'PST' },
    { value: 'UTC', label: 'UTC' },
    { value: 'BST', label: 'BST' },
    { value: 'IST', label: 'IST' },
    { value: 'CET', label: 'CET' },
    { value: 'JST', label: 'JST' },
  ];

  //#region language settings
  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ar', name: 'Arabic' },
  ];
  //#region currency settings
  const currencyOptions = [
    { code: 'usd', name: 'USD' },
    { code: 'eur', name: 'EUR' },
    { code: 'gbp', name: 'GBP' },
    { code: 'jpy', name: 'JPY' },
    { code: 'cad', name: 'CAD' },
    { code: 'aud', name: 'AUD' },
    { code: 'chf', name: 'CHF' },
    { code: 'cny', name: 'CNY' },
    { code: 'inr', name: 'INR' },
  ];
  //#region date settings
  const dateFormatOptions = [
    { value: 'mm/dd/yyyy', label: 'MM/DD/YYYY' },
    { value: 'dd/mm/yyyy', label: 'DD/MM/YYYY' },
    { value: 'yyyy-mm-dd', label: 'YYYY-MM-DD' },
    { value: 'mm-dd-yyyy', label: 'MM-DD-YYYY' },
    { value: 'dd-mm-yyyy', label: 'DD-MM-YYYY' },
  ];

  const timeFormatOptions = [
    { value: '12-hour', label: '12 Hour' },
    { value: '24-hour', label: '24 Hour' },
  ];

  const measurementOptions = [
    { value: 'Metric', label: 'Metric' },
    { value: 'Imperial', label: 'Imperial' },
  ];
  //#region text settings
  const fontOptions = [
    { value: "'Poppins', sans-serif", label: 'Poppins' },
    { value: "'Inconsolata', monospace", label: 'Inconsolata' },
    { value: "'Merriweather', serif", label: 'Merriweather' },
    { value: "'Noto Sans', sans-serif", label: 'Noto Sans' },
    { value: "'Noto Serif', serif", label: 'Noto Serif' },
    { value: "'Playfair Display', serif", label: 'Playfair Display' },
    { value: "'Roboto', sans-serif", label: 'Roboto' },
    { value: "'Ubuntu', sans-serif", label: 'Ubuntu' },
    { value: "'Bangers', cursive", label: 'Bangers' },
    { value: "'Caveat', cursive", label: 'Caveat' },
    { value: "'Frederika the Great', cursive", label: 'Frederika the Great' },
    { value: "'Rock Salt', cursive", label: 'Rock Salt' },
    { value: "'Sofadi One', sans-serif", label: 'Sofadi One' },
    { value: "'Zilla Slab Highlight', serif", label: 'Zilla Slab Highlight' },
  ];

  //#region Function
  const handleLogout = () => {
    localStorage.clear();
    alert('Successfully logged out!');
    window.location.reload();
  };

  useEffect(() => {
    const useName = localStorage.getItem("accountName");
    const usePassword = localStorage.getItem("accountPassword");

    if (useName && usePassword) {
      importDatabase(useName, usePassword);
    }

    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      setSelectedTheme(savedTheme);
      applyTheme(savedTheme, primaryColor, secondaryColor, accentColor, basicBackgroundColor, basicTextColor);
    }
  }, []); // Runs only once when the component mounts

  // Effect hooks to update localStorage whenever any state changes
  useEffect(() => {
    // Flatten nested objects
    const flattenedSettings = {
      ...settings.userPreferences,
      ...settings.theme,
      ...settings.apiKeys,
      ...settings.generalSettings,
    };
    // Update localStorage for all settings
    for (const [key, value] of Object.entries(flattenedSettings)) {
      localStorage.setItem(key, typeof value === 'boolean' ? JSON.stringify(value) : value);
    }
  }, [
    ...Object.values(settings.userPreferences),
    ...Object.values(settings.theme),
    ...Object.values(settings.apiKeys),
    ...Object.values(settings.generalSettings),
  ]);

  useEffect(() => {
    const savedOption = localStorage.getItem('radioSelection');
    if (savedOption) {
      savedOption.replace(" (FOSS)", "");
      setSelectedOption(savedOption); // Set saved selection
    }
  }, []);

  const handleRadioChange = (newValue: string) => {
    setSelectedOption(newValue);  // Update the state with the selected option
    localStorage.setItem('radioSelection', newValue);  // Save the selection for persistence
  };

  // Function to handle updating all credentials
  const handleUpdateCredentials = async () => {
    let useName = localStorage.getItem("accountName")
    let useEmail = localStorage.getItem("accountEmail")
    let usePassword = localStorage.getItem("accountPassword")
    if (useName && useEmail && usePassword) {
      await deleteAccount(useName, usePassword)

      if (newName != "") {
        useName = newName
      } if (newEmail != "") {
        useEmail = newEmail
      } if (newPassword != "") {
        usePassword = newPassword
      }

      if (await createAccount(useName, useEmail, usePassword)) {
        if (await changeSettings(useName, usePassword, settings)) {
          localStorage.setItem("currentName", useName)
          localStorage.setItem("currentPassword", usePassword)
          localStorage.setItem("currentEmail", useEmail)
          alert('Account successfully changed!')
          window.location.reload()
        } else {
          alert("failed to send settings")
        }
      } else {
        alert("failed to create account")
      }
    }
  };

  // Function to handle account deletion
  const handleDeleteAccount = async () => {
    const useName = localStorage.getItem("accountName")
    const usePassword = localStorage.getItem("accountPassword")
    if (useName && usePassword) {
      const success = await deleteAccount(useName, usePassword);
      if (success) {
        localStorage.clear();
        alert('Account deleted successfully!');
        window.location.reload()
        // Optionally, redirect or reset state here
      } else {
        alert('Account deletion failed. Please check your password.');
      }
    }
  };

  //#region rendered content
  // Render settings content based on the active section
  const renderSettingsContent = () => {
    switch (activeSection) {
      //#region general
      case 'general':
        return (
          <div className="settings-section">
            <h2>General Settings</h2>

            <CheckboxSetting
              label="Activate System prompt settings"
              checked={myBoolean}
              setChecked={setMyBoolean}
            />
            <TextSettings
              label="Nearest City"
              value={weatherInfo}
              type='text'
              setValue={setWeatherInfo}
              placeholder={localStorage.getItem("weatherInfo") || "Enter nearest city"} // Show current name or a default
            />
            <DropdownSetting
              label="Preferred Language"
              value={preferredLanguage}
              setValue={setPreferredLanguage}
              options={languageOptions.map(lang => ({ value: lang.code, label: lang.name }))} // Convert to Option format
            />

            <DropdownSetting
              label="Preferred Currency"
              value={preferredCurrency}
              setValue={setPreferredCurrency}
              options={currencyOptions.map(currency => ({ value: currency.code, label: currency.name }))} // Convert to Option format
            />

            <DropdownSetting
              label="Date Format"
              value={dateFormat}
              setValue={setDateFormat}
              options={dateFormatOptions} // Already in correct format
            />

            <DropdownSetting
              label="Time Format"
              value={timeFormat}
              setValue={setTimeFormat}
              options={timeFormatOptions} // Already in correct format
            />

            <DropdownSetting
              label="Time Zone"
              value={timeZone}
              setValue={setTimeZone}
              options={timeZoneOptions} // Now in correct format
            />

            <DropdownSetting
              label="Preferred Measurement"
              value={preferredMeasurement}
              setValue={setPreferredMeasurement}
              options={measurementOptions} // Already in correct format
            />
          </div>
        );

      case 'privacy':
        //#region privacy
        return (
          <div className="settings-section">
            <h2>Privacy Settings</h2>

            <PrivacySettings
              selectedOption={selectedOption}
              handleRadioChange={handleRadioChange}
              openSourceMode={openSourceMode}
            />

            <CheckboxSetting
              label="Disable Chat History"
              checked={disableChatHistory}
              setChecked={setDisableChatHistory}
            />

            <CheckboxSetting
              label="Disable AI Memory"
              checked={disableAIMemory}
              setChecked={setDisableAIMemory}
            />
          </div>
        );


      case 'theme':
        //#region theme
        //#region Basic
        return (
          <div className="settings-section">
            <h2>Theme Settings</h2>

            <ThemeDropdown
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
            />
            {selectedTheme === 'BASIC-CUSTOM' && (
              <>
                <h3>Basic Colors</h3>
                {/* Basic Color Inputs using ColorSetting Component */}
                <ColorSetting
                  name="Primary Color"
                  value={primaryColor}
                  setValue={setPrimaryColor}
                  cssVariable=""
                />
                <ColorSetting
                  name="Secondary Color"
                  value={secondaryColor}
                  setValue={setSecondaryColor}
                  cssVariable=""
                />
                <ColorSetting
                  name="Accent Color"
                  value={accentColor}
                  setValue={setAccentColor}
                  cssVariable=""
                />
                <ColorSetting
                  name="Background Color"
                  value={basicBackgroundColor}
                  setValue={setBasicBackgroundColor}
                  cssVariable=""
                />
                <ColorSetting
                  name="Text Color"
                  value={basicTextColor}
                  setValue={setBasicTextColor}
                  cssVariable=""
                />
                <DropdownSetting
                  label="Font Family"
                  value={fontFamily}
                  setValue={(newFont) => {
                    setFontFamily(newFont);
                    document.documentElement.style.setProperty('--font-family', newFont);
                  }}
                  options={fontOptions}
                />
                <FontSizeSetting
                  fontSize={fontSize}
                  setFontSize={setFontSize}
                />
              </>
            )}

            {selectedTheme === 'CUSTOM' && (
              <>
                <h3>Additional Settings</h3>
                {/* Additional Font Size Setting */}
                <FontSizeSetting
                  fontSize={fontSize}
                  setFontSize={setFontSize}
                />

                {colorSettings.map((setting) => (
                  <ColorSetting
                    key={setting.cssVariable}
                    name={setting.name}
                    value={setting.value}
                    setValue={setting.setValue}
                    cssVariable={setting.cssVariable}
                  />
                ))}

                <DropdownSetting
                  label="Font Family"
                  value={fontFamily}
                  setValue={(newFont) => {
                    setFontFamily(newFont);
                    document.documentElement.style.setProperty('--font-family', newFont);
                  }}
                  options={fontOptions}
                />
              </>
            )}
          </div>
        );
      //#region custom --> foss
      case 'foss':
        return (
          <div className="settings-section">
            <h2>Open Source Settings</h2>
            <OpenSourceModeToggle
              openSourceMode={openSourceMode}
              setOpenSourceMode={setOpenSourceMode}
              setSelectedOption={setSelectedOption}
            />
          </div>
        );

      //#region account
      case 'account':
        return (
          <div className="settings-section">
            <h2>Account Settings</h2>
            <TextSettings
              label="New Name"
              value={newName}
              type='text'
              setValue={setNewName}
              placeholder={localStorage.getItem("accountName") || "Current Name"} // Show current name or a default
            />
            <TextSettings
              label="New Email"
              value={newEmail}
              setValue={setNewEmail}
              type="email" // Input type is email
              placeholder={localStorage.getItem("accountEmail") || "Current Email"} // Show current email or a default
            />
            <TextSettings
              label="New Password"
              value={newPassword}
              setValue={setNewPassword}
              type="password"
              placeholder={newPassword ? "********" : "Enter new Password"} // Show asterisks or a default
            />
            <ButtonSetting
              label="Log Out" // Button label
              onClick={handleLogout} // Function to call on click
              className="update-credentials-button" // Custom styling class
            />
            <p>WARNING: Will delete your chat history.</p>
            <ButtonSetting
              label="Update Credentials" // Button label
              onClick={handleUpdateCredentials} // Function to call on click
              className="update-credentials-button" // Custom styling class
            />
            <ButtonSetting
              label="Delete Account" // Button label
              onClick={handleDeleteAccount} // Function to call on click
              className="delete-account-button" // Custom styling class
            />
          </div>
        );
      //#region api
      case 'api':
        return (
          <div className="settings-section">
            <TextSettings
              label="La Plateforme" // Label for the input
              value={mistral} // State variable for the input
              setValue={setMistral} // State updater function
              type="text" // Input type
              placeholder={localStorage.getItem('mistral') || "Enter the API key"}
            />
            <div className="settings-option">
              <a href="https://console.mistral.ai/api-keys/" target="_blank" rel="noopener noreferrer">
                <button className="export-button">Get your API key here</button>
              </a>
            </div>
            <TextSettings
              label="OpenAI" // Label for the input
              value={openai} // State variable for the input
              setValue={setOpenai} // State updater function
              type="text" // Input type
              placeholder={localStorage.getItem('openai') || "Enter the API key"}
            />
            <div className="settings-option">
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
                <button className="export-button">Get your API key here</button>
              </a>
            </div>
            <TextSettings
              label="Anthropic" // Label for the input
              value={anthropic} // State variable for the input
              setValue={setAnthropic} // State updater function
              type="text" // Input type
              placeholder={localStorage.getItem('anthropic') || "Enter the API key"}
            />
            <div className="settings-option">
              <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer">
                <button className="export-button">Get your API key here</button>
              </a>
            </div>
            <TextSettings
              label="Google" // Label for the input
              value={google} // State variable for the input
              setValue={setGoogle} // State updater function
              type="text" // Input type
              placeholder={localStorage.getItem('google') || "Enter the API key"}
            />
            <div className="settings-option">
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
                <button className="export-button">Get your API key here</button>
              </a>
            </div>
          </div>
        );
      //#region import export
      case 'im/export':
        return (
          <div className="settings-section">
            <h2>Import & Export</h2>
            <div className="settings-option">
              <h3>Export the settings</h3>
              <button onClick={handleExport} className="export-button">
                Export Settings
              </button>
            </div>
            <div className="settings-option">
              <h3>Import the settings</h3>
              <input
                type="file"
                onChange={handleImport}
                accept=".json"
                className="import-file"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        importSettings(fileContent); // Call the importSettings function with the file content
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    const settingsData = exportSettings();
    // Create a blob and download the exported settings
    const blob = new Blob([settingsData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  //#region overall export
  return (
    <div className="popup-overlay">
      <div className="settings-content">
        <div className="settings-container">
          {/* Sidebar for desktop */}
          <div className="sidebar">
            <ul>
              <li onClick={() => setActiveSection('general')}>General</li>
              <li onClick={() => setActiveSection('privacy')}>Privacy</li>
              <li onClick={() => setActiveSection('theme')}>Theme</li>
              <li onClick={() => setActiveSection('foss')}>FOSS</li>
              <li onClick={() => setActiveSection('account')}>Account</li>
              <li onClick={() => setActiveSection('api')}>API Keys</li>
              <li onClick={() => setActiveSection('im/export')}>Import/Export</li>
            </ul>
          </div>

          <div className="settings-main">
            {/* Dropdown for selections in responsive mode */}
            <div className="settings-option dropdown">
              <div className="dropdown-header"><h2>Select a Setting</h2></div>
              <select onChange={(e) => setActiveSection(e.target.value)} value={activeSection}>
                <option value="general">General</option>
                <option value="privacy">Privacy</option>
                <option value="theme">Theme</option>
                <option value="foss">FOSS</option>
                <option value="account">Account</option>
                <option value="api">API Keys</option>
                <option value="im/export">Import/Export</option>
              </select>
            </div>
            <h2>Settings for {accountName}</h2>
            {renderSettingsContent()}
            <button className="close-popup" onClick={closeSettings}>Close</button>
            <button className="apply" onClick={async () => {
              getAllLocalStorageItems();
              closeSettings();
              sendToDatabase();
            }}>
              Apply
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};


export default Settings;