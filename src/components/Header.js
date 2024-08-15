import React from 'react';
import aboutData from '../data/about.json';

function Header() {
  return (
    <header>
      {aboutData.profileImage && (
        <img
          src={`/images/${aboutData.profileImage}`}
          alt={`${aboutData.name}'s profile`}
          className="profile-image"
        />
      )}
      <h1>{aboutData.name}</h1>
      <p>{aboutData.title}</p>
      <div className="social-icons">
        <a href="https://www.linkedin.com/in/davidsarratgonzalez" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://github.com/davidsarratgonzalez" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://orcid.org/0000-0002-9064-3303" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-orcid"></i>
        </a>
      </div>
    </header>
  );
}

export default Header;