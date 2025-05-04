import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TransParentButton from "../Components/TransParentButton";
import TransParentInputs from "../Components/TransParentInputs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function SigninForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    let isValid = true;

    // Validate username
    if (!username) {
      toast.error("Username field is required", {
        position: "top-right",
        duration: 5000,
      });
      isValid = false;
    }

    // Validate password
    if (!password) {
      toast.error("Password field is required", {
        position: "top-right",
        duration: 5000,
      });
      isValid = false;
    }

    // Check if all fields are valid
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop form submission if there are validation errors
    }
    try {
      const response = await axios.post(
        "https://os-project-server.vercel.app/auth/existinguser",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        toast.success("Login Successful!", {
          position: "top-right",
          duration: 5000,
        });
        console.log("Login Successful:", response.data);
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
        {
          position: "top-right",
          duration: 5000,
        }
      );
    }
  };

  return (
    <div
      className="position-relative w-100 vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "transparent", overflow: "hidden" }}
    >
      <div className="rounded p-4 bg-dark bg-opacity-75 backdrop-blur shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Sign In
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mt-4 mx-2 p-6 rounded-lg">
            <TransParentInputs
              id="un"
              label="Username"
              height="40px"
              width="200px"
              fontSize="20px"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="">
            <TransParentInputs
              id="pass"
              label="Password"
              height="40px"
              width="200px"
              marginLeft="10px"
              fontSize="20px"
              value={password} // Controlled input
              onChange={(e) => setPassword(e.target.value)} // Update state
              type="password" // Password input
            />
          </div>

          <TransParentButton
            Name="Sign In"
            height="45px"
            width="120px"
            fontSize="1.2rem"
            type="submit"
          />
          <div className="d-flex justify-content-between mt-4 small text-white">
            <motion.div
              whileHover={{ x: -5, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/forget-password" className="text-white text-decoration-none">
                Forgot Password?
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ x: -5, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/newuser" className="text-decoration-none text-white">
                New User
              </Link>
            </motion.div>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default SigninForm;
