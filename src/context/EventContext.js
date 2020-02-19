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
  const [expired, setExpired] = useState([]);
  const [current, setCurrent] = useState([]);

  const sortEvents = () => {
    events.map(event => {
      if (event.status === "current") {
        setCurrent(oldArray => [...oldArray, event]);
      } else {
        setExpired(oldArray => [...oldArray, event]);
      }
    });
  };

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
  }, [modal, qrCode_id, events, loadUser, sortEvents]);

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

  const convertToCSV = event => {
    const expiredEvent = expired.find(expEvent => expEvent.qrID === event.qrID);
    console.log(expiredEvent.present);
    const csvRows = [];
    const headers = ["StudentID"];
    csvRows.push(`${headers.join(",")}`);
    for (let row of expiredEvent.present) {
      csvRows.push("" + `"${row}"`);
      // csvRows.push(values.join(","));
    }
    return csvRows.join("\n");
  };

  const download = event => {
    const data = convertToCSV(event);
    console.log(data);
    const blob = new Blob([data], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `${event.title}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <EventContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        qrCode_id,
        event_id,
        title,
        current,
        expired,
        download,
        sortEvents
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
