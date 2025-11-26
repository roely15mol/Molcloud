import React, { useState, useEffect } from 'react';
import GuiApp from './GuiApp';
import TerminalApp from './TerminalApp';

const getAppMode = (hash: string) => {
  return hash.startsWith('#/gui') ? 'gui' : 'terminal';
};

const App = () => {
  const [mode, setMode] = useState(getAppMode(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setMode(getAppMode(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []); // Effect runs only once on mount

  // Render both apps but hide the inactive one using style.display.
  // This prevents the GuiApp from unmounting on hash changes within the GUI,
  // which was the root cause of the smooth scrolling interruption.
  return (
    <>
      <div style={{ display: mode === 'gui' ? 'block' : 'none' }}>
        <GuiApp />
      </div>
      <div style={{ display: mode === 'terminal' ? 'block' : 'none' }}>
        <TerminalApp />
      </div>
    </>
  );
};

export default App;
