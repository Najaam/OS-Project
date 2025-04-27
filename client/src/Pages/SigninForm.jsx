import React from "react";
import TransParentButton from "../Components/TransParentButton";
import TransParentInputs from "../Components/TransParentInputs";

function SigninForm() {
  return (
    <div
      className="position-relative w-100 vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "transparent", overflow: "hidden" }}
    >
      <div className="rounded-lg p-8 w-96 bg-opacity-80 bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Sign In
        </h1>
        <form>
          <div className="mb-4">
            
            <TransParentInputs
            label="Username"
            height="40px"
            width="220px"
            fontSize="25px"
            />
          </div>
          <div className="mb-4">
            <TransParentInputs 
            label="Password"
            height="40px"
            width="220px"
            fontSize="25px"
            />
          </div>
          <TransParentButton
            Name="Sign In"
            height="45px"
            width="120px"
            fontSize="1.2rem"
          />
          <div className="flex justify-between items-center mt-4 text-sm text-white">
            <a href="/forgot-password" className="hover:underline">
              Forgot Password?
            </a>
            <a href="/signup" className="hover:underline text-blue-400">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninForm;
