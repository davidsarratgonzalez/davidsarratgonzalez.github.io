import React from 'react';
import aboutData from '../data/about.json';

function Header() {
  return (
    <header>
      <h1>{aboutData.name}</h1>
      <p>{aboutData.title}</p>
    </header>
  );
}

export default Header;