//#region IOMARKET
export const applyIOMarketTheme = () => {
  document.documentElement.style.setProperty('--header-background-color', '#7e7e7e');
  document.documentElement.style.setProperty('--header-text-color', '#ffffff');
  document.documentElement.style.setProperty('--background-color', '#8B9635');
  document.documentElement.style.setProperty('--text-color', '#474D22');
  document.documentElement.style.setProperty('--input-background-color', '#ffffff');
  document.documentElement.style.setProperty('--input-button-color', '#8B9635');
  document.documentElement.style.setProperty('--input-button-hover-color', '#6b7c2b');
  document.documentElement.style.setProperty('--user-message-background-color', '#8B9635');
  document.documentElement.style.setProperty('--user-message-text-color', '#000');
  document.documentElement.style.setProperty('--ai-message-background-color', '#FCFCEB');
  document.documentElement.style.setProperty('--ai-message-text-color', '#000');
  document.documentElement.style.setProperty('--button-background-color', '#8B9635');
  document.documentElement.style.setProperty('--button-hover-background-color', '#6b7c2b');
  document.documentElement.style.setProperty('--models-background-color', '#ffffff');
  document.documentElement.style.setProperty('--history-background-color', '#f9f9f9');
  document.documentElement.style.setProperty('--left-panel-background-color', '#79832e');
  document.documentElement.style.setProperty('--conversation-background-color', '#79832e');
  document.documentElement.style.setProperty('--doc-background-color', '#ffffff');
  document.documentElement.style.setProperty('--close-button-color', 'red');
  document.documentElement.style.setProperty('--close-button-hover-color', '#9e0101');
  document.documentElement.style.setProperty('--apply-button-color', '#8B9635');
  document.documentElement.style.setProperty('--apply-button-hover-color', '#6b7c2b');
  document.documentElement.style.setProperty('--burger-menu-background-color', '#79832e');
  document.documentElement.style.setProperty('--overlay-text-color', 'white');
  document.documentElement.style.setProperty('--faq-background-color', '#474D22');
  document.documentElement.style.setProperty('--faq-heading-color', '#8B9635');
  document.documentElement.style.setProperty('--faq-item-background-color', '#fefefe');
  document.documentElement.style.setProperty('--faq-item-heading-color', '#474D22');
  document.documentElement.style.setProperty('--faq-item-text-color', '#333');
  document.documentElement.style.setProperty('--faq-item-hover-background-color', '#e0e0e0');
  document.documentElement.style.setProperty('--popup-background-color', '#8B9635');
  document.documentElement.style.setProperty('--pop-up-text', '#000');
  document.documentElement.style.setProperty('--input-border-color', '#8B9635');
  document.documentElement.style.setProperty('--font-family', "'Poppins', 'sans-serif'");
  document.documentElement.style.setProperty('--font-size', '16px'); 
};
//#region WHITE
export const applyWhiteTheme = () => {
  document.documentElement.style.setProperty('--header-background-color', '#f0f0f0'); // Lighter header background
  document.documentElement.style.setProperty('--header-text-color', '#333'); // Dark text for contrast
  document.documentElement.style.setProperty('--background-color', '#ffffff'); // White background
  document.documentElement.style.setProperty('--text-color', '#000'); // Dark text color
  document.documentElement.style.setProperty('--input-background-color', '#f9f9f9'); // Light input background
  document.documentElement.style.setProperty('--input-button-color', '#cccccc'); // Light button color
  document.documentElement.style.setProperty('--input-button-hover-color', '#b3b3b3'); // Slightly darker on hover
  document.documentElement.style.setProperty('--user-message-background-color', '#e0e0e0'); // Light grey for user messages
  document.documentElement.style.setProperty('--user-message-text-color', '#000'); // Dark text for contrast
  document.documentElement.style.setProperty('--ai-message-background-color', '#f7f7f7'); // Very light background for AI messages
  document.documentElement.style.setProperty('--ai-message-text-color', '#000'); // Dark text for readability
  document.documentElement.style.setProperty('--button-background-color', '#cccccc'); // Light button background
  document.documentElement.style.setProperty('--button-hover-background-color', '#b3b3b3'); // Darker on hover
  document.documentElement.style.setProperty('--models-background-color', '#ffffff'); // White background for models section
  document.documentElement.style.setProperty('--history-background-color', '#f9f9f9'); // Light background for history section
  document.documentElement.style.setProperty('--left-panel-background-color', '#e0e0e0'); // Light grey for the left panel
  document.documentElement.style.setProperty('--conversation-background-color', '#e0e0e0'); // Light grey conversation background
  document.documentElement.style.setProperty('--doc-background-color', '#ffffff'); // White document background
  document.documentElement.style.setProperty('--close-button-color', '#ff4d4d'); // Soft red close button
  document.documentElement.style.setProperty('--close-button-hover-color', '#ff1a1a'); // Brighter red on hover
  document.documentElement.style.setProperty('--apply-button-color', '#cccccc'); // Light button color for apply
  document.documentElement.style.setProperty('--apply-button-hover-color', '#b3b3b3'); // Darker hover color for apply button
  document.documentElement.style.setProperty('--burger-menu-background-color', '#e0e0e0'); // Light grey burger menu background
  document.documentElement.style.setProperty('--overlay-text-color', '#333'); // Dark overlay text
  document.documentElement.style.setProperty('--faq-background-color', '#f0f0f0'); // Light FAQ section background
  document.documentElement.style.setProperty('--faq-heading-color', '#333'); // Dark heading for contrast
  document.documentElement.style.setProperty('--faq-item-background-color', '#ffffff'); // White background for FAQ items
  document.documentElement.style.setProperty('--faq-item-heading-color', '#000'); // Dark headings for FAQ items
  document.documentElement.style.setProperty('--faq-item-text-color', '#666'); // Medium grey text color for readability
  document.documentElement.style.setProperty('--faq-item-hover-background-color', '#eaeaea'); // Slight hover effect for FAQ items
  document.documentElement.style.setProperty('--popup-background-color', '#ffffff'); // White popup background
  document.documentElement.style.setProperty('--pop-up-text', '#000'); // Dark text for pop-ups
  document.documentElement.style.setProperty('--input-border-color', '#cccccc'); // Light input border color
  document.documentElement.style.setProperty('--font-family', "'Poppins', 'sans-serif'"); // Same font family
  document.documentElement.style.setProperty('--font-size', '16px'); // Same font size
};
//#region BLACK
export const applyBlackTheme = () => {
  document.documentElement.style.setProperty('--header-background-color', '#1a1a1a'); // Dark header background
  document.documentElement.style.setProperty('--header-text-color', '#ffffff'); // White text for header
  document.documentElement.style.setProperty('--background-color', '#2c2c2c'); // Dark main background
  document.documentElement.style.setProperty('--text-color', '#f0f0f0'); // Light text color
  document.documentElement.style.setProperty('--input-background-color', '#3d3d3d'); // Dark input background
  document.documentElement.style.setProperty('--input-button-color', '#4caf50'); // Button color
  document.documentElement.style.setProperty('--input-button-hover-color', '#66bb6a'); // Button hover color
  document.documentElement.style.setProperty('--user-message-background-color', '#4caf50'); // User message background
  document.documentElement.style.setProperty('--user-message-text-color', '#ffffff'); // User message text color
  document.documentElement.style.setProperty('--ai-message-background-color', '#424242'); // AI message background
  document.documentElement.style.setProperty('--ai-message-text-color', '#ffffff'); // AI message text color
  document.documentElement.style.setProperty('--button-background-color', '#4caf50'); // Button background color
  document.documentElement.style.setProperty('--button-hover-background-color', '#66bb6a'); // Button hover color
  document.documentElement.style.setProperty('--models-background-color', '#3d3d3d'); // Dark background for models section
  document.documentElement.style.setProperty('--history-background-color', '#333333'); // Dark history background
  document.documentElement.style.setProperty('--left-panel-background-color', '#1a1a1a'); // Dark left panel background
  document.documentElement.style.setProperty('--conversation-background-color', '#1a1a1a'); // Dark conversation container
  document.documentElement.style.setProperty('--doc-background-color', '#000000'); // Dark document background  
  document.documentElement.style.setProperty('--close-button-color', '#f44336'); // Red close button color
  document.documentElement.style.setProperty('--close-button-hover-color', '#d32f2f'); // Darker red hover color
  document.documentElement.style.setProperty('--apply-button-color', '#4caf50'); // Apply button color
  document.documentElement.style.setProperty('--apply-button-hover-color', '#66bb6a'); // Apply button hover color
  document.documentElement.style.setProperty('--burger-menu-background-color', '#1a1a1a'); // Dark burger menu background
  document.documentElement.style.setProperty('--overlay-text-color', '#ffffff'); // White overlay text
  document.documentElement.style.setProperty('--faq-background-color', '#333333'); // Dark background for FAQ section
  document.documentElement.style.setProperty('--faq-heading-color', '#4caf50'); // FAQ heading color
  document.documentElement.style.setProperty('--faq-item-background-color', '#4c4c4c'); // Dark FAQ item background
  document.documentElement.style.setProperty('--faq-item-heading-color', '#ffffff'); // White FAQ item heading
  document.documentElement.style.setProperty('--faq-item-text-color', '#e0e0e0'); // Light text for FAQ items
  document.documentElement.style.setProperty('--faq-item-hover-background-color', '#555555'); // Hover background for FAQ items
  document.documentElement.style.setProperty('--popup-background-color', '#4caf50'); // Dark popup background
  document.documentElement.style.setProperty('--pop-up-text', '#ffffff'); // White pop-up text
  document.documentElement.style.setProperty('--input-border-color', '#4caf50'); // Input border color
  document.documentElement.style.setProperty('--font-family', "'Poppins', 'sans-serif'"); // Font family
  document.documentElement.style.setProperty('--font-size', '16px'); // Font size
  
};
//#region CUSTOM
export const applyCustomTheme = () => {
  if (typeof localStorage !== 'undefined') {
    const themeVariables = {
      backgroundColor: localStorage.getItem('backgroundColor'),
      headerBackground: localStorage.getItem('headerBackground'),
      headerTextColor: localStorage.getItem('headerTextColor'),
      textColor: localStorage.getItem('textColor'),
      inputBackgroundColor: localStorage.getItem('inputBackgroundColor'),
      inputButtonColor: localStorage.getItem('inputButtonColor'),
      inputButtonHoverColor: localStorage.getItem('inputButtonHoverColor'),
      userMessageBackgroundColor: localStorage.getItem('userMessageBackgroundColor'),
      userMessageTextColor: localStorage.getItem('userMessageTextColor'),
      aiMessageBackgroundColor: localStorage.getItem('aiMessageBackgroundColor'),
      aiMessageTextColor: localStorage.getItem('aiMessageTextColor'),
      buttonBackgroundColor: localStorage.getItem('buttonBackgroundColor'),
      buttonHoverBackgroundColor: localStorage.getItem('buttonHoverBackgroundColor'),
      modelsBackgroundColor: localStorage.getItem('modelsBackgroundColor'),
      historyBackgroundColor: localStorage.getItem('historyBackgroundColor'),
      leftPanelBackgroundColor: localStorage.getItem('leftPanelBackgroundColor'),
      conversationBackgroundColor: localStorage.getItem('conversationBackgroundColor'),
      docBackgroundColor: localStorage.getItem('docBackgroundColor'),
      closeButtonColor: localStorage.getItem('closeButtonColor'),
      closeButtonHoverColor: localStorage.getItem('closeButtonHoverColor'),
      applyButtonColor: localStorage.getItem('applyButtonColor'),
      applyButtonHoverColor: localStorage.getItem('applyButtonHoverColor'),
      burgerMenu: localStorage.getItem('burgerMenu'),
      overlayTextColor: localStorage.getItem('overlayTextColor'),
      faqBackgroundColor: localStorage.getItem('faqBackgroundColor'),
      faqHeadingColor: localStorage.getItem('faqHeadingColor'),
      faqItemBackgroundColor: localStorage.getItem('faqItemBackgroundColor'),
      faqItemHeadingColor: localStorage.getItem('faqItemHeadingColor'),
      faqItemTextColor: localStorage.getItem('faqItemTextColor'),
      faqItemHoverBackgroundColor: localStorage.getItem('faqItemHoverBackgroundColor'),
      popupBackgroundColor: localStorage.getItem('popupBackgroundColor'),
      popUpText: localStorage.getItem('popUpText'),
      inputBorderColor: localStorage.getItem('inputBorderColor'),
      fontFamily: localStorage.getItem('fontFamily'),
      fontSize: localStorage.getItem('fontSize'),
    };
    
    document.documentElement.style.setProperty('--header-background-color', themeVariables.headerBackground || '#7e7e7e');
    document.documentElement.style.setProperty('--header-text-color', themeVariables.headerTextColor || '#ffffff');
    document.documentElement.style.setProperty('--background-color', themeVariables.backgroundColor || '#121212');
    document.documentElement.style.setProperty('--text-color', themeVariables.textColor || '#e0e0e0');
    document.documentElement.style.setProperty('--input-background-color', themeVariables.inputBackgroundColor || '#1e1e1e');
    document.documentElement.style.setProperty('--input-button-color', themeVariables.inputButtonColor || '#3c3c3c');
    document.documentElement.style.setProperty('--input-button-hover-color', themeVariables.inputButtonHoverColor || '#5a5a5a');
    document.documentElement.style.setProperty('--user-message-background-color', themeVariables.userMessageBackgroundColor || '#000000');
    document.documentElement.style.setProperty('--user-message-text-color', themeVariables.userMessageTextColor || '#ffffff');
    document.documentElement.style.setProperty('--ai-message-background-color', themeVariables.aiMessageBackgroundColor || '#202020');
    document.documentElement.style.setProperty('--ai-message-text-color', themeVariables.aiMessageTextColor || '#ffffff');
    document.documentElement.style.setProperty('--button-background-color', themeVariables.buttonBackgroundColor || '#3c3c3c');
    document.documentElement.style.setProperty('--button-hover-background-color', themeVariables.buttonHoverBackgroundColor || '#5a5a5a');
    document.documentElement.style.setProperty('--models-background-color', themeVariables.modelsBackgroundColor || '#1e1e1e');
    document.documentElement.style.setProperty('--history-background-color', themeVariables.historyBackgroundColor || '#1a1a1a');
    document.documentElement.style.setProperty('--left-panel-background-color', themeVariables.leftPanelBackgroundColor || '#1e1e1e');
    document.documentElement.style.setProperty('--conversation-background-color', themeVariables.conversationBackgroundColor || '#2c2c2c');
    document.documentElement.style.setProperty('--doc-background-color', themeVariables.docBackgroundColor || '#000000');
    document.documentElement.style.setProperty('--close-button-color', themeVariables.closeButtonColor || '#f44336');
    document.documentElement.style.setProperty('--close-button-hover-color', themeVariables.closeButtonHoverColor || '#d32f2f');
    document.documentElement.style.setProperty('--apply-button-color', themeVariables.applyButtonColor || '#4caf50');
    document.documentElement.style.setProperty('--apply-button-hover-color', themeVariables.applyButtonHoverColor || '#66bb6a');
    document.documentElement.style.setProperty('--burger-menu-background-color', themeVariables.burgerMenu || '#79832e');
    document.documentElement.style.setProperty('--overlay-text-color', themeVariables.overlayTextColor || '#ffffff');
    document.documentElement.style.setProperty('--faq-background-color', themeVariables.faqBackgroundColor || '#333333');
    document.documentElement.style.setProperty('--faq-heading-color', themeVariables.faqHeadingColor || '#4caf50');
    document.documentElement.style.setProperty('--faq-item-background-color', themeVariables.faqItemBackgroundColor || '#4c4c4c');
    document.documentElement.style.setProperty('--faq-item-heading-color', themeVariables.faqItemHeadingColor || '#ffffff');
    document.documentElement.style.setProperty('--faq-item-text-color', themeVariables.faqItemTextColor || '#e0e0e0');
    document.documentElement.style.setProperty('--faq-item-hover-background-color', themeVariables.faqItemHoverBackgroundColor || '#555555');
    document.documentElement.style.setProperty('--popup-background-color', themeVariables.popupBackgroundColor || '#4caf50');
    document.documentElement.style.setProperty('--pop-up-text', themeVariables.popUpText || '#ffffff');
    document.documentElement.style.setProperty('--input-border-color', themeVariables.inputBorderColor || '#3c3c3c');
    document.documentElement.style.setProperty('--font-family', themeVariables.fontFamily || "'Poppins', 'sans-serif'");
    document.documentElement.style.setProperty('--font-size', themeVariables.fontSize || '16px');
  };
}

