import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const res = await axios.get("/scrape");

      setEvents(res.data.event);
    } catch (error) {
      console.log("errorrrr");
    }
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
