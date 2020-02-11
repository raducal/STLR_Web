import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [qrCode_id, setqrID] = useState("");
  const [event_id, setID] = useState({});
  const [title, setTitle] = useState("");

  const openModal = (qr, id, e_title) => {
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
      value={{ modal, openModal, closeModal, qrCode_id, event_id, title }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
