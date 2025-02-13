import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Publications from './components/Publications';
import Projects from './components/Projects';
import Presentations from './components/Presentations';
import Posters from './components/Posters';
import Awards from './components/Awards';
import Theses from './components/Theses';
import Volunteering from './components/Volunteering';
import Workshops from './components/Workshops';
import aboutData from './data/about.json';

function App() {
  useEffect(() => {
    document.title = `${aboutData.name}`;
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <About />
        <Experience />
        <Education />
        <Projects />
        <Publications />
        <Presentations />
        <Workshops />
        <Posters />
        <Theses />
        <Awards />
        <Volunteering />
      </main>
    </div>
  );
}

export default App;