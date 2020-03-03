import React, { createContext } from "react";
import axios from "axios";
import { useReducer } from "react";
import AuthReducer from "./AuthReducer";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: null,
    token: null,
    store: null,
    events: []
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const getQRID = title => {
    let event1 = state.events.find(event => event.title === title);
    console.log(event1);
    return event1;
  };

  const loadUser = async () => {
    let store = JSON.parse(localStorage.getItem("login"));
    console.log("load user running");
    try {
      if (store && store.isAuthenticated) {
        console.log("loading user");
        const res = await axios.get("/stlr/events", {
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
        console.log("not working load user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEvents = async () => {
    let store = JSON.parse(localStorage.getItem("login"));
    try {
      if (store && store.isAuthenticated) {
        const res = await axios.get("/stlr/events", {
          headers: { Authorization: `Bearer ${store.token}` }
        });

        dispatch({
          type: "GET_EVENTS",
          payload: {
            token: store.token,
            event: res.data.event,
            store
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginLecturer = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/stlr/events", formData, config);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      loadUser();
      return true;
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error.response.data.msg });
      console.log("Not logged");
      return false;
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
        getQRID,
        getEvents
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
