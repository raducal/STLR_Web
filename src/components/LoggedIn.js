import React, { useContext, useMemo, useCallback } from "react";

import QRCode from "./Qrgen";
import Events from "./Events";
import { useEffect } from "react";

import axios from "axios";

import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import { EventContext } from "../context/EventContext";

const LoggedIn = () => {
  const { loadingEvents, getEvents, events } = useContext(AuthContext);
  const { qrCode_id } = useContext(EventContext);

  const getEventsOnChange = useCallback(() => {
    return getEvents();
  }, [events]);

  useEffect(() => {
    getEvents();
    // getEventsOnChange();
  }, []);

  return (
    <div className="logged-in-div">
      {loadingEvents ? <Loading /> : <Events />}
    </div>
  );
};

export default LoggedIn;
