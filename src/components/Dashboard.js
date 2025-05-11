import { useEffect, useState } from "react";
import BoardingPass from "./DashboardComponents/BoardingPass";
import QRScanner from "./DashboardComponents/QRScanner";
import QRCodeDisplay from "./DashboardComponents/QRCodeDisplay";
import Analysis from "./DashboardComponents/Analysis";
import VolunteerTask from "./DashboardComponents/VolunteerTask";
import VolunteerTaskManagement from "./DashboardComponents/VolunteerTaskManagement";
import AdminDisplay from "./DashboardComponents/AdminDisplay";
import AdminQRScanner from "./DashboardComponents/AdminQRScanner";
import dashboardBanner from "../images/dashboard_banner.png";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "../App.css";

import axios from "axios";

class User {
    constructor(uid) {
        if (!uid) throw new Error("UID is required");
        this.uid = uid;
        this.ref = doc(db, "studentRegistrations", uid);
    }

    async getUserData() {
        const snap = await getDoc(this.ref);
        if (!snap.exists()) {
            console.warn("⚠️ No user data found for UID:", this.uid);
            return null;
        }
        return snap.data();
    }

    async updateUserData(updatedData) {
        await setDoc(this.ref, updatedData);
        console.log("✅ Data updated.");
    }
}

function getInitialTab(role) {
    if (role === "Student") return "boarding";
    if (role === "Organizer") return "volunteerTask";
    if (role === "Head") return "volunteerManagement";
    if (role === "Admin") return "adminDisplay";
    return "analysis"; // Company
}

function getFirstTabName(role) {
    if (role === "Student") return "Your Boarding Pass";
    if (role === "Organizer") return "Volunteer Task";
    if (role === "Head") return "Volunteer Management";
    if (role === "Admin") return "Admin Display";
    return "Analysis"; // Company
}

function Dashboard() {
    const [tab, setTab] = useState("boarding");
    const [userData, setUserData] = useState(null);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                // if (!firebaseUser.emailVerified) {
                //     alert("⚠️ Please verify your email before accessing the dashboard.");
                //     return;
                // }

                const user = new User(firebaseUser.uid);
                setUserObj(user);
                const data = await user.getUserData();
                if (!data) {
                    alert("⚠️ Your profile has not been set up yet. Please contact an admin.");
                    return;
                }
                setUserData(data);
                setTab(getInitialTab(data.role));
            }
        });

        return () => unsubscribe();
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

    const updateBoothCollected = async (boothName, studentUID) => {
        try {
            // Step 1: Fetch student data
            const studentRef = doc(db, "studentRegistrations", studentUID);
            const studentSnap = await getDoc(studentRef);
            if (!studentSnap.exists()) {
                console.error("❌ Student not found:", studentUID);
                return;
            }
    
            const studentData = studentSnap.data();
            console.log("📚 GOT Student data:", studentData);
    
            // Step 2: Update boothCollected for the student
            const updatedBoothCollected = {
                ...(studentData.boothCollected || {}),
                [boothName]: true,
            };
            await updateDoc(studentRef, { boothCollected: updatedBoothCollected });
            console.log(`✅ Booth ${boothName} marked as collected for student ${studentUID}.`);
    
            // Step 3: Get company displayName (used as adminStorage doc name)
            if (!userObj || !userData?.displayName) {
                console.error("❌ Company identity (userObj/displayName) missing.");
                return;
            }
            const companyDisplayName = userData.displayName;
    
            // Step 4: Get scannedStudents map from adminStorage
            const adminRef = doc(db, "adminStorage", companyDisplayName);
            const adminSnap = await getDoc(adminRef);
    
            let scannedStudents = {};
            if (adminSnap.exists()) {
                scannedStudents = adminSnap.data().scannedStudents || {};
            }

            ///////////////////////////////////////
            // ✅ Post to booth tracking API
            const ticketCode = studentData.ticketCode;
            const boothCount = Object.values(updatedBoothCollected).filter(Boolean).length;

           
            await axios.post(
                "https://ticket-ud5mqzde6a-uc.a.run.app/api/boothVisited",
                {
                    code: ticketCode,
                    boothVisited: boothCount,
                },
                {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "CFIED25@vgu"
                }
                }
            );

            console.log("🎯 External boothVisited API updated.");

            //////////////////////////////////////
    
            // Step 5: Check if student already scanned
            if (scannedStudents[studentUID]) {
                console.log("⚠️ Student already scanned. Skipping analysis update.");
                return;
            }
    
            // Step 6: Add new student to scannedStudents map
            scannedStudents[studentUID] = {
                displayName: studentData.displayName,
                email: studentData.email,
                major: studentData.major,
                intake: studentData.intake,
                CV_link: studentData.CV_link || null,
                linkedin_link: studentData.linkedin_link || null
            };
    
            await setDoc(adminRef, { scannedStudents });
            console.log("📥 New scanned student stored in adminStorage.");
    
            // Step 7: Update major/intake count in company data
            const companyData = await userObj.getUserData();
            const major = studentData.major;
            const intake = studentData.intake;
    
            const updatedAnalysisMajor = {
                ...companyData.studentAnalysisMajor,
                [major]: (companyData.studentAnalysisMajor?.[major] || 0) + 1,
            };
    
            const updatedAnalysisIntake = {
                ...companyData.studentAnalysisIntake,
                [intake]: (companyData.studentAnalysisIntake?.[intake] || 0) + 1,
            };
    
            const updatedCompanyData = {
                ...companyData,
                studentAnalysisMajor: updatedAnalysisMajor,
                studentAnalysisIntake: updatedAnalysisIntake
            };
    
            await userObj.updateUserData(updatedCompanyData);
            setUserData(updatedCompanyData);
            console.log("✅ Company analytics updated after new scan.");

            

        } catch (error) {
            console.error("🔥 Error in updateBoothCollected:", error);
        }
    };
    

    const getStudentData = async (uid) => {
        try {
            const studentRef = doc(db, "studentRegistrations", uid);
            const studentSnap = await getDoc(studentRef);

            if (!studentSnap.exists()) {
                console.error("Student not found:", uid);
                return null;
            }
            return studentSnap.data();
        } catch (error) {
            console.error("Error fetching student data:", error);
            return null;
        }
    };
