import { Link } from "react-router-dom";

const ErrorPageContent = (props) => {
  return (
    <div className="container vh-100">
      <div className="row h-50">
        <div className="col-6 text-center"></div>
        <h1>
          An error occurred, please go back to <Link to="/">Home</Link>
        </h1>
      </div>
    </div>
  );
};

export default ErrorPageContent;
