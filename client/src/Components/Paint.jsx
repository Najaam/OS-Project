import React, { useRef, useState, useEffect } from "react";

const Paint = ({ isVisible, onClose, onSave, file }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [mode, setMode] = useState("draw");

  // For drag
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: window.innerWidth / 8, y: window.innerHeight / 8 });

  useEffect(() => {
    const setupCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Set canvas width and height to the container's size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        contextRef.current = context;
      }
    };

    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    return () => window.removeEventListener("resize", setupCanvas);
  }, [color, lineWidth]);

  // Load file content if available
  useEffect(() => {
    if (file?.content) {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      const img = new Image();
      img.onload = () => context.drawImage(img, 0, 0);
      img.src = JSON.parse(file.content).content; // Parse and load the saved content
    }
  }, [file]);

  if (!isVisible) return null;

  // Drawing handlers
  const startDrawing = ({ nativeEvent }) => {
    if (mode !== "draw") return;

    const { offsetX, offsetY } = nativeEvent;
    setStartX(offsetX);
    setStartY(offsetY);

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || !contextRef.current || mode !== "draw") return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = ({ nativeEvent }) => {
    if (!contextRef.current) return;

    const { offsetX, offsetY } = nativeEvent;
    if (mode === "rectangle") {
      const width = offsetX - startX;
      const height = offsetY - startY;
      contextRef.current.strokeRect(startX, startY, width, height);
    } else if (mode === "circle") {
      const radius = Math.sqrt(
        Math.pow(offsetX - startX, 2) + Math.pow(offsetY - startY, 2)
      );
      contextRef.current.beginPath();
      contextRef.current.arc(startX, startY, radius, 0, Math.PI * 2);
      contextRef.current.stroke();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Save file internally to the virtual OS
  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imageData = canvas.toDataURL("image/png"); // Get base64 image data
      const fileContent = JSON.stringify({ content: imageData }); // Save as JSON
      const fileName = file?.name || "drawing.pnt";

      onSave(fileName, fileContent); // Save file within the virtual OS
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

    // Optional: boundaries check (prevent dragging outside viewport)
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
      className="paint-wrapper position-fixed"
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
      <div
        className="paint-header"
        style={{
          backgroundColor: "#3B82F6",
          color: "white",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "grab",
          userSelect: "none",
        }}
        onMouseDown={onMouseDownDrag}
      >
        <span>Paint App</span>
        <div>
          <button
            onClick={clearCanvas}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "16px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            title="Clear"
          >
            🗑️ Clear
          </button>
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
      <div
        style={{
          display: "flex",
          padding: "10px",
          backgroundColor: "#f1f5f9",
          borderBottom: "1px solid #ddd",
        }}
      >
        <button onClick={() => setMode("draw")}>✏️ Draw</button>
        <button onClick={() => setMode("rectangle")}>▭ Rectangle</button>
        <button onClick={() => setMode("circle")}>⚪ Circle</button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="number"
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          style={{ width: "60px", marginLeft: "10px" }}
          min={1}
          max={50}
        />
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          flexGrow: 1,
          cursor: mode === "draw" ? "crosshair" : "default",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default Paint;
