import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import QRImage from "../../icons/qr-code.png";

const AdminQRScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);
  const hasScannedRef = useRef(false);

  const [scannedData, setScannedData] = useState("Find a code to scan");
  const [studentData, setStudentData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [mode, setMode] = useState("check-in");
    useEffect(() => {
        // Reset scanned info when mode changes
        setStudentData(null);
        setScannedData("Find a code to scan");
        hasScannedRef.current = false;
    }, [mode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      hasScannedRef.current = false;
      setScannedData("Find a code to scan");
      setStudentData(null);

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
      console.log("🔌 Camera stopped");
    }
    setIsScanning(false);
  };

  const updateStudentStatus = async (uid) => {
    try {
      const studentRef = doc(db, "studentRegistrations", uid);
      const studentSnap = await getDoc(studentRef);
      if (!studentSnap.exists()) {
        console.error("❌ Student not found:", uid);
        return;
      }

      const student = studentSnap.data();
      const timestamp = new Date().toISOString();
      const update = {};

      if (mode === "check-in") {
        if (update.checkinStatus === false) 
            update.checkinTimestamp = timestamp; // only set if not already checked in (the first time checkin)
        update.checkinStatus = true;
        update.checkoutStatus = false;
      } else if (mode === "check-out") {
        update.checkoutStatus = true;
        update.checkoutTimestamp = timestamp;
      } else if (mode === "receive-reward") {
        update.receivedReward = true;
        update.receivedRewardTimestamp = timestamp;
      }

      await updateDoc(studentRef, update);
      console.log(`✅ ${mode} updated for student ${uid}`);

      setStudentData({ ...student, ...update });
    } catch (err) {
      console.error("🔥 Failed to update student status:", err);
    }
  };

  const startScanningLoop = () => {
    scanIntervalRef.current = setInterval(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || video.videoWidth === 0 || video.videoHeight === 0) return;

      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code && !hasScannedRef.current) {
        console.log("✅ QR Code scanned:", code.data);
        hasScannedRef.current = true;
        setScannedData(code.data);
        stopCamera();
        updateStudentStatus(code.data);
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      stopCamera();
      console.log("🧹 AdminQRScanner unmounted");
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
      {/* Scan Buttons */}
      {!isScanning && (
        <button
          onClick={startCamera}
          className="bg-green-800 text-white px-4 py-2 rounded"
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
      {/* Mode Selector */}
      <div className="flex gap-4 mb-4">
        {["check-in", "check-out", "receive-reward"].map((option) => (
          <button
            key={option}
            onClick={() => setMode(option)}
            className={`px-4 py-2 rounded font-semibold ${
              mode === option
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {option.replace("-", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {/* Student Info */}
      {studentData && (
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-2">Student Information</h2>
          <p className="text-gray-700"><b>Name:</b> {studentData.displayName}</p>
          <p className="text-gray-700"><b>Major:</b> {studentData.major}</p>
          <p className="text-gray-700"><b>Email:</b> {studentData.email}</p>
          <p className="text-gray-700"><b>Intake:</b> {studentData.intake}</p>
          <p className="text-gray-700"><b>Status Updated:</b> {mode.replace("-", " ")}</p>
        </div>
      )}


      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default AdminQRScanner;
