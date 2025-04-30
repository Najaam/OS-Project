import React, { useState } from "react";
import { motion } from "framer-motion";

function TransParentInputs({
  placeholder,
  width = "",
  height = "",
  id = "default",
  label = "",
  fontSize = "16px",
  marginRight = "0px",
  marginLeft = "0px",
  marginTop = "0px",
  marginBottom = "0px",
}) {
  const [isFocused, setIsFocused] = useState(false);

  const labelVariants = {
    hover: {
      x: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    rest: {
      x: 0, // Reset position
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    focused: {
      x: -20,
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const inputVariants = {
    hover: {
      boxShadow: "0px 4px 10px rgba(0, 255, 204, 0.3)",
    },
    focus: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 255, 204, 0.5)",
    },
    rest: {
      scale: 1,
      boxShadow: "0 4px 10px rgba(0, 255, 204, 0.3)",
      background:
        "linear-gradient(120,rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))",
    },
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="mb-4">
      <motion.label
        htmlFor={id}
        style={{ fontSize }}
        className="block text-white font-semibold m-2"
        variants={labelVariants}
        initial="rest"
        animate={isFocused ? "focused" : "rest"}
      >
        {label}
      </motion.label>
      <motion.input
        type="text"
        id={id}
        style={{
          height,
          width,
          fontSize,
          marginRight,
          marginLeft,
          marginTop,
          marginBottom,
        }}
        placeholder={placeholder}
        className="px-2 py-4 border placeholder-white border-gray-300 bg-transparent text-white focus:outline-none"
        variants={inputVariants}
        initial="rest"
        whileFocus="focus"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default TransParentInputs;
