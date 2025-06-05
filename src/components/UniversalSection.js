import React from 'react';
import sectionTypes from '../data/section-types.json';

function UniversalSection({ sectionConfig, data }) {
  const { title, itemType, hasLeftAlignedEntries, showTitle, type } = sectionConfig;
  const itemTypeConfig = sectionTypes.itemTypes[itemType];

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return null;
  }

  // Handle single item sections (like About)
  if (type === 'single') {
    if (itemType === 'personal') {
      // Special handling for personal/about section
      if (!data.description) {
        return null;
      }
      return (
        <section id="about">
          {showTitle && <h2>{title}</h2>}
          <div className="entry">
            <div className="entry-content">
              <p className="entry-description">{data.description}</p>
            </div>
          </div>
        </section>
      );
    }
    return null;
  }

  // Handle list sections
  if (!Array.isArray(data)) {
    return null;
  }

  const renderDate = (item) => {
    const { dateFormat } = itemTypeConfig;
    if (!dateFormat) return null;

    if (dateFormat === 'startDate - endDate') {
      return `${item.startDate} - ${item.endDate || 'Present'}`;
    }
    if (dateFormat === 'month year') {
      return `${item.month} ${item.year}`;
    }
    if (dateFormat === 'date') {
      return item.date;
    }
    if (dateFormat === 'year') {
      return item.year;
    }
    return null;
  };

  const renderTitle = (item) => {
    const titleField = Object.entries(itemTypeConfig.fields).find(
      ([key, config]) => config.display === 'title'
    );
    return titleField ? item[titleField[0]] : '';
  };

  const renderSubtitle = (item) => {
    const subtitleFields = Object.entries(itemTypeConfig.fields).filter(
      ([key, config]) => config.display.includes('subtitle')
    );

    let prefix = '';
    let main = '';
    let suffix = '';
    let secondary = '';

    subtitleFields.forEach(([key, config]) => {
      if (item[key]) {
        if (config.display === 'subtitle-prefix') {
          prefix = item[key];
        } else if (config.display === 'subtitle') {
          main = item[key];
        } else if (config.display === 'subtitle-suffix') {
          suffix = item[key];
        } else if (config.display === 'subtitle-secondary') {
          secondary = item[key];
        }
      }
    });

    let subtitle = '';
    if (prefix && main) {
      subtitle = `${prefix} in ${main}`;
    } else if (main) {
      subtitle = main;
    }
    
    if (suffix) {
      subtitle += `, ${suffix}`;
    }
    
    if (secondary) {
      subtitle += ` - ${secondary}`;
    }

    return subtitle;
  };

  const renderDescription = (item) => {
    const descField = Object.entries(itemTypeConfig.fields).find(
      ([key, config]) => config.display === 'description'
    );
    return descField && item[descField[0]] ? item[descField[0]] : null;
  };

  const renderJournal = (item) => {
    if (itemType === 'publication' && item.journal) {
      const displayJournal = item.journal === "Int J Sports Physiol Perform" 
        ? "International Journal of Sports Physiology and Performance" 
        : item.journal;
      return <p className="entry-subtitle"><em>{displayJournal}</em></p>;
    }
    return null;
  };

  const renderLinks = (item) => {
    const linkFields = Object.entries(itemTypeConfig.fields).filter(
      ([key, config]) => config.display === 'link'
    );

    return linkFields.map(([key, config]) => {
      if (!item[key]) return null;

      if (key === 'doi') {
        return (
          <p key={key} className="entry-description left-aligned-link">
            <strong>DOI:</strong> <a href={`https://doi.org/${item[key]}`} target="_blank" rel="noopener noreferrer">{item[key]}</a>
          </p>
        );
      }

      if (key === 'link') {
        let linkText = item[key];
        let linkLabel = 'Website:';
        
        if (itemType === 'project') {
          linkText = item[key].replace(/^https?:\/\//, '');
        }

        return (
          <p key={key} className="entry-description">
            <strong>{linkLabel}</strong> <a href={item[key]} target="_blank" rel="noopener noreferrer">{linkText}</a>
          </p>
        );
      }

      if (key === 'uri') {
        return (
          <p key={key} className="entry-description">
            <strong>URI:</strong> <a href={item[key]} target="_blank" rel="noopener noreferrer">{item[key]}</a>
          </p>
        );
      }

      return null;
    }).filter(Boolean);
  };

  const renderLogo = (item) => {
    if (item.logo) {
      return (
        <img
          src={`/images/${item.logo}`}
          alt={`${item.company || item.university || 'Organization'} logo`}
          className="entry-logo"
        />
      );
    }
    return null;
  };

  const renderTechnologies = (item) => {
    if (item.technologies) {
      return <p className="entry-subtitle">Technologies: {item.technologies}</p>;
    }
    return null;
  };

  const sectionId = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <section id={sectionId}>
      {showTitle && <h2>{title}</h2>}
      {data.map((item, index) => (
        <div 
          className={`entry ${hasLeftAlignedEntries ? 'left-aligned-entry' : ''}`} 
          key={index}
        >
          {renderLogo(item)}
          <div className="entry-content">
            <h3 className="entry-title">{renderTitle(item)}</h3>
            <p className="entry-subtitle">{renderSubtitle(item)}</p>
            {renderJournal(item)}
            {renderDescription(item) && <p className="entry-description">{renderDescription(item)}</p>}
            {renderTechnologies(item)}
            {renderLinks(item)}
          </div>
          {renderDate(item) && <span className="entry-date">{renderDate(item)}</span>}
        </div>
      ))}
    </section>
  );
}

export default UniversalSection; 