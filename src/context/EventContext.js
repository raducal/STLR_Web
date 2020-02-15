import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import openSocket from "socket.io-client";

import { AuthContext } from "./AuthContext";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const { events, getQRID, loadUser } = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [qrCode_id, setqrID] = useState("");
  const [event_id, setID] = useState({});
  const [title, setTitle] = useState("");
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const socket = openSocket("http://localhost:5000");

    let timer = setInterval(() => {
      if (modal) {
        loadUser();
        let event1 = getQRID(title);
        setqrID(event1.qrID);
        socket.emit("qr", qrCode_id);
      }
    }, 12000);

    return () => clearInterval(timer);
  }, [modal, qrCode_id, events, loadUser]);

  const openModal = (qr, id, e_title) => {
    console.log(modal);
    setModal(true);
    setqrID(qr);
    setID(id);
    setTitle(e_title);
  };

  const closeModal = () => {
    setModal(false);
    setqrID("");
    setID({});
    setTitle("");
  };

  return (
    <EventContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        qrCode_id,
        event_id,
        title
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
