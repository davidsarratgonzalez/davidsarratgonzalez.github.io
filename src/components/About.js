import React from 'react';
import aboutData from '../data/about.json';

function About() {
  return (
    <section id="about">
      <h2>About Me</h2>
      <p>{aboutData.description}</p>
    </section>
  );
}

export default About;