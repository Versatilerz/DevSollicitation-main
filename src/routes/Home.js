import classes from "./Home.module.css";

const HomePage = () => {
  return (
    <div className="container vh-100">
      <div className="row h-75 align-items-center">
        <div className="col-6 text-center">
          <h1 className={classes.h1}>
            <span className={classes.span}>
              Amsterdam Sports Inc. Extreme sports
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
