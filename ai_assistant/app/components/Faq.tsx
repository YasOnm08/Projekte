import React from 'react';

// FAQ Component
const FAQ: React.FC = () => {
  return (
    <section id="faq"> {/* Main section for FAQs */}
      <h2>Frequently Asked Questions</h2> {/* Title for the FAQ section */}
      
      <div className="faq-item">
        <h3>Why doesn&apos;t my selection in the category dropdown menu apply?</h3>
        <p>Currently, the dropdown menu for selecting AI models does not retain your choice after a website refresh.</p>
      </div>
      
      <div className="faq-item">
        <h3>Why is the AI suddenly talking about the weather when I didn&apos;t select that option?</h3>
        <p>The AI is programmed to provide weather information even if you haven&apos;t specifically selected the weather option.</p>
      </div>
      
      <div className="faq-item">
        <h3>Why isn&apos;t the online API working?</h3>
        <p>At the moment, the online APIs for Google and La Plateforme are not operational. However, the OpenAI and Anthropic APIs may still function.</p>
      </div>
      
      <div className="faq-item">
        <h3>Why is the AI discussing unrelated topics?</h3>
        <p>Try disabling the AI system prompt settings, as the AI sometimes tends to focus on those topics excessively.</p>
      </div>
      
      <div className="faq-item">
        <h3>Why isn&apos;t the AI responding in the format I specified in the settings?</h3>
        <p>Please check if the system prompt settings are enabled. If the issue persists, it may be because the AI is unable to fully adhere to the command.</p>
      </div>
      
      <div className="faq-item">
        <h3>Does this AI have the ability to know my location or search the web?</h3>
        <p>No, this AI does not possess any capabilities to access your location or browse the web.</p>
      </div>
      
      <div className="faq-item">
        <h3>Does the AI really work offline?</h3>
        <p>Yes! Once you download the necessary models, it can operate fully offline, with the exception of the weather API.</p>
      </div>
      
      <div className="faq-item">
        <h3>Are my messages encrypted?</h3>
        <p>Unfortunately, not at this time. We recommend keeping your messages as anonymous as possible.</p>
      </div>
      
      <div className="faq-item">
        <h3>Where is my data saved?</h3>
        <p>All data, including accounts, settings, and chats, is stored locally on your computer.</p>
      </div>
      
      <div className="faq-item">
        <h3>Is this a virus?</h3>
        <p>No, this is not a virus. The warning appears because the application is not officially signed.</p>
      </div>
    </section>
  );
};

export default FAQ; // Exporting the FAQ component
