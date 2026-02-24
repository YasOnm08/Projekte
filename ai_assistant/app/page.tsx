"use client";
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import AI from './components/AI';
import FAQ from './components/Faq'; // Ensure the import path is correct
import Documentation from './components/Documentation'; // Ensure the import path is correct
import History from './components/History';
import Models from './components/Models';
import Credits from './components/Credits';
import { 
  applyIOMarketTheme, 
  applyWhiteTheme, 
  applyBlackTheme, 
  applyCustomTheme, 
  applyBasicCustomTheme 
} from './components/settings/theme';
import './styles/master.css';

const LandingPage: React.FC = () => {
  // State to control visibility of the left panels
  const [showDivs, setShowDivs] = useState(true);
  // State to track which view is currently displayed
  const [view, setView] = useState<'AI' | 'FAQ' | 'Documentation' | 'Credits'>('AI');
  const conversationRef = useRef<HTMLDivElement>(null);

  // State for theme colors
  const [primaryColor, setPrimaryColor] = useState("#fefefe");
  const [secondaryColor, setSecondaryColor] = useState("#fefefe");
  const [accentColor, setAccentColor] = useState("#fefefe");
  const [basicBackgroundColor, setBasicBackgroundColor] = useState("#fefefe");
  const [basicTextColor, setBasicTextColor] = useState("#fefefe");

  // Synchronize theme colors with local storage on component mount
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      setPrimaryColor(localStorage.getItem("primaryColor") || "#fefefe");
      setSecondaryColor(localStorage.getItem("secondaryColor") || "#fefefe");
      setAccentColor(localStorage.getItem("accentColor") || "#fefefe");
      setBasicBackgroundColor(localStorage.getItem("basicBackgroundColor") || "#fefefe");
      setBasicTextColor(localStorage.getItem("basicTextColor") || "#fefefe");
    }
  }, [primaryColor, secondaryColor, accentColor, basicBackgroundColor, basicTextColor]);

  // Toggle visibility of the left panels
  const toggleDivs = () => {
    setShowDivs(prevState => !prevState);
  };

  // Change the current view based on user selection
  const handleViewChange = (view: 'AI' | 'FAQ' | 'Documentation' | 'Credits') => {
    setView(view);
    // Hide left panels if the selected view is not 'AI'
    if (view !== 'AI') {
      setShowDivs(false);
    }
  };

  // Apply the selected theme and color settings based on local storage
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('selectedTheme');
      if (savedTheme) {
        switch (savedTheme) {
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
              primaryColor,
              secondaryColor,
              accentColor,
              basicBackgroundColor,
              basicTextColor
            );
            break;
          default:
            applyIOMarketTheme(); // Fallback theme
            break;
        }
      }
    }
  }, [primaryColor, secondaryColor, accentColor, basicBackgroundColor, basicTextColor]); // Apply themes whenever color states change

  return (
    <div>
      {/* Header component with props for toggling and view change */}
      <Header
        toggleDivs={toggleDivs}
        showDivs={showDivs}
        onViewChange={handleViewChange}
        showHistoryModelsToggle={true}
        showToggle={view === 'AI'}
      />
      <div className="container">
        <div className={`left-panel ${showDivs ? 'visible' : 'hidden'}`}>
          {showDivs && (
            <div className="history-models">
              {/* Show History and Models components if left panels are visible */}
              <History />
              <Models />
            </div>
          )}
        </div>
        <div className={`conversation-container ${showDivs ? 'collapsed' : 'expanded'}`} ref={conversationRef}>
          {/* Render the selected view based on the current state */}
          {view === 'AI' && <AI />}
          {view === 'FAQ' && <FAQ />}
          {view === 'Documentation' && <Documentation />}
          {view === 'Credits' && <Credits />}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
