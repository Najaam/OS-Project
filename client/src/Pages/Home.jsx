import React, { useState, useEffect } from "react";
import Taskbar from "../Components/Taskbar";
import TerminalComponent from "../Components/Terminal";
import NotepadComponent from "../Components/Notepad";
import Paintapp from "../Components/Paint";
import TaskManager from "../Components/Taskmanager";

function Home() {
  const [openApps, setOpenApps] = useState([]);
  const [fileSystem, setFileSystem] = useState({ "/": {} });
  const [currentPath, setCurrentPath] = useState(["/"]);

  const handleTaskManagerClick = () => {
    setOpenApps((prevApps) => {
      const exists = prevApps.find((app) => app.name === "TaskManager");
      return exists
        ? prevApps.filter((app) => app.name !== "TaskManager")
        : [...prevApps, { name: "TaskManager", isVisible: true }];
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.altKey && event.key === "t") {
        setOpenApps((prevApps) => {
          const exists = prevApps.find((app) => app.name === "Terminal");
          return exists
            ? prevApps.filter((app) => app.name !== "Terminal")
            : [...prevApps, { name: "Terminal", isVisible: true }];
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAppClick = (appName, file = null) => {
    setOpenApps((prevApps) => {
      const exists = prevApps.find(
        (app) =>
          app.name === appName && (file ? app.file?.name === file.name : true)
      );
      return exists ? prevApps : [...prevApps, { name: appName, isVisible: true, file }];
    });
  };

  const handleCloseApp = (appName, file = null) => {
    setOpenApps((prevApps) =>
      prevApps.filter(
        (app) => !(app.name === appName && (file ? app.file?.name === file.name : true))
      )
    );
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

        {openApps.map(({ name, isVisible, file }, index) => {
          if (!isVisible) return null;
          if (name === "Terminal") {
            return (
              <TerminalComponent
                key={`terminal-${index}`}
                isVisible={true}
                onClose={() => handleCloseApp("Terminal")}
                fileSystem={fileSystem}
                setFileSystem={setFileSystem}
              />
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
                onSave={handleSaveFile}
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
                onSave={handleSaveFile}
                file={file}
              />
            );
          }
          if (name === "TaskManager") {
            return (
              <TaskManager
                key={`taskmanager-${index}`}
                isVisible={true}
                onClose={() => handleCloseApp("TaskManager")}
                openApps={openApps}
                onCloseApp={handleCloseApp}
              />
            );
          }
          return null;
        })}

        {currentPath.length > 1 && (
          <button
            onClick={handleBack}
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              backgroundColor: "#4C1D95",
              color: "#F0E7DB",
              padding: "10px 15px",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            🔙 Back
          </button>
        )}
      </div>
      <Taskbar onAppClick={handleAppClick} openApps={openApps} />
    </>
  );
}

export default Home;
