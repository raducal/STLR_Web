import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <button>
        <Link to="/about">About</Link>
      </button>
      <button>
        <Link to="/">/</Link>
      </button>
    </div>
  );
};

export default About;
