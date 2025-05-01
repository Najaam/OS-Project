import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Replace with your auth check logic

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/" />;
  }

  // If token exists, render the child component
  return children;
};

export default ProtectedRoute;
