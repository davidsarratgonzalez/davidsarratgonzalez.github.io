import React from 'react';
import aboutData from '../data/about.json';
import resumeConfig from '../data/resume-config.json';
import OptimizedImage from './OptimizedImage';

function Header({ hideDownloadCV }) {
  const showDownloadLink = (resumeConfig.settings?.showDownloadCV ?? true) && !hideDownloadCV;

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
      className: 'website-link'
    },
    email: {
      icon: 'fas fa-envelope',
      url: `mailto:${aboutData.email}`,
      text: aboutData.email
    },
    download: {
      icon: 'fas fa-download',
      url: '/download',
      text: 'Download resume',
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  };

  return (
    <header className="header-container">
      <div className="header-left">
        {aboutData.profileImage && (
          <OptimizedImage
            type="profile"
            size="medium"
            className="profile-image"
            loading="eager"
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
            {Object.keys(socialLinks).map((key) => {
              if (key === 'download' && !showDownloadLink) {
                return null;
              }

              if (key === 'download' || (socialLinks[key] && aboutData[key])) {
                const link = socialLinks[key];
                return (
                  <a
                    key={key}
                    href={link.url}
                    target={link.target || '_blank'}
                    rel={link.rel || 'noopener noreferrer'}
                    className={link.className || ''}
                  >
                    <i className={link.icon}></i>
                    <span className="link-text">{link.text}</span>
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