import { useState } from "react";
import BoardingPass from "./DashboardComponents/BoardingPass";
import QRScanner from "./DashboardComponents/QRScanner";
import Analysis from "./DashboardComponents/Analysis";
import dashboardBanner from "../images/dashboard_banner.png";
import HeaderBar from "./HeaderBar";

// Change userData as needed to test different roles
/*const userData = {
    displayName : "FPT Software",
    role : "Company",
    numberStudent : 0,
    studentAnalysis: {
        'CSE' : 280,
        'ECE' : 160,
        'MEN' : 100,
        'BCE' : 100,
        'BBA' : 60,
        'BFA' : 60,
        'ARC' : 50,
    },
};*/

const userData = {
    displayName : "DAO HOANG MINH TRIET",
    role : "Student",
    boothCollected: {
        'TTI' : false,
        'FPT' : false,
        'Netcompany' : true,
    },
    numCode: "1234567890",
    checkinStatus: false, // when checkinStatus is activated, set checkoutStatus to false (for cases when users re-checkin)
    checkoutStatus: false,
    CV_link: "https://drive.google.com/file/d/1Um8irhxixuR6jvbCO7Dvp1_AMQYKPsGU4zxirNEWJr0/edit?usp=drivesdk",
    linkedIn_link: "https://www.linkedin.com/in/dao-hoang-minh-triet-1234567890",
}

function Dashboard() {
    const [tab, setTab] = useState(userData.role === "Student" ? "boarding" : "analysis");

    const isStudent = userData.role === "Student";

    return (
        <>
            <HeaderBar />
            <div className="min-h-screen bg-white p-6 pt-28 font-sans flex flex-col items-center">
                <img src={dashboardBanner} alt="VGU to Career" className="w-full max-w-md mb-6" />

                {/* Tab Switcher */}
                <div className="flex space-x-4 mb-8">
                    <button
                        className={`border-2 rounded-lg px-4 py-2 font-semibold ${
                            tab === (isStudent ? "boarding" : "analysis")
                                ? "border-yellow-400 text-yellow-500"
                                : "border-gray-300"
                        }`}
                        onClick={() => setTab(isStudent ? "boarding" : "analysis")}
                    >
                        {isStudent ? "Your Boarding Pass" : "Analysis"}
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

                <div className="w-full max-w-5xl">
                    {tab === "scanner" && <QRScanner />}
                    {tab === "boarding" && isStudent && <BoardingPass data={userData} />}
                    {tab === "analysis" && !isStudent && <Analysis data={userData} />}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
