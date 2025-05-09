import React, { useState, useEffect } from "react";

const Notepad = ({ isVisible, onClose, file, onSave }) => {
  const [text, setText] = useState(file?.content || "");

  useEffect(() => {
    // Update the text if the file changes
    setText(file?.content || "");
  }, [file]);

  if (!isVisible) return null;

  const handleSave = () => {
    if (file) {
      onSave(file.name, text); // Save the file with the new content
    }
  };

  return (
    <div
      className="notepad-wrapper position-fixed w-75 h-75"
      style={{
        zIndex: 1000,
        backgroundColor: "white",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
      }}
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
        }}
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
