import React from 'react';
import publicationsData from '../data/publications.json';

function Publications() {
  return (
    <section id="publications">
      <h2>Publications</h2>
      {publicationsData.map((pub, index) => (
        <div className="publication" key={index}>
          <h3>{pub.title}</h3>
          <p>{pub.authors} | {pub.venue} | {pub.year}</p>
          {pub.description && <p>{pub.description}</p>}
        </div>
      ))}
    </section>
  );
}

export default Publications;