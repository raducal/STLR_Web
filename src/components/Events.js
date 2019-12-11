import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { EventContext } from "../context/EventContext";

const Events = () => {
  const { events } = useContext(EventContext);

  return (
    <div>
      {events.map(event => (
        <div>
          <p>{event.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Events;
