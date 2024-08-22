import React from 'react';
import publicationsData from '../data/publications.json';

function Publications() {
  return (
    <section id="publications">
      <h2>Publications</h2>
      {publicationsData.map((pub, index) => (
        <div key={index} className="entry">
          <div className="entry-content">
            <h3 className="entry-title">{pub.title}</h3>
            <p className="entry-subtitle">{pub.authors}</p>
            <p className="entry-subtitle">
              <em>
                {pub.journal === "Int J Sports Physiol Perform" 
                  ? "International Journal of Sports Physiology and Performance" 
                  : pub.journal}
              </em>
            </p>
            {pub.doi && (
              <p className="entry-description left-aligned-link">
                <strong>DOI:</strong> <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">{pub.doi}</a>
              </p>
            )}
          </div>
          <span className="entry-date">{pub.month} {pub.year}</span>
        </div>
      ))}
    </section>
  );
}

export default Publications;