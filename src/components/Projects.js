import React from 'react';
import projectsData from '../data/projects.json';

function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>
      {projectsData.map((project, index) => (
        <div className="entry" key={index}>
          <div className="entry-content">
            <h3 className="entry-title">{project.name}</h3>
            {project.description && <p className="entry-description">{project.description}</p>}
            {project.technologies && <p className="entry-subtitle">Technologies: {project.technologies}</p>}
            {project.link && (
              <p className="entry-description">
                <a href={project.link} target="_blank" rel="noopener noreferrer">Project Link</a>
              </p>
            )}
          </div>
          {project.date && <span className="entry-date">{project.date}</span>}
        </div>
      ))}
    </section>
  );
}

export default Projects;