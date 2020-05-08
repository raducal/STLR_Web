import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import openSocket from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { AuthContext } from "./AuthContext";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const { events, getQRID, loadUser, getEvents, updateQR } = useContext(
    AuthContext
  );

  const [modal, setModal] = useState(false);
  const [qrCode_id, setqrID] = useState("");
  const [event_id, setID] = useState({});
  const [title, setTitle] = useState("");
  const [expired, setExpired] = useState([]);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    const socket = openSocket("http://localhost:5000");
    var refresh = null;
    if (modal) {
      refresh = setInterval(function () {
        let newQRID = uuidv4();
        socket.emit("qr", { qrCode_id, newQRID });
        socket.on("done", (id) => {
          console.log(id);
          setqrID(id);
        });
        clearInterval(refresh);
        refresh = null;
      }, 15000);
    } else {
      clearInterval(refresh);
      refresh = null;
      socket.disconnect(true);
    }
  }, [modal, qrCode_id]);

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
    getEvents();
  };

  const convertToCSV = (event) => {
    const expiredEvent = expired.find(
      (expEvent) => expEvent.qrID === event.qrID
    );
    console.log(expired);
    const csvRows = [];
    const headers = ["StudentID"];
    csvRows.push(`${headers.join(",")}`);
    for (let row of expiredEvent.present) {
      csvRows.push("" + `"${row}"`);
      // csvRows.push(values.join(","));
    }
    return csvRows.join("\n");
  };

  const download = (event) => {
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
        setCurrent,
        setExpired,
        current,
        expired,
        // sortEvents
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
