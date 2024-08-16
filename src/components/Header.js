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
            {aboutData.linkedin && (
              <a href={`https://www.linkedin.com/in/${aboutData.linkedin}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i> <span>/in/{aboutData.linkedin}</span>
              </a>
            )}
            {aboutData.github && (
              <a href={`https://github.com/${aboutData.github}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i> <span>/{aboutData.github}</span>
              </a>
            )}
            {aboutData.orcid && (
              <a href={`https://orcid.org/${aboutData.orcid}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-orcid"></i> <span>{aboutData.orcid}</span>
              </a>
            )}
            {aboutData.website && (
              <a href={aboutData.website} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe"></i> <span>{aboutData.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {aboutData.email && (
              <a href={`mailto:${aboutData.email}`} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-envelope"></i> <span>{aboutData.email}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;