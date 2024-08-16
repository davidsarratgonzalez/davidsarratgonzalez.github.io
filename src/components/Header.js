import React from 'react';
import aboutData from '../data/about.json';

function Header() {
  return (
    <header className="header-container">
      <div className="header-left">
        {aboutData.profileImage && (
          <img
            src={`/images/${aboutData.profileImage}`}
            alt={`${aboutData.name}'s profile`}
            className="profile-image"
          />
        )}
      </div>
      <div className="header-center">
        <h1>{aboutData.name}</h1>
        <hr className="header-divider" />
        <p className="header-subtitle">{aboutData.title}</p>
      </div>
      <div className="header-right">
        <div className="social-links-container">
          <div className="social-links">
            <a href="https://www.linkedin.com/in/davidsarratgonzalez" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i> /in/davidsarratgonzalez
            </a>
            <a href="https://github.com/davidsarratgonzalez" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i> /davidsarratgonzalez
            </a>
            <a href="https://orcid.org/0000-0002-9064-3303" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-orcid"></i> 0000-0002-9064-3303
            </a>
            <a href="https://davidsarratgonzalez.github.io" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe"></i> davidsarratgonzalez.github.io
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;