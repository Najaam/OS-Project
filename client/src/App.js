import './App.css';
import SigninForm from './Pages/SigninForm';
import Welcome from './Pages/Welcome';
import Weclome from './Pages/Welcome';
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };
  return (

    <div className="App">
      
      <div
      className="position-relative w-100 vh-100 bg-dark d-flex align-items-center justify-content-center"
      style={{ overflow: "hidden" }}
    >
      {/* Background Animation */}
      <motion.div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('https://img.itch.zone/aW1nLzEzNzczMjU3LmdpZg==/original/W%2Fd8%2BO.gif')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ scale: 1.2, opacity: 0.6 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ duration: 10,  repeatType: "reverse" }}
      >
         <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/existinguser" element={<SigninForm />} />
          </Routes>
      </motion.div>
      </div>
    </div>
  );
}

export default App;
