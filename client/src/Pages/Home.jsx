import React, { useState, useEffect } from "react";
import Taskbar from "../Components/Taskbar";
import TerminalComponent from "../Components/Terminal";
import NotepadComponent from "../Components/Notepad";

function Home() {
  const [activeApp, setActiveApp] = useState(null);
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [isNotepadVisible, setIsNotepadVisible] = useState(false);
  const [fileSystem, setFileSystem] = useState({
    "/": {},
  });
  const [currentPath, setCurrentPath] = useState(["/"]); 
  const [currentFile, setCurrentFile] = useState(null); 

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.altKey && event.key === "t") {
        setIsTerminalVisible((prev) => {
          const newState = !prev;
          setActiveApp(newState ? "Terminal" : null);
          return newState;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

 const handleAppClick = (appName) => {
  setActiveApp(appName);
  if (appName === "Terminal") {
    setIsTerminalVisible(true);
  } else if (appName === "Notepad") {
    setIsNotepadVisible(true);
  } 
};

  const handleCloseApp = () => {
    setActiveApp(null);
    setIsTerminalVisible(false);
    setIsNotepadVisible(false);
    setCurrentFile(null); // Reset the file when Notepad is closed
  };

  const handleFolderClick = (folderName) => {
    setCurrentPath((prevPath) => [...prevPath, folderName]);
  };

  const handleBack = () => {
    setCurrentPath((prevPath) => prevPath.slice(0, -1));
  };

  const currentFolderContent = currentPath.reduce(
    (acc, folder) => acc[folder],
    fileSystem
  );
  const handleSaveFile = (fileName, fileContent) => {
    const newFileSystem = { ...fileSystem };
    let currentDirectory = currentPath.reduce(
      (acc, folder) => acc[folder],
      newFileSystem
    );
  
    // Save or update the file content in the current directory
    currentDirectory[fileName] = fileContent;
  
    setFileSystem(newFileSystem);
    handleCloseApp(); 
  };

  const handleFileClick = (fileName) => {
    const currentDirectory = currentPath.reduce(
      (acc, folder) => acc[folder],
      fileSystem
    );
    const fileContent = currentDirectory[fileName];
  
    if (fileName.endsWith(".txt")) {
      setActiveApp("Notepad");
      setIsNotepadVisible(true);
      setCurrentFile({ name: fileName, content: fileContent });
    }
  };
  

  return (
    <>
      <div className="position-relative w-100 vh-100 d-flex align-items-center justify-content-center">
        <h1 className="text-white">Home</h1>

        {/* Render folder and file icons on the desktop */}
        <div style={{ position: "absolute", top: "20%", left: "5%" }}>
          {Object.entries(currentFolderContent || {}).map(([name, content]) =>
            typeof content === "object" ? (
              <div
                key={name}
                className="folder-icon"
                style={{
                  marginBottom: "10px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => handleFolderClick(name)}
                title={`Open ${name}`}
              >
                📁 {name}
              </div>
            ) : (
              <div
                key={name}
                className="file-icon"
                style={{
                  marginBottom: "10px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => handleFileClick(name)}
                title={`Open ${name}`}
              >
                📄 {name}
              </div>
            )
          )}
        </div>

        {/* Render Terminal */}
        {activeApp === "Terminal" && isTerminalVisible && (
          <div
            className="terminal-wrapper position-fixed w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <TerminalComponent
              isVisible={isTerminalVisible}
              onClose={handleCloseApp}
              fileSystem={fileSystem}
              setFileSystem={setFileSystem}
            />
          </div>
        )}
        

        {/* Render Notepad */}
        {activeApp === "Notepad" && isNotepadVisible && (
          <NotepadComponent
            isVisible={isNotepadVisible}
            onClose={handleCloseApp}
            fileSystem={fileSystem}
            setFileSystem={setFileSystem}
            currentPath={currentPath}
            onSave={handleSaveFile} // Pass save handler
            file={currentFile} // Pass the file to open
          />
        )}

        {/* Back Button */}
        {currentPath.length > 1 && (
          <button
            onClick={handleBack}
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              zIndex: 1000,
              backgroundColor: "#4C1D95",
              color: "#F0E7DB",
              padding: "10px 15px",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            🔙 Back
          </button>
        )}
      </div>

      <div>
        <Taskbar onAppClick={handleAppClick} activeApp={activeApp} />
      </div>
    </>
  );
}

export default Home;
