import React, { createContext, useEffect } from "react";
import axios from "axios";
import { useReducer } from "react";
import AuthReducer from "./AuthReducer";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: null,
    token: null,
    store: null,
    events: [],
    loading: true
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
        dispatch({
          type: "USER_LOADED",
          payload: {
            token: store.token,
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
    try {
      console.log("running get events");
      if (state.token !== null) {
        const res = await axios.get("/stlr/events", {
          headers: { Authorization: `Bearer ${state.token}` }
        });

        dispatch({
          type: "GET_EVENTS",
          payload: {
            event: res.data.event
          }
        });
      }
    } catch (error) {
      console.log("error");
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
      console.log(res.data);
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
        getEvents,
        loadingEvents: state.loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
