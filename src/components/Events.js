import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import QRCode from "qrcode.react";

import { AuthContext } from "../context/AuthContext";
import { EventContext } from "../context/EventContext";

const Events = () => {
  const {
    modal,
    openModal,
    closeModal,
    qrCode_id,
    event_id,
    title
  } = useContext(EventContext);
  const { events } = useContext(AuthContext);

  // const allEvents = events;

  events.map(event => {
    if (event.due !== undefined) {
      const findGMT = event.due.includes("GMT+");
      if (findGMT) {
        const index = event.due.indexOf("+");
        const str = event.due.slice(0, index - 4);
        const colon = str.indexOf(":");
        const time = str.slice(colon - 2, colon + 3);
        const date = str.slice(0, colon - 3);
        event.time = time;
        event.due = date;
      }
    } else {
      event.time = "N/A";
    }
  });

  const modalopen = (id, qrID, eventTitle) => {
    console.log(modal);
    console.log(qrID);
    return (
      <div className="modal-background">
        <div className="modal-open">
          <button onClick={() => closeModal()} className="close-modal-btn">
            X
          </button>
          <div className="modal-info">
            <p>{eventTitle}</p>
            <div key={id}>
              <QRCode
                id="123456"
                value={qrID}
                size={250}
                level={"H"}
                includeMargin={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="events">
      {events.map(event => (
        <div className="event-div" key={event._id}>
          <div className="event-div-left">
            <div className="event-due-title">
              <p>Due</p>
            </div>
            <div className="event-design"></div>
            <p className="event-details">{event.due}</p>
            <p>{event.time}</p>
          </div>
          <div className="event-div-right">
            <div className="event-img"></div>
            <p>{event.title}</p>
            <button
              onClick={() => openModal(event.qrID, event._id, event.title)}
              className="qrCode-btn"
            >
              QR Code
            </button>
          </div>
        </div>
      ))}
      {modal ? (
        modalopen(event_id, qrCode_id, title)
      ) : (
        <div className="modal-closed"></div>
      )}
    </div>
  );
};

export default Events;
