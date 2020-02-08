import React, { useContext } from "react";

import QRCode from "./Qrgen";
import Events from "./Events";
import { useEffect } from "react";

import axios from "axios";

import { AuthContext } from "../context/AuthContext";

const LoggedIn = () => {
  // const authContext = useContext(AuthContext);

  // const { loadUser } = authContext;

  // useEffect(() => {
  //   loadUser();
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div>
      <QRCode />
      <Events />
    </div>
  );
};

export default LoggedIn;
