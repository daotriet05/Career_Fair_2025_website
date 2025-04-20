import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

const QRScanner = ({ companyName, updateBoothCollected }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  const [scannedData, setScannedData] = useState("Find a code to scan");
  const [isScanning, setIsScanning] = useState(false);

  // ✅ Manual function to start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;

      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video
            .play()
            .then(() => {
              console.log("🎥 Camera is playing");
              setIsScanning(true);
              startScanningLoop();
            })
            .catch((err) => {
              console.error("🚫 video.play() failed:", err);
            });
        };
      }
    } catch (err) {
      console.error("❌ Failed to access camera:", err);
    }
  };

  // ✅ Manual function to stop camera
  const stopCamera = () => {
    clearInterval(scanIntervalRef.current);

    const video = videoRef.current;
    if (video) {
      video.pause();
      video.srcObject = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      console.log("🔌 Camera fully stopped");
    }

    setIsScanning(false);
  };

  const startScanningLoop = () => {
    scanIntervalRef.current = setInterval(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas || video.videoWidth === 0 || video.videoHeight === 0) {
        return;
      }

      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        console.log("✅ QR Code scanned:", code.data);
        setScannedData(code.data);
        if (updateBoothCollected) {
            updateBoothCollected(companyName, code.data); // Update booth collected status
            stopCamera(); // 🔁 stop immediately after detection
        }
        stopCamera(); // 🔁 stop immediately after detection
      }
    }, 100);
  };

  // Cleanup on unmount
    useEffect(() => {
        
        return () => {
            stopCamera();
        };
    }, []);

    useEffect(() => {
        return () => {
            stopCamera(); // Stop camera when component unmounts
          console.log("🧹 QRScanner unmounted");
        };
      }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg font-semibold">{scannedData}</p>

      {!isScanning && (
        <button
          onClick={startCamera}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Start Camera
        </button>
      )}

      {isScanning && (
        <button
          onClick={stopCamera}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Stop Camera
        </button>
      )}
        <p>Company Name: {companyName}</p>
      <video
        ref={videoRef}
        className="w-72 h-72 md:w-96 md:h-96 border-4 border-black rounded-xl"
        style={{ objectFit: "cover", display: isScanning ? "block" : "none" }}
        muted
        playsInline
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default QRScanner;
