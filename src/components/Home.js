import React, { Fragment, useState, useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";

const Home = (historyInfo) => {
  const { loginLecturer, isAuthenticated, loadUser } = useContext(AuthContext);

  const { history } = historyInfo.historyInfo;

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { username, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      console.log("nope");
    } else {
      console.log("yeahhh");
      setLoading(true);
      const height = window.screen.height;
      const width = window.screen.width;
      const loginAttempt = await loginLecturer({
        username,
        password,
      });

      console.log(loginAttempt);

      if (!loginAttempt) {
        setUser({
          username: "",
          password: "",
        });
        console.log("not signed in");
        setLoading(false);
      } else {
        setLoading(false);
        console.log("logged in");
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, history]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </Fragment>
  );
};

export default Home;
