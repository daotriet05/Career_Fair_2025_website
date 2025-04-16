import { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = () => {
  const [data, setData] = useState("Find a code to scan");

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg font-semibold">{data}</p>
      <div className="w-60 h-60 border-4 border-black rounded-xl overflow-hidden">
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              // 👇 You can do something with the scanned QR data here
              console.log("QR Code scanned:", result?.text);
            }
            if (!!error) {
              // handle scan errors if needed
            }
          }}
          containerStyle={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default QRScanner;
