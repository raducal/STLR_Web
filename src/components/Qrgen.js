import React, { useContext } from "react";
import QRCode from "qrcode.react";
import { AuthContext } from "../context/AuthContext";

const Qrgen = () => {
  const { events } = useContext(AuthContext);
  return (
    <div>
      {events.map(event => (
        <div key={event._id}>
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
