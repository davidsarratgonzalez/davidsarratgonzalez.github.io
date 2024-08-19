import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Publications from './components/Publications';
import Projects from './components/Projects';
import Posters from './components/Posters';
import Talks from './components/Talks';
import Awards from './components/Awards';
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
        <Publications />
        <Projects />
        <Posters />
        <Talks />
        <Awards />
      </main>
    </div>
  );
}

export default App;