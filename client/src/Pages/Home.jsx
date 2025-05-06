import React from "react";
import Taskbar from "../Components/Taskbar";

function Home() {
  return (
    <>
    <div className="position-relative w-100 vh-100 d-flex align-items-center justify-content-center">
      <h1 className="text-white">Home</h1>
      <Taskbar />
    </div>
    <div>
<Taskbar />
    </div>
          </>
  );
}

export default Home;
