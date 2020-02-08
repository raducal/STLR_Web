import React, { Fragment } from "react";

import Home from "./Home";

const Hero = history => {
  return (
    <Fragment>
      <div className="hero">
        <div className="hero-background">
          <div className="hero-text">
            <h5>Welcome to</h5>
            <h3>STLR</h3>
            <p>Student Transformative Learning Record</p>
          </div>
        </div>
        <div>
          <Home historyInfo={history} />
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
