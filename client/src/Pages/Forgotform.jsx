import React, { useState } from "react";
import axios from "axios";
import TransParentButton from "../Components/TransParentButton";
import TransParentInputs from "../Components/TransParentInputs";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Forgotform() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Validation for sending OTP
  const validateSendOtpForm = () => {
    if (!email.trim()) {
      toast.error("Email field is required.", {
        position: "top-right",
        duration: 5000,
      });
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address.", {
        position: "top-right",
        duration: 5000,
      });
      return false;
    }
    return true;
  };

  // Validation for resetting password
  const validateResetPasswordForm = () => {
    if (!otp.trim()) {
      toast.error("OTP field is required.", {
        position: "top-right",
        duration: 5000,
      });
      return false;
    }
    if (!newPassword.trim()) {
      toast.error("New Password field is required.", {
        position: "top-right",
        duration: 5000,
      });
      return false;
    }
    if (newPassword.length < 4) {
      toast.error("Password must be at least 4 characters long.", {
        position: "top-right",
        duration: 5000,
      });
      return false;
    }
    return true;
  };

  // Function to handle OTP sending
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!validateSendOtpForm()) return;

    try {
      await axios.post("https://os-project-server.vercel.app/auth/send-otp", {
        email,
      });
      setOtpSent(true);
      toast.success("OTP sent successfully!", {
        position: "top-right",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(
        error.response?.data?.message || "OTP request failed. Please try again.",
        {
          position: "top-right",
          duration: 5000,
        }
      );
    }
  };

  // Function to handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validateResetPasswordForm()) return;

    try {
      await axios.post("https://os-project-server.vercel.app/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      toast.success("Password reset successfully!", {
        position: "top-right",
        duration: 5000,
      });
      setTimeout(() => {
        navigate("/existinguser");
      }, 1000);
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(
        error.response?.data?.message || "Password reset request failed. Please try again.",
        {
          position: "top-right",
          duration: 5000,
        }
      );
    }
  };

  return (
    <div className="position-relative w-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="rounded p-4 bg-dark bg-opacity-75 backdrop-blur shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Forgot Password
        </h1>
        <form onSubmit={otpSent ? handleResetPassword : handleSendOtp}>
          <div className="mt-4 mx-2 p-6 rounded-lg">
            <TransParentInputs
              label="Email"
              height="40px"
              marginLeft="30px"
              width="200px"
              fontSize="20px"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {otpSent && (
              <>
                <div className="mb-4 mt-4">
                  <TransParentInputs
                    label="OTP"
                    height="40px"
                    marginLeft="41px"
                    width="200px"
                    fontSize="20px"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <TransParentInputs
                    label="Password"
                    height="40px"
                    // marginLeft="2px"
                    width="200px"
                    fontSize="20px"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </>
            )}
            <TransParentButton
              Name={otpSent ? "Reset Password" : "Send OTP"}
              height="45px"
              width="125px"
              fontSize="1.2rem"
              type="submit"
            />
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Forgotform;
