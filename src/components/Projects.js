import React from 'react';
import projectsData from '../data/projects.json';

function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>
      {projectsData.map((project, index) => (
        <div className="project" key={index}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </section>
  );
}

export default Projects;