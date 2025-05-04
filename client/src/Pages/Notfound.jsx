import React from "react";

const NotFound = () => {
  const glitchTextStyles = {
    position: "relative",
    fontSize: "4rem",
    color: "#fff",
    textShadow: "2px 2px 0 #E52020, -2px -2px 0 #399918",
    animation: "glitch 1s infinite",
    overflow: "hidden",
  };

  const glitchBeforeAfterStyles = {
    content: '"404"',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  };

  const glitchBeforeStyles = {
    ...glitchBeforeAfterStyles,
    color: "#ff3b3b",
    animation: "glitch-anim 1s infinite linear alternate-reverse",
  };

  const glitchAfterStyles = {
    ...glitchBeforeAfterStyles,
    color: "#3bff3b",
    animation: "glitch-anim2 1s infinite linear alternate-reverse",
  };

  return (
    <div className="text-white position-relative w-100 vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1 style={glitchTextStyles}>
        404
      </h1>
      <p style={glitchTextStyles} >Page Not Found</p>
      <style>
        {`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(2px, -2px);
          }
          60% {
            transform: translate(-2px, -2px);
          }
          80% {
            transform: translate(2px, 2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes glitch-anim {
          0% {
            clip: rect(0, 900px, 0, 0);
          }
          25% {
            clip: rect(30px, 900px, 60px, 0);
          }
          50% {
            clip: rect(70px, 900px, 90px, 0);
          }
          75% {
            clip: rect(40px, 900px, 80px, 0);
          }
          100% {
            clip: rect(0, 900px, 0, 0);
          }
        }

        @keyframes glitch-anim2 {
          0% {
            clip: rect(0, 900px, 0, 0);
          }
          25% {
            clip: rect(50px, 900px, 80px, 0);
          }
          50% {
            clip: rect(20px, 900px, 50px, 0);
          }
          75% {
            clip: rect(10px, 900px, 70px, 0);
          }
          100% {
            clip: rect(0, 900px, 0, 0);
          }
        }
        `}
      </style>
    </div>
  );
};

export default NotFound;