//#region BASIC-CUSTOM

// TypeScript types for color parameters
type Color = string;

export const applyBasicCustomTheme = (
  primaryColor: Color,
  secondaryColor: Color,
  accentColor: Color,
  backgroundColor: Color,
  textColor: Color
) => {
  // Calculate additional colors based on the provided colors
  const headerBackgroundColor = secondaryColor; // Use secondary color for header background
  const headerTextColor = lightenColor(textColor, 50); // Lighten text color for header
  const inputButtonColor = primaryColor; // Use primary color for input buttons
  const userMessageBackgroundColor = accentColor; // Use accent color for user messages
  const aiMessageBackgroundColor = backgroundColor; // Use background color for AI messages
  const buttonHoverBackgroundColor = darkenColor(primaryColor, 30); // Darken primary color for hover
  const closeButtonColor = darkenColor(accentColor, 20); // Darkened accent color for close button
  const closeButtonHoverColor = darkenColor(closeButtonColor, 10); // Darker close button hover color
  const darkerAccentColor = darkenColor(accentColor, 20); // Darken accent color for contrast
  const lightenedPrimaryColor = lightenColor(primaryColor, 10); // Lighten primary color for highlights
  const lighterBackgroundColor = lightenColor(backgroundColor, 10); // Lighten background for contrast
  const darkerBackgroundColor = darkenColor(backgroundColor, 20); // More pronounced dark background

   // Set all CSS variables
  document.documentElement.style.setProperty('--header-background-color', headerBackgroundColor);
  document.documentElement.style.setProperty('--header-text-color', headerTextColor);
  document.documentElement.style.setProperty('--background-color', backgroundColor);
  document.documentElement.style.setProperty('--text-color', textColor);
  document.documentElement.style.setProperty('--input-background-color', lightenColor(backgroundColor, 10));
  document.documentElement.style.setProperty('--input-button-color', inputButtonColor);
  document.documentElement.style.setProperty('--input-button-hover-color', buttonHoverBackgroundColor);
  document.documentElement.style.setProperty('--user-message-background-color', userMessageBackgroundColor);
  document.documentElement.style.setProperty('--user-message-text-color', lightenColor(textColor, 60));
  document.documentElement.style.setProperty('--ai-message-background-color', aiMessageBackgroundColor);
  document.documentElement.style.setProperty('--ai-message-text-color', lightenColor(textColor, 60));
  document.documentElement.style.setProperty('--button-background-color', inputButtonColor);
  document.documentElement.style.setProperty('--button-hover-background-color', buttonHoverBackgroundColor);
  document.documentElement.style.setProperty('--models-background-color', darkerBackgroundColor);
  document.documentElement.style.setProperty('--history-background-color', lighterBackgroundColor);
  document.documentElement.style.setProperty('--left-panel-background-color', lightenColor(backgroundColor, 5));
  document.documentElement.style.setProperty('--conversation-background-color', lightenColor(backgroundColor, 5));
  document.documentElement.style.setProperty('--doc-background-color', lighterBackgroundColor);
  document.documentElement.style.setProperty('--close-button-color', closeButtonColor);
  document.documentElement.style.setProperty('--close-button-hover-color', closeButtonHoverColor);
  document.documentElement.style.setProperty('--apply-button-color', inputButtonColor);
  document.documentElement.style.setProperty('--apply-button-hover-color', buttonHoverBackgroundColor);
  document.documentElement.style.setProperty('--burger-menu-background-color', lightenColor(backgroundColor, 5));
  document.documentElement.style.setProperty('--overlay-text-color', lightenColor(textColor, 80));
  document.documentElement.style.setProperty('--faq-background-color', lightenColor(backgroundColor, 10));
  document.documentElement.style.setProperty('--faq-heading-color', lightenedPrimaryColor);
  document.documentElement.style.setProperty('--faq-item-background-color', darkerAccentColor);
  document.documentElement.style.setProperty('--faq-item-heading-color', '#000000');
  document.documentElement.style.setProperty('--faq-item-text-color', '#000000');
  document.documentElement.style.setProperty('--faq-item-hover-background-color', lightenColor(accentColor, 10));
  document.documentElement.style.setProperty('--popup-background-color', accentColor);
  document.documentElement.style.setProperty('--pop-up-text', lightenColor(textColor, 80));
  document.documentElement.style.setProperty('--input-border-color', primaryColor);
  if (typeof localStorage !== 'undefined') {
    document.documentElement.style.setProperty('--font-family', localStorage.getItem("fontFamily") || "'Poppins', 'sans-serif'");
    document.documentElement.style.setProperty('--font-size', localStorage.getItem("fontSize") || '16px');
  }
};

