import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { EventContext } from "../context/EventContext";

import Modal from "./Modal";

const Events = () => {
  const {
    modal,
    openModal,
    closeModal,
    qrCode_id,
    event_id,
    title,
    download,
    setCurrent,
    setExpired,
    current,
    expired,
  } = useContext(EventContext);
  const { events, getEvents } = useContext(AuthContext);

  const [state, setState] = useState(true);

  useEffect(() => {
    events.map((event) => {
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

      if (event.status === "current") {
        setCurrent((oldArray) => [...oldArray, event]);
      } else {
        setExpired((oldArray) => [...oldArray, event]);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <div className="events">
        <div className="change-event-div">
          <button className="change-event-btn" onClick={() => setState(true)}>
            Current
          </button>
          <button className="change-event-btn" onClick={() => setState(false)}>
            Past
          </button>
        </div>
        {state ? (
          <div>
            {current.map((event) => (
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
                    onClick={() =>
                      openModal(event.qrID, event._id, event.title)
                    }
                    className="qrCode-btn"
                  >
                    QR Code
                  </button>
                </div>
              </div>
            ))}
            {modal ? (
              <Modal
                qrID={qrCode_id}
                eventTitle={title}
                closeModal={closeModal}
              />
            ) : (
              <div className="modal-closed"></div>
            )}
          </div>
        ) : (
          <div>
            {expired.map((event) => (
              <div className="event-div" key={event.qrID}>
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
                    onClick={() => {
                      download(event);
                    }}
                    className="qrCode-btn"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Events;
