import React, { useState, useEffect } from "react";
import Powerbtn from "./Powerbtn";
import "./Css/Taskbar.css";
import { useNavigate } from "react-router-dom";

function Taskbar({ onAppClick, activeApp }) {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/existinguser");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const systemTrayIcons = ["📶", "🔊"];
  const taskApps = [
    { name: "File Explorer", icon: "📁" },
    { name: "Notepad", icon: "📝" },
    { name: "Browser", icon: "🌐" },
    { name: "Paint", icon: "🎨" },
    { name: "Terminal", icon: "💻" },
  ];

  const handleAppClick = (appName) => {
    onAppClick(appName);
    console.log(`${appName} is now open.`);
  };

  return (
    <div className="taskbar-wrapper fixed-bottom bg-glass px-3 py-2">
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Left Section */}
          <div className="col-6 col-md-4 d-flex align-items-center gap-3">
            <Powerbtn onClick={handleLogout} />
            <div className="d-flex gap-2 flex-nowrap">
              {taskApps.map((app, index) => (
                <div
                  key={index}
                  className={`taskbar-icon hover-scale ${activeApp === app.name ? "active-app" : ""}`}
                  role="button"
                  onClick={() => handleAppClick(app.name)}
                >
                  {app.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Center Section (Empty for now) */}
          <div className="col-md-4 d-none d-md-block"></div>

          {/* Right Section */}
          <div className="col-6 col-md-4 d-flex align-items-center justify-content-end gap-3">
            <div className="d-flex gap-2">
              {systemTrayIcons.map((icon, index) => (
                <div
                  key={index}
                  className="system-tray-icon hover-glow"
                  role="button"
                >
                  {icon}
                </div>
              ))}
            </div>
            <div className="clock-display px-2 py-1 rounded">
              {formatTime(time)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Taskbar;
