import "./App.css";
import ProtectedRoute from "./Components/Protectedroute";
import Forgotform from "./Pages/Forgotform";
import Home from "./Pages/Home";
import NotFound from "./Pages/Notfound";
import SigninForm from "./Pages/SigninForm";
import SignUpform from "./Pages/SignUpform";
import Welcome from "./Pages/Welcome";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
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
            backgroundImage:
              "url('https://img.itch.zone/aW1nLzEzNzczMjU3LmdpZg==/original/W%2Fd8%2BO.gif')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{  opacity: 0.6 }}
          animate={{  opacity: 1 }}
          transition={{ duration: 10, repeatType: "reverse" }}
        >
          
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/existinguser" element={<SigninForm />} />
            <Route path="/forget-password" element={<Forgotform />} />
            <Route path="/newuser" element={<SignUpform />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
