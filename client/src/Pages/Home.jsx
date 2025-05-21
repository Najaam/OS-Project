import React, { useState, useEffect } from "react";
import Taskbar from "../Components/Taskbar";
import TerminalComponent from "../Components/Terminal";
import NotepadComponent from "../Components/Notepad";
import Paintapp from "../Components/Paint";
import TaskManager from '../Components/Taskmanager'

function Home() {
  // Array of open apps with optional file data
  const [openApps, setOpenApps] = useState([]);

  const [fileSystem, setFileSystem] = useState({ "/": {} });
  const [currentPath, setCurrentPath] = useState(["/"]);

  // Toggle TaskManager open/close in openApps array
  const handleTaskManagerClick = () => {
    setOpenApps((prevApps) => {
      const exists = prevApps.find((app) => app.name === "TaskManager");
      return exists
        ? prevApps.filter((app) => app.name !== "TaskManager")
        : [...prevApps, { name: "TaskManager", isVisible: true }];
    });
  };
  
  // Keyboard shortcut Ctrl+Alt+T to toggle Terminal app
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.altKey && event.key === "t") {
        setOpenApps((prevApps) => {
          const exists = prevApps.find((app) => app.name === "Terminal");
          if (exists) {
            // Close Terminal if open
            return prevApps.filter((app) => app.name !== "Terminal");
          } else {
            // Open Terminal
            return [...prevApps, { name: "Terminal", isVisible: true }];
          }
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Open app or bring to front (simply add if not exists)
  const handleAppClick = (appName, file = null) => {
    setOpenApps((prevApps) => {
      const exists = prevApps.find(
        (app) =>
          app.name === appName &&
          (file ? app.file?.name === file.name : true)
      );
      if (exists) {
        return prevApps;
      }
      return [...prevApps, { name: appName, isVisible: true, file }];
    });
  };

  // Close specific app (with optional file)
  const handleCloseApp = (appName, file = null) => {
    setOpenApps((prevApps) =>
      prevApps.filter(
        (app) => !(app.name === appName && (file ? app.file?.name === file.name : true))
      )
    );
  };

  // Navigate into folder
  const handleFolderClick = (folderName) => {
    setCurrentPath((prevPath) => [...prevPath, folderName]);
  };

  // Navigate back one folder
  const handleBack = () => {
    setCurrentPath((prevPath) => prevPath.slice(0, -1));
  };

  // Get current folder content from fileSystem state
  const currentFolderContent = currentPath.reduce(
    (acc, folder) => acc[folder],
    fileSystem
  );

  // Handle file click: open appropriate app with file content
  const handleFileClick = (fileName) => {
    const currentDirectory = currentPath.reduce(
      (acc, folder) => acc[folder],
      fileSystem
    );
    const fileContent = currentDirectory[fileName];

    if (fileName.endsWith(".txt")) {
      handleAppClick("Notepad", { name: fileName, content: fileContent });
    } else if (fileName.endsWith(".pnt")) {
      handleAppClick("Paint", { name: fileName, content: fileContent });
    }
  };

  // Save file content into file system (called from apps)
  const handleSaveFile = (fileName, fileContent) => {
    const newFileSystem = { ...fileSystem };
    let currentDirectory = currentPath.reduce(
      (acc, folder) => acc[folder],
      newFileSystem
    );
    currentDirectory[fileName] = fileContent;
    setFileSystem(newFileSystem);
  };

  return (
    <>
      <div className="position-relative w-100 vh-100 d-flex align-items-center justify-content-center">
        <button
          onClick={handleTaskManagerClick}
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            backgroundColor: "#4C1D95",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "20px",
            zIndex: 1000,
          }}
        >
          🖥️
        </button>

        {/* Desktop Icons */}
        <div style={{ position: "absolute", top: "20%", left: "5%" }}>
          {Object.entries(currentFolderContent || {}).map(([name, content]) =>
            typeof content === "object" ? (
              <div
                key={name}
                className="folder-icon"
                style={{ marginBottom: "10px", color: "white", cursor: "pointer" }}
                onClick={() => handleFolderClick(name)}
                title={`Open ${name}`}
              >
                📁 {name}
              </div>
            ) : (
              <div
                key={name}
                className="file-icon"
                style={{ marginBottom: "10px", color: "white", cursor: "pointer" }}
                onClick={() => handleFileClick(name)}
                title={`Open ${name}`}
              >
                📄 {name}
              </div>
            )
          )}
        </div>

        {/* Render all open apps */}
        {openApps.map(({ name, isVisible, file }, index) => {
          if (!isVisible) return null;

          if (name === "Terminal") {
            return (
              <div
                key={`terminal-${index}`}
                className="terminal-wrapper position-fixed w-100 h-100 d-flex justify-content-center align-items-center"
                style={{ zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <TerminalComponent
                  isVisible={true}
                  onClose={() => handleCloseApp("Terminal")}
                  fileSystem={fileSystem}
                  setFileSystem={setFileSystem}
                />
              </div>
            );
          }

          if (name === "Notepad") {
            return (
              <NotepadComponent
                key={`notepad-${index}`}
                isVisible={true}
                onClose={() => handleCloseApp("Notepad", file)}
                fileSystem={fileSystem}
                setFileSystem={setFileSystem}
                currentPath={currentPath}
                onSave={(fileName, content) => {
                  handleSaveFile(fileName, content);
                }}
                file={file}
              />
            );
          }

          if (name === "Paint") {
            return (
              <Paintapp
                key={`paint-${index}`}
                isVisible={true}
                onClose={() => handleCloseApp("Paint", file)}
                onSave={(fileName, content) => {
                  handleSaveFile(fileName, content);
                }}
                file={file}
              />
            );
          }

          if (name === "TaskManager") {
            return (
              <div
                key={`taskmanager-${index}`}
                className=""
                style={{ zIndex: 1000 }}
              >
                <TaskManager
                  isVisible={true}
                  onClose={() => handleCloseApp("TaskManager")}
                  openApps={openApps}
                  onCloseApp={handleCloseApp}
                />
              </div>
            );
          }

          return null;
        })}

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

      {/* Main Taskbar at the bottom */}
      <Taskbar onAppClick={handleAppClick} openApps={openApps} />
    </>
  );
}

export default Home;
