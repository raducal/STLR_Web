import React, { Fragment, useState, useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";

const Home = historyInfo => {
  const { loginLecturer, isAuthenticated } = useContext(AuthContext);

  const { history } = historyInfo.historyInfo;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, history]);

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const { username, password } = user;

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (username === "" || password === "") {
      console.log("nope");
    } else {
      console.log("yeahhh");
      const loginAttempt = await loginLecturer({
        username,
        password
      });

      if (!loginAttempt) {
        setUser({
          username: "",
          password: ""
        });
      }
    }
  };
  return (
    <Fragment>
      <div className="login-container">
        <form className="form" onSubmit={handleSubmit}>
          <h3>Login</h3>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Home;
