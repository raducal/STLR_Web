import React from "react";
import QRCode from "qrcode.react";

const Modal = ({ qrID, eventTitle, closeModal }) => {
  console.log(qrID);
  return (
    <div className="modal-background">
      <div className="modal-open">
        <button onClick={() => closeModal()} className="close-modal-btn">
          X
        </button>
        <div className="modal-info">
          <p>{eventTitle}</p>
          <div key={qrID}>
            <QRCode
              id={qrID}
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

export default Modal;
