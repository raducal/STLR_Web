import React, { Fragment } from "react";
import "./App.css";

import EventProvider from "./context/EventContext";
import AuthProvider from "./context/AuthContext";

import PrivateRoute from "./components/PrivateRoute";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import LoggedIn from "./components/LoggedIn";
import QRCode from "./components/Qrgen";
import Events from "./components/Events";

import Navbar from "./components/Navbar";
import About from "./pages/About";
import HomePage from "./pages/HomePage";
import ExpiredEvents from "./components/ExpiredEvents";

import { AuthContext } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/login" component={Home} />
            <Route exact path="/about" component={About} />
            <PrivateRoute exact path="/" component={LoggedIn} />
          </Switch>
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
