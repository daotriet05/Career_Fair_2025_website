import { useState } from "react";
import BoardingPass from "./DashboardComponents/BoardingPass";
import QRScanner from "./DashboardComponents/QRScanner";
import dashboardBanner from "../images/dashboard_banner.png";


function Dashboard() {
    const [tab, setTab] = useState("boarding");
  
    return (
        <>
            <div className="min-h-screen bg-white p-6 pt-28 font-sans flex flex-col items-center">
                {/* Banner Image */}
                <img
                src={dashboardBanner} // 🔁 adjust path to match your image file (e.g., "location.png" or similar)
                alt="VGU to Career"
                className="w-full max-w-md mb-6"
                />
        
                {/* Tab Buttons */}
                <div className="flex space-x-4 mb-8">
                <button
                    className={`border-2 rounded-lg px-4 py-2 font-semibold ${
                    tab === "boarding"
                        ? "border-yellow-400 text-yellow-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => setTab("boarding")}
                >
                    Your Boarding Pass
                </button>
                <button
                    className={`border-2 rounded-lg px-4 py-2 font-semibold ${
                    tab === "scanner"
                        ? "border-yellow-400 text-yellow-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => setTab("scanner")}
                >
                    QR Code Scanner
                </button>
                </div>
        
                {/* Main Content */}
                <div className="w-full max-w-5xl">
                {tab === "boarding" ? <BoardingPass /> : <QRScanner />}
                </div>
            </div>
        </>
      
    );
  }
  
  export default Dashboard;
