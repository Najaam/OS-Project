import React from "react";

const Background = () => {
  return (
    <div className="position-relative w-100 vh-100 bg-dark">
      {/* Wallpaper */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 bg-cover bg-center"
        style={{ backgroundImage: "url('/path-to-your-wallpaper.jpg')", opacity: 0.9 }}
      ></div>

      {/* Overlay for styling */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-black bg-opacity-50"></div>

      {/* Interactive elements like icons or windows go here */}
      <div className="position-relative z-index-1 d-flex flex-column align-items-center justify-content-center">
        <h1 className="text-white display-4 fw-bold text-shadow">
          Welcome to WebOS
        </h1>
        <p className="text-light mt-3 fs-5">
          Your simulated operating system in the browser.
        </p>
      </div>
    </div>
  );
};

export default Background;
