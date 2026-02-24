// AI.tsx
import React from 'react';
import InputOutputBackend from '../backend/InputOutputHandler';

const AI: React.FC = () => {
  return (
      <div className="ai-container">
        {/* Render the InputOutputBackend component for AI input/output handling */}
        <InputOutputBackend />
      </div>
  );
};

export default AI;
