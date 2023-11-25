import classes from "./Backdrop.module.css";
import { motion } from "framer-motion";

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div className={classes.backdrop} onClick={onClick}>
      {children}
    </motion.div>
  );
};

export default Backdrop;
