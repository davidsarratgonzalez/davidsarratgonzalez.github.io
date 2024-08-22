import React from 'react';
import experienceData from '../data/experience.json';

function Experience() {
  return (
    <section id="experience">
      <h2>Work Experience</h2>
      {experienceData.map((job, index) => (
        <div className="entry left-aligned-entry" key={index}>
          {job.logo && (
            <img
              src={`/images/${job.logo}`}
              alt={`${job.company} logo`}
              className="entry-logo"
            />
          )}
          <div className="entry-content">
            <h3 className="entry-title">{job.jobTitle}</h3>
            <p className="entry-subtitle">{job.company}</p>
            {job.description && <p className="entry-description">{job.description}</p>}
          </div>
          <span className="entry-date">{job.startDate} - {job.endDate || 'Present'}</span>
        </div>
      ))}
    </section>
  );
}

export default Experience;