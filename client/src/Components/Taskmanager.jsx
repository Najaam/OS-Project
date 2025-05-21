import React, { useState, useEffect, useRef } from "react";

function TaskManager() {
  const processNames = [
    "System Idle Process",
    "Explorer",
    "Windows Update",
    "Task Manager",
    "PowerShell",
    "Notepad",
    "File Explorer",
  ];

  const backgroundProcessNames = [
    "Windows Defender",
    "System",
    "Service Host: Local System",
    "Cortana",
    "Runtime Broker",
    "Windows Shell Experience Host",
    "Device Association Framework",
    "SearchUI",
    "Spooler SubSystem App",
    "WMI Provider Host",
  ];

  const getRandomUsage = () => ({
    cpu: `${(Math.random() * 5).toFixed(1)}%`,
    memory: `${(Math.random() * 1000 + 50).toFixed(1)} MB`,
    disk: `${(Math.random() * 5).toFixed(1)} MB/s`,
    network: `${(Math.random() * 10).toFixed(1)} Mbps`,
  });

  const generateProcesses = (names, min = 5, max = 10) => {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    return [...names]
      .sort(() => 0.5 - Math.random())
      .slice(0, count)
      .map((name) => ({
        id: Math.random().toString(36).substr(2, 9),
        name,
        priority: Math.floor(Math.random() * 3) + 1,
        status: "Suspended",
        ...getRandomUsage(),
      }));
  };

  const [foregroundProcesses, setForegroundProcesses] = useState(() =>
    generateProcesses(processNames)
  );
  const [backgroundProcesses, setBackgroundProcesses] = useState(() =>
    generateProcesses(backgroundProcessNames)
  );

  const rrIndex = useRef({ 1: 0, 2: 0, 3: 0 });
  const TIME_QUANTUM = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      // Foreground
      setForegroundProcesses((prev) => {
        const grouped = {
          1: prev.filter((p) => p.priority === 1),
          2: prev.filter((p) => p.priority === 2),
          3: prev.filter((p) => p.priority === 3),
        };

        const currentPriority = [1, 2, 3].find((p) => grouped[p].length > 0);
        if (!currentPriority) return [];

        const group = grouped[currentPriority];
        let index = rrIndex.current[currentPriority];
        if (index >= group.length) index = 0;

        const runningId = group[index].id;
        rrIndex.current[currentPriority] = (index + 1) % group.length;

        return prev
          .map((proc) =>
            proc.id === runningId
              ? { ...proc, status: "Active", ...getRandomUsage() }
              : { ...proc, status: "Suspended" }
          )
          .filter((proc) => proc.status !== "Suspended"); // REMOVE suspended
      });

      // Background
      setBackgroundProcesses((prev) => {
        return prev
          .map((proc) =>
            Math.random() < 0.3
              ? { ...proc, status: "Active", ...getRandomUsage() }
              : { ...proc, status: "Suspended" }
          )
          .filter((proc) => proc.status !== "Suspended"); // REMOVE suspended
      });
    }, TIME_QUANTUM);

    return () => clearInterval(interval);
  }, []);

  // Dragging logic
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 200, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!isVisible) return null;

  return (
    <div
      className="task-manager"
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: "900px",
        height: "500px",
        zIndex: 1000,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="m-0">Task Manager</h5>
          <button
            className="btn btn-close"
            onClick={() => setIsVisible(false)}
            aria-label="Close"
          />
        </div>
        <div className="card-body p-0" style={{ overflowY: "auto", height: "430px" }}>
          <h6 className="text-center bg-light p-2 m-0">Foreground Processes</h6>
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Priority</th>
                <th>Status</th>
                <th>CPU</th>
                <th>Memory</th>
                <th>Disk</th>
                <th>Network</th>
              </tr>
            </thead>
            <tbody>
              {foregroundProcesses.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.priority}</td>
                  <td>{p.status}</td>
                  <td>{p.cpu}</td>
                  <td>{p.memory}</td>
                  <td>{p.disk}</td>
                  <td>{p.network}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h6 className="text-center bg-light p-2 m-0">Background Processes</h6>
          <table className="table table-striped table-hover">
            <thead className="table-secondary">
              <tr>
                <th>Name</th>
                <th>Priority</th>
                <th>Status</th>
                <th>CPU</th>
                <th>Memory</th>
                <th>Disk</th>
                <th>Network</th>
              </tr>
            </thead>
            <tbody>
              {backgroundProcesses.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.priority}</td>
                  <td>{p.status}</td>
                  <td>{p.cpu}</td>
                  <td>{p.memory}</td>
                  <td>{p.disk}</td>
                  <td>{p.network}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
