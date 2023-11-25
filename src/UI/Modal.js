import Backdrop from "./Backdrop";
import classes from "./Modal.module.css";

const Modal = ({ onClick, children }) => {
  return (
    <Backdrop onClick={onClick}>
      <div onClick={(e) => e.stopPropagation()} className={classes.modal}>
        <div className="container text-center p-4 ">{children}</div>
      </div>
    </Backdrop>
  );
};

export default Modal;
