import React, { useContext } from "react";
import QRCode from "qrcode.react";

import { EventContext } from "../context/EventContext";

const Qrgen = () => {
  const { events } = useContext(EventContext);
  return (
    <div>
      {events.map(event => (
        <div>
          <QRCode
            id="123456"
            value={event.qrID}
            size={200}
            level={"H"}
            includeMargin={true}
          />
        </div>
      ))}
    </div>
  );
};

export default Qrgen;
