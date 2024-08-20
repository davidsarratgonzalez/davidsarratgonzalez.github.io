import React from 'react';
import presentationsData from '../data/presentations.json';

function Presentations() {
  return (
    <section id="presentations">
      <h2>Presentations</h2>
      {presentationsData.map((presentation, index) => (
        <div className="entry" key={index}>
          <div className="entry-content">
            <h3 className="entry-title">{presentation.title}</h3>
            <p className="entry-subtitle"><em>{presentation.event}</em></p>
            {presentation.description && <p className="entry-description">{presentation.description}</p>}
          </div>
          <span className="entry-date">{presentation.date}</span>
        </div>
      ))}
    </section>
  );
}

export default Presentations;