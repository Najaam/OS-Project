import React, { useState } from "react";
import { motion } from "framer-motion";
import TransParentButton from "../Components/TransParentButton";
import existuser from "./SigninForm";

const Welcome = () => {
  //Logics
  const [showSignin, setShowSignin] = useState(false);

  const handleSigninClick = () => {
    setShowSignin(true); // Show the SigninForm
  };

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
    <div
      className="position-relative w-100 vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "transparent", overflow: "hidden" }}
    >
      {/* Text Content with Animation */}
      <div className="position-relative z-index-1 text-center">
        <motion.h1
          className="display-4 fw-bold text-shadow mb-3"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          style={{ color: "#fff" }}
        >
          Welcome to Jade OS
        </motion.h1>
        <motion.p
          className="mt-3 fs-5"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          style={{ color: "#fff" }}
        >
          Your simulated OS in the browser.
        </motion.p>
        <div className="flex ">
          <div
            className="d-flex justify-content-center gap-3 mt-4"
            style={{ gap: "1rem" }}
          >
            <TransParentButton
              Name="Existing User"
              route="/existinguser"
              height="50px"
              width="170px"
              fontSize="1.2rem"
            />
            <TransParentButton
              Name="New User"
              height="50px"
              width="170px"
              fontSize="1.2rem"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