function Text({ userData }) {
    const messages = [
        `Welcome ${userData?.role} to VGU Career Fair`,
        `Welcome ${userData?.displayName || "Admin"} to VGU Career Fair`,
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % messages.length);
        }, 10000); // change every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container">
            <span key={currentIndex} className="first">
                {messages[currentIndex]}
            </span>
        </div>
    );
}
      

    return (
        <div className="min-h-screen bg-white p-6 pt-28 font-sans flex flex-col items-center">
            <img src={dashboardBanner} alt="VGU to Career" className="w-full max-w-md mb-6" />
            {/* Use the Text component */}
            {userData && <Text userData={userData} />}
            <div className="flex space-x-4 mb-8 mx-auto">
            {/* Tab Switcher */}
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
                {tab === "scanner" && (
                    userData?.role === "Company" ? (
                        <QRScanner
                            companyName={userData?.displayName}
                            updateBoothCollected={updateBoothCollected}
                            getStudentData={getStudentData}
                        />
                    ) : userData?.role === "Admin" ? (
                        <AdminQRScanner />
                    ) : (
                        <QRCodeDisplay
                            ticketCode={userData?.ticketCode}
                            data={userData}
                            updateCVLink={updateCVLink}
                            updateLinkedInLink={updateLinkedInLink}
                        />
                    )
                )}

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
                {tab === "volunteerTask" && userData?.role === "Organizer" && (
                    <VolunteerTask
                        data={{ identifyVolunteerCode: userData.identificationNumCode  }}
                        refetchUserData={refetchUserData}
                    />
                )}
                

                {tab === "volunteerManagement" && userData?.role === "Head" && (
                    <VolunteerTaskManagement
                        data={userData}
                        refetchUserData={refetchUserData}
                    />
                )}
                {tab === "adminDisplay" && userData?.role === "Admin" && (
                    <AdminDisplay />
                )}
            </div>
        </div>
    );
}

export default Dashboard;