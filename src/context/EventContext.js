import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    const res = await axios.get("/scrape");

    setEvents(res.data);
  };

  useEffect(() => {
    getEvents();
  });

  return (
    <EventContext.Provider value={{ events, getEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
