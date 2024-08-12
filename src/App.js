import React from 'react';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Publications from './components/Publications';
import Projects from './components/Projects';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <About />
        <Experience />
        <Education />
        <Publications />
        <Projects />
      </main>
    </div>
  );
}

export default App;