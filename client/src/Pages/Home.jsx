import React from "react";
import { motion } from "framer-motion";

const Background = () => {
  // Animation variants for smooth text entry
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
      style={{ overflow: "hidden", }}
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
          className="text-white display-4 fw-bold text-shadow mb-3"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Welcome to Apka Apna OS
        </motion.h1>
          
        <motion.p
          className="text-light mt-3 fs-5"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Your simulated operating system in the browser.
        </motion.p>
      </div>
    </div>
  );
};

export default Background;
