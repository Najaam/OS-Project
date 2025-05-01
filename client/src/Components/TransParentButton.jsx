import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

function TransParentButton({ Name = "Default Button", route = "", height = "50px", width = "150px", fontSize = "1rem" }) {

  const navigate = useNavigate();

  const buttonVariants = {
    hover: {
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

  return (
    <div>
      <motion.button
        className="btn prism-btn me-3"
        style={{ height, width, fontSize }} // Apply custom styles
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        initial="hidden"
        animate="visible"
        custom={3}
        onClick={() => {
          console.log(`Navigating to: ${route}`); // Debug log
          navigate(route); // Use the route string directly
        }}
      >
        {Name}
      </motion.button>

      <style jsx>{`
        .prism-btn {
          position: relative;
          display: inline-block;
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
  );
}

export default TransParentButton;
