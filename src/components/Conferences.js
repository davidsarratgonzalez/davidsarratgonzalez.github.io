import React from 'react';
import conferencesData from '../data/conferences.json';

function Conferences() {
  return (
    <section id="conferences">
      <h2>Conferences</h2>
      {conferencesData.map((conference, index) => (
        <div className="entry" key={index}>
          <div className="entry-content">
            <h3 className="entry-title">{conference.title}</h3>
            <p className="entry-subtitle"><em>{conference.event}</em></p>
            {conference.description && <p className="entry-description">{conference.description}</p>}
          </div>
          <span className="entry-date">{conference.year}</span>
        </div>
      ))}
    </section>
  );
}

export default Conferences;