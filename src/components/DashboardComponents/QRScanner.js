import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

const QRScanner = ({ companyName, updateBoothCollected, getStudentData }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  const [scannedData, setScannedData] = useState("Find a code to scan");
  const [studentData, setStudentData] = useState(null); // State to hold student data
  const [isScanning, setIsScanning] = useState(false);

  // ✅ Manual function to start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
        setScannedData("Find a code to scan");
        setStudentData(null); // Reset student data when starting camera
      
        const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video
            .play()
            .then(() => {
              console.log("Camera is playing");
              setIsScanning(true);
              startScanningLoop();
            })
            .catch((err) => {
              console.error("video.play() failed:", err);
            });
        };
      }
    } catch (err) {
      console.error("Failed to access camera:", err);
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
        
        (async () => {
            const studentData = await getStudentData(code.data);
            if (studentData) {
              console.log("📚 Student name:", studentData.displayName);
              setStudentData(studentData);
        
              if (updateBoothCollected) {
                await updateBoothCollected(companyName, code.data);
              }
        
              stopCamera(); // ✅ safe to stop here
            }
          })();
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
      {/*<p className="text-lg font-semibold">{scannedData}</p>*/}
        {studentData && (
            <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md text-center">
                <h2 className="text-xl font-semibold mb-2">Student Information</h2>
                <p className="text-gray-700">
                    Name: <b>{studentData.displayName}</b>
                </p>
                <p className="text-gray-700">Major: {studentData.major}</p>
                {/* 📄 Buttons */}
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

      {!isScanning && (
        <button
          onClick={startCamera}
          className="bg-blue-600 text-white px-4 py-2 rounded"
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
