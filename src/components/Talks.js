import React from 'react';
import talksData from '../data/talks.json';

function Talks() {
  return (
    <section id="talks">
      <h2>Talks</h2>
      {talksData.map((talk, index) => (
        <div className="entry" key={index}>
          <div className="entry-content">
            <h3 className="entry-title">{talk.title}</h3>
            <p className="entry-subtitle"><em>{talk.event}</em></p>
            {talk.description && <p className="entry-description">{talk.description}</p>}
          </div>
          <span className="entry-date">{talk.date}</span>
        </div>
      ))}
    </section>
  );
}

export default Talks;