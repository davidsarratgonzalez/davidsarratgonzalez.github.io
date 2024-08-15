import React from 'react';
import publicationsData from '../data/publications.json';

function Publications() {
  return (
    <section id="publications">
      <h2>Publications</h2>
      {publicationsData.map((pub, index) => (
        <div className="entry" key={index}>
          <div className="entry-content">
            <h3 className="entry-title">{pub.title}</h3>
            <p className="entry-subtitle">{pub.authors}</p>
            <p className="entry-subtitle">{pub.venue}</p>
            {pub.description && <p className="entry-description">{pub.description}</p>}
            {pub.doi && (
              <p className="entry-description">
                DOI: <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">{pub.doi}</a>
              </p>
            )}
          </div>
          <span className="entry-date">{pub.year}</span>
        </div>
      ))}
    </section>
  );
}

export default Publications;