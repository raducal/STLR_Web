import React, { useContext, useState, createContext, useEffect } from "react";
import axios from "axios";
import { useReducer } from "react";
import AuthReducer from "./AuthReducer";

import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const [isAuthenticated, setAuthentication] = useState(null);
  const initialState = {
    isAuthenticated: null,
    token: null,
    store: null,
    events: []
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = async () => {
    let store = JSON.parse(localStorage.getItem("login"));

    if (store && store.isAuthenticated) {
      console.log("work");
      const res = await axios.get("/scrape", {
        headers: { Authorization: `Bearer ${store.token}` }
      });
      dispatch({
        type: "USER_LOADED",
        payload: {
          token: store.token,
          event: res.data.event,
          store
        }
      });
    } else {
      console.log("hello mop");
    }
  };

  const loginLecturer = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/scrape", formData, config);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      loadUser();
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error.response.data.msg });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider
      value={{
        loginLecturer,
        isAuthenticated: state.isAuthenticated,
        logout,
        loadUser,
        events: state.events,
        loading: state.loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
