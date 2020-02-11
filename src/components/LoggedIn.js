import React, { useContext } from "react";

import QRCode from "./Qrgen";
import Events from "./Events";
import { useEffect } from "react";

import axios from "axios";

import { AuthContext } from "../context/AuthContext";

const LoggedIn = () => {
  return (
    <div className="logged-in-div">
      <Events />
    </div>
  );
};

export default LoggedIn;
