import React from 'react';
import aboutData from '../data/about.json';

function Header() {
  return (
    <header>
      {aboutData.profileImage && (
        <img
          src={`/images/${aboutData.profileImage}`}
          alt={`${aboutData.name}'s profile`}
          className="profile-image"
        />
      )}
      <h1>{aboutData.name}</h1>
      <p>{aboutData.title}</p>
    </header>
  );
}

export default Header;