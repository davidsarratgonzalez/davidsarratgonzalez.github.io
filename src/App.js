import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import UniversalSection from './components/UniversalSection';
import resumeConfig from './data/resume-config.json';
import sectionsConfig from './data/sections-config.json';
import aboutData from './data/about.json';

function App() {
  const [sectionsData, setSectionsData] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Detect hash for special modes
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  const hideDownloadCV = hash === '#no-download';

  useEffect(() => {
    const title = hideDownloadCV ? `${aboutData.name} - Resume` : (resumeConfig.title || `${aboutData.name}`);
    document.title = title;
  }, [hideDownloadCV]);

  useEffect(() => {
    const loadSectionData = async () => {
      const dataPromises = Object.entries(sectionsConfig.sections).map(
        async ([sectionKey, config]) => {
          if (!config.enabled) return [sectionKey, null];
          
          try {
            const module = await import(`./data/${config.dataSource}`);
            return [sectionKey, module.default];
          } catch (error) {
            console.warn(`Failed to load data for section ${sectionKey}:`, error);
            return [sectionKey, null];
          }
        }
      );

      const results = await Promise.all(dataPromises);
      const dataMap = Object.fromEntries(results);
      setSectionsData(dataMap);
      setLoading(false);
    };

    loadSectionData();
  }, []);

  if (loading) {
    return <div className="App"></div>;
  }

  const renderSections = () => {
    return resumeConfig.sectionOrder
      .filter(sectionKey => {
        const config = sectionsConfig.sections[sectionKey];
        return config && config.enabled && sectionsData[sectionKey];
      })
      .map(sectionKey => {
        const config = sectionsConfig.sections[sectionKey];
        const data = sectionsData[sectionKey];

        return (
          <UniversalSection
            key={sectionKey}
            sectionConfig={config}
            data={data}
          />
        );
      })
      .filter(Boolean);
  };

  return (
    <div className={`App ${hideDownloadCV ? 'pdf-mode' : ''}`}>
      <Header hideDownloadCV={hideDownloadCV} />
      <main>
        {renderSections()}
      </main>
    </div>
  );
}

export default App;