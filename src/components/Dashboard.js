import { useEffect, useState } from "react";
import BoardingPass from "./DashboardComponents/BoardingPass";
import QRScanner from "./DashboardComponents/QRScanner";
import QRCodeDisplay from "./DashboardComponents/QRCodeDisplay";
import Analysis from "./DashboardComponents/Analysis";
import VolunteerTask from "./DashboardComponents/VolunteerTask";
import VolunteerTaskManagement from "./DashboardComponents/VolunteerTaskManagement";
import dashboardBanner from "../images/dashboard_banner.png";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";

// Helper class to fetch and update user
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
        await setDoc(this.ref, updatedData);
        console.log("✅ Data updated.");
    }
}

// Helper functions
function getInitialTab(role) {
    if (role === "Student") return "boarding";
    if (role === "Volunteer") return "volunteerTask";
    if (role === "Organizer") return "volunteerManagement";
    return "analysis"; // Company or default
}

function getFirstTabName(role) {
    if (role === "Student") return "Your Boarding Pass";
    if (role === "Volunteer") return "Volunteer Task";
    if (role === "Organizer") return "Volunteer Management";
    return "Analysis"; // Company
}

function Dashboard() {
    const [tab, setTab] = useState("boarding");
    const [userData, setUserData] = useState(null);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
                if (firebaseUser) {
                    const user = new User(firebaseUser.uid);
                    setUserObj(user);
                    const data = await user.getUserData();
                    setUserData(data);
                    setTab(getInitialTab(data.role));
                }
            });

            return () => unsubscribe();
        };

        fetchData();
    }, []);

    const refetchUserData = async () => {
        if (userObj) {
            const data = await userObj.getUserData();
            setUserData(data);
        }
    };

    const updateCVLink = async (link) => {
        try {
            if (!userObj) return;
            const data = await userObj.getUserData();
            data.CV_link = link;
            await userObj.updateUserData(data);
            setUserData(data);
            console.log("✅ CV link updated:", link);
        } catch (error) {
            console.error("❌ Error updating CV link:", error);
        }
    };

    const updateLinkedInLink = async (link) => {
        try {
            if (!userObj) return;
            const data = await userObj.getUserData();
            data.linkedin_link = link;
            await userObj.updateUserData(data);
            setUserData(data);
            console.log("✅ LinkedIn link updated:", link);
        } catch (error) {
            console.error("❌ Error updating LinkedIn link:", error);
        }
    };

    const updateBoothCollected = async (boothName, uid) => {
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

            if (!previousBoothStatus) {
                setUserData(userObj.getUserData());
                userData.studentAnalysis[studentData.major] += 1;
                setUserData(userData);
                userObj.updateUserData(userData);
                console.log("Student analysis updated:", userData.studentAnalysis);
            }

            await updateDoc(studentRef, { boothCollected });
            console.log(`Booth ${boothName} marked as collected for student ${uid}.`);
        } catch (error) {
            console.error("Error updating booth collected status:", error);
        }
    };

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
    };

    return (
        <>
            <div className="min-h-screen bg-white p-6 pt-28 font-sans flex flex-col items-center">
                <img src={dashboardBanner} alt="VGU to Career" className="w-full max-w-md mb-6" />

                {/* Tab Switcher */}
                <div className="flex space-x-4 mb-8">
                    <button
                        className={`border-2 rounded-lg px-4 py-2 font-semibold ${
                            tab === getInitialTab(userData?.role)
                                ? "border-yellow-400 text-yellow-500"
                                : "border-gray-300"
                        }`}
                        onClick={() => setTab(getInitialTab(userData?.role))}
                    >
                        {getFirstTabName(userData?.role)}
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

                {/* Tab Content */}
                <div className="w-full max-w-5xl">
                    {/* Second tab: QR Code Scanner */}
                    {tab === "scanner" && (
                        userData?.role === "Company" ? (
                            <QRScanner 
                                companyName={userData?.displayName} 
                                updateBoothCollected={updateBoothCollected} 
                                getStudentData={getStudentData} 
                            />
                        ) : (
                            <QRCodeDisplay 
                                userID={userObj?.uid} 
                                data={userData} 
                                updateCVLink={updateCVLink} 
                                updateLinkedInLink={updateLinkedInLink} 
                            />
                        )
                    )}

                    {/* First tab: depends on role */}
                    {tab === "boarding" && userData?.role === "Student" && (
                        <BoardingPass 
                            data={userData} 
                            refetchUserData={refetchUserData} 
                        />
                    )}
                    {tab === "analysis" && userData?.role === "Company" && (
                        <Analysis 
                            data={userData} 
                            refetchUserData={refetchUserData} 
                        />
                    )}
                    {tab === "volunteerTask" && userData?.role === "Volunteer" && (
                        <VolunteerTask 
                            data={userData} 
                            refetchUserData={refetchUserData} 
                        />
                    )}
                    {tab === "volunteerManagement" && userData?.role === "Organizer" && (
                        <VolunteerTaskManagement 
                            data={userData} 
                            refetchUserData={refetchUserData} 
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
