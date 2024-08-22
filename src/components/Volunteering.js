import React from 'react';
import volunteeringData from '../data/volunteering.json';

function Volunteering() {
  return (
    <section id="volunteering">
      <h2>Volunteering</h2>
      {volunteeringData.map((vol, index) => (
        <div className="entry" key={index}>
          {vol.logo && (
            <img
              src={`/images/${vol.logo}`}
              alt={`${vol.organization} logo`}
              className="entry-logo"
            />
          )}
          <div className="entry-content">
            <h3 className="entry-title">{vol.position}</h3>
            <p className="entry-subtitle">{vol.organization}</p>
            {vol.description && <p className="entry-description">{vol.description}</p>}
          </div>
          <span className="entry-date">{vol.startDate} - {vol.endDate || 'Present'}</span>
        </div>
      ))}
    </section>
  );
}

export default Volunteering;