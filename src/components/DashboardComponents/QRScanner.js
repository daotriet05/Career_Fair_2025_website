import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import QRImage from "../../icons/qr-code.png";

const QRScanner = ({ companyName, updateBoothCollected, getStudentData }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);
  const hasScannedRef = useRef(false); // ✅ Lock to prevent multiple scans

  const [scannedData, setScannedData] = useState("Find a code to scan");
  const [studentData, setStudentData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      setScannedData("Find a code to scan");
      setStudentData(null);
      hasScannedRef.current = false; // ✅ Reset scan lock

      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video
            .play()
            .then(() => {
              console.log("📷 Camera is playing");
              setIsScanning(true);
              startScanningLoop();
            })
            .catch((err) => {
              console.error("❌ video.play() failed:", err);
            });
        };
      }
    } catch (err) {
      console.error("❌ Failed to access camera:", err);
    }
  };

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

      if (code && !hasScannedRef.current) {
        console.log("✅ QR Code scanned:", code.data);
        hasScannedRef.current = true; // ✅ Lock after first scan
        setScannedData(code.data);

        (async () => {
          const studentData = await getStudentData(code.data);
          if (studentData) {
            console.log("📚 Student name:", studentData.displayName);
            setStudentData(studentData);

            if (updateBoothCollected) {
              await updateBoothCollected(companyName, code.data);
            }

            stopCamera(); // ✅ safe to stop here
          } else {
            hasScannedRef.current = false; // Allow re-scan if failed
          }
        })();
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      stopCamera(); // Cleanup when unmounting
      console.log("🧹 QRScanner unmounted");
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 shadow-lg p-4 rounded-lg bg-gray-100 w-1/2 mx-auto">
      <video
        ref={videoRef}
        className="w-72 h-72 md:w-96 md:h-96 border-4 border-black rounded-xl"
        style={{
          objectFit: "cover",
          display: isScanning ? "block" : "block",
          backgroundImage: `url(${QRImage})`, // Replace with your image path
          backgroundSize: "80%", // Ensures the image covers the entire block
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents image repetition
        }}
        muted
        playsInline
      />

      {!isScanning && (
        <button
        onClick={startCamera}
        className="bg-green-800 text-white px-8 py-4 rounded"
        >
          Start Scan
        </button>
      )}

      {isScanning && (
        <button
        onClick={stopCamera}
        className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Stop Scan
        </button>
      )}
      <p style={{fontWeight:"bold"}}>Company Name: {companyName}</p>

      {studentData && (
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-2">Student Information</h2>
          <p className="text-gray-700">
            Name: <b>{studentData.displayName}</b>
          </p>
          <p className="text-gray-700">Major: {studentData.major}</p>
          <div className="mt-4 flex justify-center gap-4">
            {studentData.CV_link && (
              <a
                href={studentData.CV_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition"
              >
                View CV
              </a>
            )}
            {studentData.linkedin_link && (
              <a
                href={studentData.linkedin_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default QRScanner;
