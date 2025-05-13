import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import QRImage from "../../icons/qr-code.png";

// Fetch UID by ticketCode
const getUIDByTicketCode = async (ticketCode) => {
    const snapshot = await getDocs(collection(db, "studentRegistrations"));
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      if (data.ticketCode === ticketCode) {
        return docSnap.id; // UID = document ID
      }
    }
    return null;
};

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
	const [giveMaxRewards, setGiveMaxRewards] = useState(true);

	useEffect(() => {
		setStudentData(null);
		setScannedData("Find a code to scan");
		hasScannedRef.current = false;
	}, [mode]);

	const startCamera = async () => {
		try {
		const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
		streamRef.current = stream;
		hasScannedRef.current = false;
		setScannedData("Find a code to scan");
		setStudentData(null);

		const video = videoRef.current;
		if (video) {
			video.srcObject = stream;
			video.onloadedmetadata = () => {
			video.play().then(() => {
				setIsScanning(true);
				startScanningLoop();
			});
			};
		}
		} catch (err) {
		console.error("Camera access failed:", err);
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
		}
		setIsScanning(false);
	};

	const updateStudentStatus = async (uid) => {
		try {
		const studentRef = doc(db, "studentRegistrations", uid);
		const studentSnap = await getDoc(studentRef);
		if (!studentSnap.exists()) return;

		const student = studentSnap.data();
		const timestamp = new Date().toISOString();
		const update = {};
		let newReceived = student.receivedRewards || {};

		if (mode === "check-in") {
			if (!student.checkinStatus) update.checkinTimestamp = timestamp;
			update.checkinStatus = true;
			update.checkoutStatus = false;
		} else if (mode === "check-out") {
			update.checkoutStatus = true;
			update.checkoutTimestamp = timestamp;
		} else if (mode === "receive-reward") {
			const boothData = student.boothCollected || {};
			const boothCount = Object.values(boothData).filter(Boolean).length;
			const thresholds = [5, 8, 13, 18];
			const received = { ...(student.receivedRewards || {}) };

			thresholds.forEach((t) => {
			if (giveMaxRewards && boothCount >= t && !received[t]) {
				received[t] = true;
			}
			});

			newReceived = received;
			update.receivedRewards = newReceived;
			update.receivedReward = true;
			update.receivedRewardTimestamp = timestamp;
		} else if (mode === "photobooth") {
			update.tookPhotoBooth = true;
		}

		await updateDoc(studentRef, update);
		setStudentData({
			...student,
			updatedRewards: newReceived,
		});
		} catch (err) {
		console.error("Failed to update student status:", err);
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
			hasScannedRef.current = true;
			setScannedData(code.data);
            console.log("🔍 Scanned data:", code.data);
            
			stopCamera();
			(async () => {
                const uid = await getUIDByTicketCode(code.data);
                console.log("🔍 UID found:", uid);
                updateStudentStatus(uid);
            })();
		}
		}, 100);
	};

	useEffect(() => {
		return () => stopCamera();
	}, []);

	return (
		<div className="flex flex-col items-center gap-4 shadow-lg p-4 rounded-lg bg-gray-100 w-1/2 mx-auto">
		<video
			ref={videoRef}
			className="w-72 h-72 md:w-96 md:h-96 border-4 border-black rounded-xl"
			style={{
			objectFit: "cover",
			display: isScanning ? "block" : "block",
			backgroundImage: `url(${QRImage})`,
			backgroundSize: "80%",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			}}
			muted
			playsInline
		/>

		{!isScanning && (
			<button onClick={startCamera} className="bg-green-800 text-white px-4 py-2 rounded">
			Start Scan
			</button>
		)}
		{isScanning && (
			<button onClick={stopCamera} className="bg-red-600 text-white px-4 py-2 rounded">
			Stop Scan
			</button>
		)}

		<div className="flex gap-4 mb-4">
			{["check-in", "check-out", "receive-reward", "photobooth"].map((option) => (
			<button
				key={option}
				onClick={() => setMode(option)}
				className={`px-4 py-2 rounded font-semibold ${
				mode === option ? "bg-yellow-500 text-white" : "bg-gray-200 hover:bg-gray-300"
				}`}
			>
				{option.replace("-", " ").toUpperCase()}
			</button>
			))}
		</div>

		{mode === "receive-reward" && (
			<label className="text-sm text-gray-800">
			<input
				type="checkbox"
				checked={giveMaxRewards}
				onChange={() => setGiveMaxRewards(!giveMaxRewards)}
				className="mr-2"
			/>
			Give all eligible rewards up to booth count
			</label>
		)}

		{studentData && (
			<div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md text-center">
			<h2 className="text-xl font-semibold mb-2">Student Information</h2>
			<p className="text-gray-700"><b>Name:</b> {studentData.displayName}</p>
			<p className="text-gray-700"><b>Major:</b> {studentData.major}</p>
			<p className="text-gray-700"><b>Email:</b> {studentData.email}</p>
			<p className="text-gray-700"><b>Intake:</b> {studentData.intake}</p>
			<p className="text-gray-700"><b>Status Updated:</b> {mode.replace("-", " ")}</p>

			{mode === "photobooth" && (
				<p className="text-blue-700 font-semibold mt-2">📸 Photo Booth marked as completed!</p>
			)}

			{mode === "receive-reward" && (
				<>
				<p className="text-gray-700"><b>Booths Collected:</b> {
					studentData.boothCollected
					? Object.values(studentData.boothCollected).filter(Boolean).length
					: 0
				}</p>

				<div className="mt-4 text-left">
					<h4 className="text-sm font-semibold mb-1">Previous Reward Claim Status:</h4>
					<ul className="ml-4 text-sm">
					{[5, 8, 13, 18].map((b) => (
						<li key={b} className={!!Boolean(studentData.receivedRewards && studentData.receivedRewards[b] === true) ? "text-green-600" : "text-gray-500"}>
						{b} booth reward: {studentData.receivedRewards && studentData.receivedRewards[b] === true ? "✅ Already received" : "❌ Not yet received"}
						</li>
					))}
					</ul>

					<h4 className="text-sm font-semibold mt-4 mb-1">Summary:</h4>
					{studentData.receivedRewards && Object.values(studentData.receivedRewards).some(val => val) ? (
					<p className="text-green-700 font-semibold mb-2">✅ Student has claimed at least one milestone reward</p>
					) : (
					<p className="text-red-700 font-semibold mb-2">❌ Student has not claimed any rewards yet</p>
					)}

					<h4 className="text-sm font-semibold mt-4 mb-1">Eligible to Receive Now:</h4>
					<ul className="ml-4 text-sm">
					{[5, 8, 13, 18].map((b) => {
						const boothCount = studentData.boothCollected
						? Object.values(studentData.boothCollected).filter(Boolean).length
						: 0;
						const hasBooth = boothCount >= b;
						const claimed = Boolean(studentData.receivedRewards && studentData.receivedRewards[b] === true);
						return (
						<li
							key={b}
							className={hasBooth && !claimed ? "text-yellow-600 font-semibold" : "text-gray-400"}
						>
							{b} booths: {hasBooth ? (claimed ? "Already received ✅" : "Eligible to receive 🎁") : "Not enough booths"}
						</li>
						);
					})}
					</ul>
				</div>
				</>
			)}
			</div>
		)}

		<canvas ref={canvasRef} style={{ display: "none" }} />
		</div>

	);};

export default AdminQRScanner;
