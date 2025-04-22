import { useEffect, useState } from "react";
import BoardingPass from "./DashboardComponents/BoardingPass";
import QRScanner from "./DashboardComponents/QRScanner";
import QRCodeDisplay from "./DashboardComponents/QRCodeDisplay";
import Analysis from "./DashboardComponents/Analysis";
import dashboardBanner from "../images/dashboard_banner.png";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { user } from "fontawesome";

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
        if (!uid) throw new Error("UID is required");
        this.uid = uid;
        this.ref = doc(db, "studentRegistrations", uid);
    }
  
    async getUserData() {
        const snap = await getDoc(this.ref);
        if (!snap.exists()) throw new Error("No user data found.");
        return snap.data();
    }

    async updateUserData(updatedData) {
        await setDoc(this.ref, updatedData); // overwrite the full document
        console.log("✅ Data updated.");
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

                    console.log("Adnovum booth collected:", data.boothCollected?.Adnovum);
                    setTab(data.role === "Student" ? "boarding" : "analysis");
                }
            });
            
            return () => unsubscribe();
        };
      
        fetchData();
        
        
    }, []);
      

    const isStudent = userData?.role === "Student";

    const refetchUserData = async () => {
        if (userObj) {
            const data = await userObj.getUserData();
            setUserData(data);
        }
    }

    const updateBoothCollected = async (boothName, uid) => { // update booth collected status to student
        try {
            const studentRef = doc(db, "studentRegistrations", uid);
            const studentSnap = await getDoc(studentRef);

            if (!studentSnap.exists()) {
                console.error("Student not found:", uid);
                return;
            }

            const studentData = studentSnap.data();

            const previousBoothStatus = studentData.boothCollected?.[boothName] ?? false;
            const boothCollected = {
                ...(studentData.boothCollected || {}),
                [boothName]: true,
            };

            // if the student has not collected the booth, update the status to true and increase the number of student visited by 1
            if (!previousBoothStatus) {
                setUserData(userObj.getUserData()); // refresh the state
                userData.studentAnalysis[studentData.major] += 1; // increase the number of students visited by 1
                setUserData(userData); // update the state
                userObj.updateUserData(userData); // update the data in firebase
                console.log("Student analysis updated:", userData.studentAnalysis);
            }

            await updateDoc(studentRef, { boothCollected });
            console.log(`Booth ${boothName} marked as collected for student ${uid}.`);
        } catch (error) {
            console.error("Error updating booth collected status:", error);
        }
    }

    const getStudentData = async (uid) => {
        try {
            console.log("Fetching student data for UID:", uid);
            
            const studentRef = doc(db, "studentRegistrations", uid);
            const studentSnap = await getDoc(studentRef);

            if (!studentSnap.exists()) {
                console.error("Student not found:", uid);
                return null;
            }
            console.log("Student data fetched:", studentSnap.data());
            
            return studentSnap.data();
        } catch (error) {
            console.error("Error fetching student data:", error);
            return null;
        }
    }

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
                    {tab === "scanner" && isStudent && <QRCodeDisplay userID={userObj.uid} />}
                    {tab === "scanner" && !isStudent && <QRScanner companyName={userData?.displayName} updateBoothCollected={updateBoothCollected} getStudentData={getStudentData}/>}
                    {tab === "boarding" && isStudent && <BoardingPass data={userData} refetchUserData={refetchUserData}/>}
                    {tab === "analysis" && !isStudent && <Analysis data={userData} refetchUserData={refetchUserData}/>}
                </div>


                {/* 
                    TEST BUTTON: CHANGE BOOTH COLLECTED STATUS ADNOVUM FROM FALSE TO TRUE
                    How to use:
                    - First check in firebase if the status of Adnovum is false (if not, change it false)
                    - Then click the button below to change it to true (open console to see the result)
                */}

                {/* {userObj && (
                    <button
                        onClick={async () => {
                        try {
                            const currentData = await userObj.getUserData();

                            console.log("Before:", currentData.boothCollected?.Adnovum); // 🔍

                            currentData.boothCollected = {
                            ...(currentData.boothCollected || {}),
                            Adnovum: true,
                            };

                            await userObj.updateUserData(currentData);

                            console.log("After:", currentData.boothCollected.Adnovum); // ✅

                            setUserData(currentData); // refresh state

                        } catch (err) {
                            console.error("❌ Test update failed:", err);
                        }
                        }}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Test: Set Adnovum to True
                    </button>
                )} */}
            </div>
        </>
    );
}

export default Dashboard;
