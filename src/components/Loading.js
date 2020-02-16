import React from "react";
import logo from "../image/loading.gif";

const Loading = () => {
  return (
    <div className="loading-div">
      <img src={logo} alt="" />
      <h4>Please Wait...</h4>
    </div>
  );
};

export default Loading;
