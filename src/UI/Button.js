import { motion } from "framer-motion";
import classes from "./Button.module.css";

const Button = ({ children, onClick }) => {
  return (
    <div className="d-flex justify-content-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={classes.button}
        onClick={onClick}
      >
        {children}
      </motion.button>
    </div>
  );
};

export default Button;

// https://www.youtube.com/watch?v=SuqU904ZHA4
