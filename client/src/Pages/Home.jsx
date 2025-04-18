import React from "react";
import { motion } from "framer-motion";

const Background = () => {
  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 5px 15px rgba(0,255,204,0.5)",
    },
    tap: {
      scale: 0.95,
      boxShadow: "0px 2px 8px rgba(0,255,204,0.3)",
    },
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
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>

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
        <motion.button
          className="btn prism-btn me-3 px-4 py-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          initial="hidden"
          animate="visible"
          custom={3}
        >
          Existing User
        </motion.button>

        <motion.button
          className="btn prism-btn px-4 py-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          initial="hidden"
          animate="visible"
          custom={3}
        >
          New User
        </motion.button>
        <style jsx>{`
          .prism-btn {
            position: relative;
            display: inline-block;
            font-size: 1rem;
            font-weight: bold;
            color: #fff;
            text-transform: uppercase;
            border: 2px solid #fff;
            background: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
            border-radius: 0; /* Square shape */
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            box-shadow: 0 4px 10px rgba(0, 255, 204, 0.3);
          }

          .prism-btn:hover {
            background: rgba(0, 0, 0, 0.2);
            box-shadow: 0 8px 15px rgba(0, 255, 204, 0.5);
            color: #fff;
          }

          .prism-btn:active {
            box-shadow: 0 2px 8px rgba(0, 255, 204, 0.4);
          }

          .prism-btn::before {
            content: "";
            position: absolute;
            top: 0;
            left: -50%;
            width: 150%;
            height: 100%;
            background: linear-gradient(120deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
            transform: skewX(-25deg);
            transition: all 0.5s ease-in-out;
            z-index: 1;
          }

          .prism-btn:hover::before {
            left: 100%;
            transition: all 0.5s ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Background;
