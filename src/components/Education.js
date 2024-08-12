import React from 'react';
import educationData from '../data/education.json';

function Education() {
  const formatDate = (startDate, endDate) => {
    return `${startDate} - ${endDate || 'Present'}`;
  };

  return (
    <section id="education">
      <h2>Education</h2>
      {educationData.map((edu, index) => (
        <div className="education-entry" key={index}>
          <h3>{edu.degree}</h3>
          <p>{edu.university}</p>
          <p>{formatDate(edu.startDate, edu.endDate)}</p>
          {edu.description && <p>{edu.description}</p>}
        </div>
      ))}
    </section>
  );
}

export default Education;