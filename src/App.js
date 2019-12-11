import React, { Fragment } from "react";
import "./App.css";
import EventProvider from "./context/EventContext";

import QRCode from "./components/Qrgen";
import Events from "./components/Events";

function App() {
  return (
    <EventProvider>
      <div>
        <QRCode />
        <Events />
      </div>
    </EventProvider>
  );
}

export default App;
