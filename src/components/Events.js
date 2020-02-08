import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../context/AuthContext";

const Events = () => {
  // const { events } = useContext(EventContext);
  const { events } = useContext(AuthContext);

  console.log(events);

  return (
    <div>
      {events.map(event => (
        <div key={Math.random()}>
          <p>{event.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Events;