// Helper function to darken a color (returns a darker version of the provided color)
const darkenColor = (color: Color, percent: number): Color => {
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);
  r = Math.floor(r * (1 - percent / 100));
  g = Math.floor(g * (1 - percent / 100));
  b = Math.floor(b * (1 - percent / 100));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

// Helper function to lighten a color (returns a lighter version of the provided color)
const lightenColor = (color: Color, percent: number): Color => {
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);
  r = Math.min(255, Math.floor(r * (1 + percent / 100)));
  g = Math.min(255, Math.floor(g * (1 + percent / 100)));
  b = Math.min(255, Math.floor(b * (1 + percent / 100)));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

//#region APPLY-THEME
// This is the new function that calls the appropriate theme application
export const applyTheme = (theme: string, primary: string, secondary: string, accent: string, background: string, text: string) => {
  switch (theme) {
    case 'IOMARKET':
      applyIOMarketTheme();
      break;
    case 'WHITE':
      applyWhiteTheme();
      break;
    case 'BLACK':
      applyBlackTheme();
      break;
    case 'CUSTOM':
      applyCustomTheme();
      break;
    case 'BASIC-CUSTOM':
      applyBasicCustomTheme(
          primary,
          secondary,
          accent,
          background,
          text
        );
      break;
    default:
      applyIOMarketTheme();
      break;
  }
};
