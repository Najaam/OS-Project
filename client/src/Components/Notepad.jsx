import React, { useState, useEffect, useRef } from "react";

const Notepad = ({ isVisible, onClose, file, onSave }) => {
  const [text, setText] = useState(file?.content || "");
  const wrapperRef = useRef(null);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: window.innerWidth / 8, y: window.innerHeight / 8 });

  useEffect(() => {
    setText(file?.content || "");
  }, [file]);

  if (!isVisible) return null;

  const handleSave = () => {
    if (file) {
      onSave(file.name, text);
    }
  };

  // Drag handlers
  const onMouseDownDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onMouseMoveDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    const wrapper = wrapperRef.current;
    if (wrapper) {
      const maxX = window.innerWidth - wrapper.offsetWidth;
      const maxY = window.innerHeight - wrapper.offsetHeight;

      setPosition({
        x: Math.min(Math.max(0, newX), maxX),
        y: Math.min(Math.max(0, newY), maxY),
      });
    } else {
      setPosition({ x: newX, y: newY });
    }
  };

  const onMouseUpDrag = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={wrapperRef}
      className="notepad-wrapper position-fixed"
      style={{
        zIndex: 1000,
        backgroundColor: "white",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        width: "75vw",
        height: "75vh",
        top: position.y,
        left: position.x,
        cursor: isDragging ? "grabbing" : "default",
        userSelect: isDragging ? "none" : "auto",
      }}
      onMouseMove={onMouseMoveDrag}
      onMouseUp={onMouseUpDrag}
      onMouseLeave={onMouseUpDrag}
    >
      {/* Notepad Header */}
      <div
        className="notepad-header"
        style={{
          backgroundColor: "#3B82F6",
          color: "white",
          padding: "10px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          cursor: "grab",
          userSelect: "none",
        }}
        onMouseDown={onMouseDownDrag}
      >
        <span>{file?.name || "Untitled Notepad"}</span>
        <div>
          <button
            onClick={handleSave}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "16px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            title="Save"
          >
            💾 Save
          </button>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
            }}
            title="Close"
          >
            ✖
          </button>
        </div>
      </div>

      {/* Notepad Body */}
      <textarea
        className="notepad-body flex-grow-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing..."
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          outline: "none",
          padding: "10px",
          resize: "none",
          fontSize: "16px",
          lineHeight: "1.5",
        }}
      ></textarea>
    </div>
  );
};

export default Notepad;
