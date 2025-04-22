import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeDisplay = (props) => {
    console.log(props.userID);
    
  return (
    <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-semibold">QR CODE</p>
        <QRCodeCanvas value={props.userID} size={200} />
    </div>
  );
};

export default QRCodeDisplay;
