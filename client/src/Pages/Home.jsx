import React, { useState,useEffect } from "react";
import Taskbar from "../Components/Taskbar";
import TerminalComponent from "../Components/Terminal";

function Home() {
  const [activeApp, setActiveApp] = useState(null);
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.altKey && event.key === 't') {
        setIsTerminalVisible(prev => {
          const newState = !prev;
          setActiveApp(newState ? 'Terminal' : null);
          return newState;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  // Debugging log
  const handleAppClick = (appName) => {
    console.log(`Attempting to open ${appName}`);
    setActiveApp(appName);
    if (appName === "Terminal") {
      setIsTerminalVisible(true);
    }
  }

  const handleCloseApp = () => {
    console.log("Attempting to close app");
    setActiveApp(null);
    setIsTerminalVisible(false);
    console.log("App closed");
  };

  return (
    <>
      <div className="position-relative w-100 vh-100 d-flex align-items-center justify-content-center">
        <h1 className="text-white">Home</h1>

        {activeApp === "Terminal" && isTerminalVisible && (
  <div
    className="terminal-wrapper position-fixed w-100 h-100 d-flex justify-content-center align-items-center"
    style={{ zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
  >
    <TerminalComponent
      isVisible={isTerminalVisible}
      onClose={handleCloseApp}
    />
  </div>
)}
      </div>

      <div>
        <Taskbar
          onAppClick={handleAppClick}
          activeApp={activeApp}
        />
      </div>
    </>
  );
}

export default Home;
