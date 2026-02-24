"use client";
import React, { useState, useEffect } from 'react';

// Define all models that should be available.
//#region modelist
const modelList = {
  'Offline Fast': {
    model_type: 'local',
    Math: 'qwen2-math:1.5b',
    Code: 'starcoder2',
    Language: 'llama3.2',
    Weather: 'llama3.2',
  },
  'Offline Slow': {
    model_type: 'local',
    Math: 'wizard-math',
    Code: 'starcoder2:7b',
    Language: 'llama3.1',
    Weather: 'llama3.1',
  },
  'Offline Fast (FOSS)': {
    model_type: 'local',
    Math: 'qwen2-math:1.5b',
    Code: 'qwen2.5-coder:1.5b',
    Language: 'phi3.5',
    Weather: 'phi3.5',
  },
  'Offline Slow (FOSS)': {
    model_type: 'local',
    Math: 'mathstral',
    Code: 'qwen2.5-coder',
    Language: 'qwen2.5',
    Weather: 'qwen2.5',
  },
  'Online Cheap (OpenAI)': {
    model_type: 'openai',
    Math: 'gpt-4o-mini',
    Code: 'gpt-4o-mini',
    Language: 'gpt-4o-mini',
    Weather: 'gpt-4o-mini',
  },
  'Online Expensive (OpenAI)': {
    model_type: 'openai',
    Math: 'gpt-4o',
    Code: 'gpt-4o',
    Language: 'gpt-4o',
    Weather: 'gpt-4o',
  },
  'Online Cheap (Anthropic)': {
    model_type: 'anthropic',
    Math: 'claude-3-haiku',
    Code: 'claude-3-haiku',
    Language: 'claude-3-haiku',
    Weather: 'claude-3-haiku',
  },
  'Online Expensive (Anthropic)': {
    model_type: 'anthropic',
    Math: 'claude-3-5-sonnet',
    Code: 'claude-3-5-sonnet',
    Language: 'claude-3-5-sonnet',
    Weather: 'claude-3-5-sonnet',
  },
  'Online Cheap (Google)': {
    model_type: 'google',
    Math: 'gemini-1.5-flash-latest',
    Code: 'gemini-1.5-flash-latest',
    Language: 'gemini-1.5-flash-latest',
    Weather: 'gemini-1.5-flash-latest',
  },
  'Online Expensive (Google)': {
    model_type: 'google',
    Math: 'gemini-1.5-pro-latest',
    Code: 'gemini-1.5-pro-latest',
    Language: 'gemini-1.5-pro-latest',
    Weather: 'gemini-1.5-pro-latest',
  },
  'Online (La Plateforme)': {
    model_type: 'mistral',
    Math: 'open-mistral-nemo',
    Code: 'codestral-latest',
    Language: 'mistral-small-latest',
    Weather: 'mistral-small-latest',
  },
  'Online (FOSS) (La Plateforme)': {
    model_type: 'mistral',
    Math: 'open-mistral-nemo',
    Code: 'open-codestral-mamba',
    Language: 'open-mistral-nemo',
    Weather: 'open-mistral-nemo',
  }
}


// Define the available selectedAIFunction options
const modelDropdown = {
  offlineNonFoss: ['Offline Fast', 'Offline Slow'],
  offlineFoss: ['Offline Fast (FOSS)', 'Offline Slow (FOSS)'],
  onlineNonFoss: [
    'Online Cheap (OpenAI)',
    'Online Expensive (OpenAI)',
    'Online Cheap (Anthropic)',
    'Online Expensive (Anthropic)',
    'Online Cheap (Google)',
    'Online Expensive (Google)',
    'Online (La Plateforme)'
  ],
  onlineFoss: ['Online (FOSS) (La Plateforme)'],
};

