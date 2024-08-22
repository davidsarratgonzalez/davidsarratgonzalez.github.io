import React from 'react';
import thesesData from '../data/theses.json';

function Theses() {
  return (
    <section id="theses">
      <h2>Directed Theses</h2>
      {thesesData.map((thesis, index) => (
        <div className="entry" key={index}>
          <div className="entry-content">
            <h3 className="entry-title">{thesis.title}</h3>
            <p className="entry-subtitle">{thesis.author}</p>
            <p className="entry-subtitle"><em>{thesis.degree}</em></p>
            {thesis.uri && (
              <p className="entry-description left-aligned-link">
                <strong>URI:</strong> <a href={thesis.uri} target="_blank" rel="noopener noreferrer">{thesis.uri.replace(/^https?:\/\//, '')}</a>
              </p>
            )}
          </div>
          <span className="entry-date">{thesis.date}</span>
        </div>
      ))}
    </section>
  );
}

export default Theses;