import React from 'react'
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { motion } from "framer-motion";

function Powerbtn({ onClick }) {
  return (
    <motion.div
    onClick={onClick}
        whileHover={{ y: -10,x:-5 }} 
        transition={{ type: "spring", stiffness: 300 }}
        style={{ cursor: "pointer" }}
        >
        <PowerSettingsNewIcon
          style={{
            fontSize: 35,
            color: "white",
            marginLeft: "10px",
          }}
          
          />
      </motion.div>
  )
}

export default Powerbtn