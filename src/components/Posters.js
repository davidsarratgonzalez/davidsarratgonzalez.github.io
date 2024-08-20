import React from 'react';
import postersData from '../data/posters.json';

function Posters() {
  return (
    <section id="posters">
      <h2>Posters</h2>
      {postersData.map((poster, index) => (
        <div className="entry" key={index}>
          <div className="entry-content">
            <h3 className="entry-title">{poster.title}</h3>
            <p className="entry-subtitle">{poster.authors}</p>
            <p className="entry-subtitle"><em>{poster.event}</em></p>
            {poster.description && <p className="entry-description">{poster.description}</p>}
            {poster.doi && (
              <p className="entry-description">
                <strong>DOI:</strong> <a href={`https://doi.org/${poster.doi}`} target="_blank" rel="noopener noreferrer">{poster.doi}</a>
              </p>
            )}
          </div>
          <span className="entry-date">{poster.date}</span>
        </div>
      ))}
    </section>
  );
}

export default Posters;