const selectedAIFunction = [
  'Code',
  'Math',
  'Language',
  'Weather'
]
//#region variables
const ModelSection: React.FC = () => {
  // Initialize state with value from localStorage or default to ''
  const [selectedModelDropdown, setSelectedModelDropdown] = useState('');
  const [radioSelection, setRadioSelection] = useState<string | null>("")
  const [activeSelectedAIFunction, setActiveSelectedAIFunction] = useState('');
  const [currentSelectedAIFunction, setCurrentSelectedAIFunction] = useState<string | null>("");
  const [isOpenSourceMode, setIsOpenSourceMode] = useState<string|null>("false")
//#region functions
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const defaultValues = {
        selectedModelDropdown: 'Offline Fast',
        activeSelectedAIFunction: 'Code',
        model: 'starcoder2',
        radioSelection: 'None',
        type: 'local',
      };
  
      Object.entries(defaultValues).forEach(([key, value]) => {
        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, value);
        }
      });
  
      setIsOpenSourceMode(localStorage.getItem("openSourceMode"));
      setActiveSelectedAIFunction(localStorage.getItem("activeSelectedAIFunction") || '');
      setRadioSelection(localStorage.getItem("radioSelection") || '');
      setSelectedModelDropdown(localStorage.getItem('selectedModelDropdown') || '');
  
      const handleStorageChange = () => {
        setSelectedModelDropdown(localStorage.getItem('selectedModelDropdown') || '');
      };
  
      // Update immediately when localStorage changes
      window.addEventListener('storage', handleStorageChange);
      
      // Cleanup listener on component unmount
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);
  

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const storedActiveSelectedAIFunction = localStorage.getItem("activeSelectedAIFunction") || "";
      if (storedActiveSelectedAIFunction !== currentSelectedAIFunction) {
        setCurrentSelectedAIFunction(storedActiveSelectedAIFunction);
      }
    }
  }, [activeSelectedAIFunction]);

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = event.target.value;
    setSelectedModelDropdown(newModel);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('selectedModelDropdown', newModel); // Update localStorage directly
      const model = localStorage.getItem('activeSelectedAIFunction') || "Code"
      modelClicked(model)
    }
  };
  //#region dropdown
  // Determine the filtered models based on current radioSelection
  const filteredModels = (() => {
    let models = [];
    switch (radioSelection) {
      case 'Offline':
        models = [
          ...modelDropdown.onlineNonFoss,
          ...modelDropdown.onlineFoss,
        ];
        if (isOpenSourceMode == "true") {
          models = [
            ...modelDropdown.onlineFoss,
          ];
        } // Show only offline models without FOSS
        break;
      case 'Online':
        models = [
          ...modelDropdown.offlineNonFoss,
          ...modelDropdown.offlineFoss,
        ];
        if (isOpenSourceMode == "true") {
          models = [
            ...modelDropdown.offlineFoss,
          ];
        } // Show only online models without FOSS
        break;
      case 'None':
        models = [
          ...modelDropdown.offlineNonFoss,
          ...modelDropdown.offlineFoss,
          ...modelDropdown.onlineNonFoss,
          ...modelDropdown.onlineFoss,
        ];
        if (isOpenSourceMode == "true") {
          models = [
            ...modelDropdown.offlineFoss,
            ...modelDropdown.onlineFoss,
          ];
        } // Show all models if nothing matches
        break;
      default:
        models = [
          ...modelDropdown.offlineNonFoss,
          ...modelDropdown.offlineFoss,
          ...modelDropdown.onlineNonFoss,
          ...modelDropdown.onlineFoss,
        ]; // Show all models if nothing matches
        break;
    }
    return Array.from(new Set(models)); // Remove duplicates using Set
  })();

  const isOfflineModel = (model: string) =>
    modelDropdown.offlineNonFoss.includes(model) || modelDropdown.offlineFoss.includes(model);

  const modelClicked = (model: string) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('activeSelectedAIFunction', model)
      setActiveSelectedAIFunction(model)
      const modelDropdown = localStorage.getItem('selectedModelDropdown') || 'Offline Fast'
      const selectedAIFunction = modelDropdown as keyof typeof modelList;
      localStorage.setItem("model", modelList[selectedAIFunction][model as keyof typeof modelList[typeof selectedAIFunction]])
      localStorage.setItem("type", modelList[selectedAIFunction]['model_type' as keyof typeof modelList[typeof selectedAIFunction]])
    }
  }
  //#region return "html"
  return (
    <div className="model-background">
      <div className="models">
        <div className="title">
          <h3>Different AI Models</h3>
        </div>

        {/* Model Selection Dropdown */}
        <div className="model-dropdown">
          <label htmlFor="model-select">Select AI Model:</label>
          <select id="model-select" value={selectedModelDropdown} onChange={handleModelChange}>
            {filteredModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
        {/* Model Grid with Cards */}
        <div className="grid">
          {selectedAIFunction.map(
            (displayedCategory) => (
              <button
                key={displayedCategory}
                className={`${displayedCategory.toLowerCase()}-model model-box ${currentSelectedAIFunction === displayedCategory ? 'selected' : ''}`}
                onClick={() => modelClicked(displayedCategory)}
              >
                <div className="overlay">
                  <h3>{displayedCategory}</h3>
                  {isOfflineModel(selectedModelDropdown) && <img src="/img/nowifi.svg" alt="No Wi-Fi" />}
                </div>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelSection;
