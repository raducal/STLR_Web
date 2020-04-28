import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import EventProvider from "./context/EventContext";
import AuthProvider from "./context/AuthContext";

import PrivateRoute from "./components/PrivateRoute";

import Home from "./components/Home";
import LoggedIn from "./components/LoggedIn";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import HomePage from "./pages/HomePage";

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
