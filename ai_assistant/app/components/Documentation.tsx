import React from 'react';

// Documentation Component
const Documentation: React.FC = () => {
  return (
    <section id="documentation" className="documentation-section">
      <div className='docDiv'>
        <h1 className="title">Our Documentation</h1>

        <p className="paragraph">
          Here you will find our documentation file that was made using Google Docs.
        </p>
        <a
          href="/pdf/documentation.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
          aria-label="Open Documentation PDF"
        >
          Documentation
        </a>

        <h2 className="subtitle">Our Task</h2>
        <p className="paragraph">
          If you want to see what our task for that 4-week long project was, click on the link below.
        </p>
        <a
          href="/pdf/AI Virtual Assistant - Internship Students 2024.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
          aria-label="View Task Document"
        >
          Task
        </a>

        <h2 className="subtitle">Our Code</h2>
        <p className="paragraph">
          If you are interested in our source code, you can click on the links below to either download the source code directly or view it online on our Forgejo.
        </p>
        <a
          href="https://interstellardevelopment.org/code/React-Group/interstellar_ai"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
          aria-label="View Source Code Repository"
        >
          View Repository
        </a>
        <a
          href="https://interstellardevelopment.org/code/React-Group/interstellar_ai/archive/main.tar.gz"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
          aria-label="Download Source Code"
        >
          Download Source Code
        </a>

        <h2 className="subtitle">Our License</h2>
        <p className="paragraph">
          Our project is under the AGPL-3.0 or later. To find the currently used version of the license, click on the link below.
        </p>
        <a
          href="/license.html"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
          aria-label="View License"
        >
          License
        </a>
      </div>
    </section>
  );
};

export default Documentation;
