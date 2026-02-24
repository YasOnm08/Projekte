import React from 'react';

// Main Credits Component
const Credits: React.FC = () => (
  <div className="credits-container">
    <section id="credits" className="credits-section">
      <h1 className="title">Credits</h1>

      <h2 className="subtitle">Icons</h2>
      <p className="paragraph">This project utilizes the following icon resources:</p>
      <CreditLink href="https://fontawesome.com/v4/license/" label="FontAwesome" />

      <h2 className="subtitle">Fonts</h2>
      <p className="paragraph">The fonts used in this project are provided by:</p>
      <CreditLink href="https://github.com/itfoundry/Poppins" label="Poppins" />
      <CreditLink 
        href="https://openfontlicense.org" 
        label="Inconsolata, Merriweather, Noto Sans, Noto Serif, Playfair Display, Bangers, Caveat, Frederika the Great, Sofadi One, Zilla Slab Highlight" 
      />
      <CreditLink 
        href="http://www.apache.org/licenses/LICENSE-2.0" 
        label="Roboto, Rock Salt" 
      />
      <CreditLink href="https://ubuntu.com/legal/font-licence" label="Ubuntu" />
    </section>
  </div>
);

// CreditLink Component for rendering individual credit links
const CreditLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a 
    href={href} 
    className="credit-btn" 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={`Visit ${label} license page`} // Improve accessibility
  >
    {label}
  </a>
);

export default Credits;

// also thank you Leart and Tristan without you two we would not have come this far
// and a special thanks and why are you so annoying to Eslint