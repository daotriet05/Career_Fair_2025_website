import { useEffect, useState } from "react";
import BoardingPass from "./DashboardComponents/BoardingPass";
import QRScanner from "./DashboardComponents/QRScanner";
import Analysis from "./DashboardComponents/Analysis";
import dashboardBanner from "../images/dashboard_banner.png";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";

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

// const userData = {
//     displayName : "DAO HOANG MINH TRIET",
//     role : "Student",
//     boothCollected: {
//         'TTI' : false,
//         'FPT' : false,
//         'Netcompany' : true,
//     },
//     numCode: "1234567890",
//     checkinStatus: false, // when checkinStatus is activated, set checkoutStatus to false (for cases when users re-checkin)
//     checkoutStatus: false,
//     CV_link: "https://drive.google.com/file/d/1Um8irhxixuR6jvbCO7Dvp1_AMQYKPsGU4zxirNEWJr0/edit?usp=drivesdk",
//     linkedIn_link: "https://www.linkedin.com/in/dao-hoang-minh-triet-1234567890",
// }

class User {
    constructor(uid) {
      this.uid = uid || auth.currentUser?.uid;
      this.ref = doc(db, "studentRegistrations", this.uid);
    }
  
    async getUserData() {
      try {
        const snap = await getDoc(this.ref);
        if (!snap.exists()) throw new Error("No user data found.");
        return snap.data();
      } catch (error) {
        console.error("❌ Failed to get user data:", error);
        throw error;
      }
    }

    async updateUserData(updates) {
      try {
        await updateDoc(this.ref, updates);
        console.log("✅ User data updated.");
      } catch (error) {
        console.error("Failed to update user data:", error);
        throw error;
      }
    }
  
    async markBoothCollected(boothName) {
      try {
        const data = await this.getUserData();
        const boothCollected = {
          ...(data.boothCollected || {}),
          [boothName]: true,
        };
        await this.updateUserData({ boothCollected });
      } catch (error) {
        console.error("Failed to mark booth:", error);
      }
    }
}

function Dashboard() {
    const [tab, setTab] = useState("boarding");
    const [userData, setUserData] = useState(null); // Initialize with userData
    const [userObj, setUserObj] = useState(null); // Initialize with userObj

    useEffect(() => {
        const fetchData = async () => {
          const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
              const user = new User(firebaseUser.uid); // 👈 pass UID directly
              setUserObj(user);
              const data = await user.getUserData();
              setUserData(data);
              setTab(data.role === "Student" ? "boarding" : "analysis");
            }
          });
      
          return () => unsubscribe();
        };
      
        fetchData();
    }, []);
      

    const isStudent = userData?.role === "Student";

    const handleCollect = async (booth) => {
        await userObj.markBoothCollected(booth);
        const updatedData = await userObj.getUserData();
        setUserData(updatedData);
    };

    return (
        <>
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
                    {tab === "scanner" && <QRScanner onScan={handleCollect} />}
                    {tab === "boarding" && isStudent && <BoardingPass data={userData} />}
                    {tab === "analysis" && !isStudent && <Analysis data={userData} />}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
