import React, { useState, useEffect } from "react";
import Powerbtn from "./Powerbtn";
import "./Css/Taskbar.css"; // Create this file for custom animations
import { useNavigate } from "react-router-dom";

function Taskbar() {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/existinguser");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Mock system tray icons and open apps
  const systemTrayIcons = ['📶', '🔊'];
  const openApps = ['📁', '📝', '🌐', '🎨'];

  return (
    <div className="taskbar-wrapper fixed-bottom bg-glass px-3 py-2">
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Left Section - Start Menu and Open Apps */}
          <div className="col-6 col-md-4 d-flex align-items-center gap-3">
            <Powerbtn onClick={handleLogout} />
            <div className="d-flex gap-2 overflow-auto flex-nowrap">
              {openApps.map((app, index) => (
                <div 
                  key={index}
                  className="taskbar-icon hover-scale"
                  role="button"
                >
                  {app}
                </div>
              ))}
            </div>
          </div>

          {/* Center Section - Empty for spacing */}
          <div className="col-md-4 d-none d-md-block"></div>

          {/* Right Section - System Tray and Clock */}
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