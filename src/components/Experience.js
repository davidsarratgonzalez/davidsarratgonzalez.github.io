import React from 'react';
import experienceData from '../data/experience.json';

function Experience() {
  const formatDate = (startDate, endDate) => {
    return `${startDate} - ${endDate || 'Present'}`;
  };

  return (
    <section id="experience">
      <h2>Work Experience</h2>
      {experienceData.map((job, index) => (
        <div className="job" key={index}>
          <h3>{job.jobTitle}</h3>
          <p>{job.company} | {formatDate(job.startDate, job.endDate)}</p>
          {job.description && <p>{job.description}</p>}
        </div>
      ))}
    </section>
  );
}

export default Experience;