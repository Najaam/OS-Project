import React from "react";
import { Link } from "react-router-dom";
import TransParentButton from "../Components/TransParentButton";
import TransParentInputs from "../Components/TransParentInputs";

function SigninForm() {
  return (
    <div
      className="position-relative w-100 vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "transparent", overflow: "hidden" }}
    ><div className="rounded p-4 bg-dark bg-opacity-75 backdrop-blur shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Sign In
        </h1>
        <form>
          <div className="mt-4 p-6 rounded-lg">
            
            <TransParentInputs
            label="Username"
            height="40px"
            width="220px"
            fontSize="20px"
            />
          </div>
          <div className="mb-4">
            <TransParentInputs 
            label="Password"
            height="40px"
            marginLeft="8px"
            width="220px"
            fontSize="20px"
            />
          </div>
          <TransParentButton
            Name="Sign In"
            height="45px"
            width="120px"
            fontSize="1.2rem"
          />
  <div className="d-flex justify-content-between mt-4 small text-white">
  <Link to="/forgot" className="hover:underline text-white">
    Forgot Password?
  </Link>
  <Link to="/newuser" className="hover:underline text-white">
      New User
  </Link>
</div>

        </form>
      </div>
    </div>
  );
}

export default SigninForm;
