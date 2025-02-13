import React from 'react';
import aboutData from '../data/about.json';

function About() {
  if (!aboutData.description) {
    return null;
  }

  return (
    <section id="about">
      <h2>About Me</h2>
      <div className="entry">
        <div className="entry-content">
          <p className="entry-description">{aboutData.description}</p>
        </div>
      </div>
    </section>
  );
}

export default About;