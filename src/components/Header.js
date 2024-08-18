import React from 'react';
import aboutData from '../data/about.json';

function Header() {
  const socialLinks = {
    linkedin: {
      icon: 'fab fa-linkedin',
      url: `https://www.linkedin.com/in/${aboutData.linkedin}`,
      text: `/in/${aboutData.linkedin}`
    },
    github: {
      icon: 'fab fa-github',
      url: `https://github.com/${aboutData.github}`,
      text: `/${aboutData.github}`
    },
    orcid: {
      icon: 'fab fa-orcid',
      url: `https://orcid.org/${aboutData.orcid}`,
      text: aboutData.orcid
    },
    website: {
      icon: 'fas fa-globe',
      url: `https://${aboutData.website.replace(/^https?:\/\//, '')}`,
      text: aboutData.website.replace(/^https?:\/\//, ''),
      className: 'website-link' // Added a specific class
    },
    email: {
      icon: 'fas fa-envelope',
      url: `mailto:${aboutData.email}`,
      text: aboutData.email
    }
  };

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
            {Object.keys(aboutData).map((key) => {
              if (socialLinks[key] && aboutData[key]) {
                return (
                  <a
                    key={key}
                    href={socialLinks[key].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialLinks[key].className || ''}
                  >
                    <i className={socialLinks[key].icon}></i>
                    <span className="link-text">{socialLinks[key].text}</span>
                  </a>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;