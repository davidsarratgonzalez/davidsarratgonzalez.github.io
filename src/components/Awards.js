import React from 'react';
import awardsData from '../data/awards.json';

function Awards() {
  return (
    <section id="awards">
      <h2>Awards</h2>
      {awardsData.map((award, index) => (
        <div className="entry" key={index}>
          <div className="entry-content">
            <h3 className="entry-title">{award.title}</h3>
            {award.description && <p className="entry-description">{award.description}</p>}
            <p className="entry-subtitle"><em>{award.organization}</em></p>
            {award.link && (
              <p className="entry-description">
                <strong>Link:</strong> <a href={award.link} target="_blank" rel="noopener noreferrer">{award.link.replace(/^https?:\/\//, '')}</a>
              </p>
            )}
          </div>
          <span className="entry-date">{award.date}</span>
        </div>
      ))}
    </section>
  );
}

export default Awards;