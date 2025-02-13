import React from 'react';
import workshopsData from '../data/workshops.json';

function Workshops() {
  return (
    <section id="workshops">
      <h2>Workshops</h2>
      {workshopsData.map((workshop, index) => (
        <div className="entry" key={index}>
          <div className="entry-content">
            <h3 className="entry-title">{workshop.title}</h3>
            <p className="entry-subtitle"><em>{workshop.site}</em></p>
            {workshop.link && (
              <p className="entry-description left-aligned-link">
                <strong>Link:</strong> <a href={workshop.link} target="_blank" rel="noopener noreferrer">{workshop.link.replace(/^https?:\/\//, '')}</a>
              </p>
            )}
          </div>
          <span className="entry-date">{workshop.date}</span>
        </div>
      ))}
    </section>
  );
}

export default Workshops; 