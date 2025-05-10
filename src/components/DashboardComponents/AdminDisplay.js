// AdminDisplay.js – Full Updated Version with Organizer Tasks
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const AdminDisplay = () => {
    const [adminData, setAdminData] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [currentStudents, setCurrentStudents] = useState([]);
    const [rewardedStudents, setRewardedStudents] = useState([]);
    const [organizerTasks, setOrganizerTasks] = useState({});

    const fetchAdminStorage = async () => {
        try {
        const querySnapshot = await getDocs(collection(db, "adminStorage"));
        const result = [];

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const scannedMap = data.scannedStudents || {};
            const students = Object.entries(scannedMap).map(([uid, details]) => ({
            uid,
            ...details
            }));

            result.push({
            company: docSnap.id,
            students,
            });
        });

        setAdminData(result);
        } catch (error) {
        console.error("❌ Error fetching adminStorage:", error);
        }
    };

    const fetchStudentStatuses = async () => {
        try {
        const snap = await getDocs(collection(db, "studentRegistrations"));
        const current = [];
        const rewarded = [];

        snap.forEach(docSnap => {
            const s = docSnap.data();
            if (s.checkinStatus && !s.checkoutStatus) {
            current.push({ displayName: s.displayName, email: s.email });
            }
            if (s.receivedReward || s.receivedRewards) {
            const timestamp = s.receivedRewardTimestamp;
            const formattedTime = timestamp
                ? new Date(timestamp).toLocaleString("en-GB", { timeZone: "Asia/Bangkok" })
                : "Unknown time";

            rewarded.push({
                displayName: s.displayName,
                email: s.email,
                timestamp: formattedTime,
                receivedRewards: s.receivedRewards || {}
            });
            }
        });

        setCurrentStudents(current);
        setRewardedStudents(rewarded);
        } catch (err) {
        console.error("❌ Error fetching student statuses:", err);
        }
    };

    const fetchOrganizerTasks = async () => {
        try {
        const querySnapshot = await getDocs(collection(db, "volunteerManagement"));
        const data = {};

        querySnapshot.forEach((docSnap) => {
            const teamData = docSnap.data();
            for (const [code, userData] of Object.entries(teamData)) {
            if (userData.RoleType === "Organizer") {
                data[code] = {
                name: userData.Name,
                tasks: userData.Tasks || [],
                };
            }
            }
        });

        const sortedEntries = Object.entries(data).sort(([aCode], [bCode]) => {
            const aPrefix = aCode.charAt(0);
            const bPrefix = bCode.charAt(0);
            if (aPrefix !== bPrefix) return aPrefix.localeCompare(bPrefix);
            const aNum = parseInt(aCode.slice(1), 10);
            const bNum = parseInt(bCode.slice(1), 10);
            return aNum - bNum;
        });

        const sortedData = Object.fromEntries(sortedEntries);
        setOrganizerTasks(sortedData);
        } catch (error) {
        console.error("❌ Error fetching organizer tasks:", error);
        }
    };

    const toggleDropdown = (key) => {
        setOpenDropdown(openDropdown === key ? null : key);
    };

    useEffect(() => {
        fetchAdminStorage();
        fetchStudentStatuses();
        fetchOrganizerTasks();
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Scanned Students by Company</h2>

        {adminData.map(({ company, students }) => (
            <div key={company} className="mb-6">
            <button
                onClick={() => toggleDropdown(company)}
                className="w-full text-left bg-yellow-100 hover:bg-yellow-200 text-black font-semibold px-4 py-2 rounded-lg shadow transition"
            >
                {company} ({students.length})
            </button>

            {openDropdown === company && (
                <ul className="mt-2 border border-gray-200 rounded-lg p-4 bg-gray-50">
                {students.map((s) => (
                    <li key={s.uid} className="text-sm text-gray-800 py-1">
                    <b>{s.displayName}</b> – <i>{s.email}</i>
                    </li>
                ))}
                </ul>
            )}
            </div>
        ))}

        <h2 className="text-xl font-bold mt-10 mb-4 text-center">Current Students Here</h2>
        <div className="mb-6">
            <button
            onClick={() => toggleDropdown("current")}
            className="w-full text-left bg-green-100 hover:bg-green-200 text-black font-semibold px-4 py-2 rounded-lg shadow transition"
            >
            Current Students Here ({currentStudents.length})
            </button>

            {openDropdown === "current" && (
            <ul className="mt-2 border border-gray-200 rounded-lg p-4 bg-gray-50">
                {currentStudents.map((s, idx) => (
                <li key={idx} className="text-sm text-gray-800 py-1">
                    <b>{s.displayName}</b> – <i>{s.email}</i>
                </li>
                ))}
            </ul>
            )}
        </div>

        <h2 className="text-xl font-bold mt-10 mb-4 text-center">Received Rewards Students</h2>
        <div className="mb-6">
            <button
            onClick={() => toggleDropdown("rewards")}
            className="w-full text-left bg-blue-100 hover:bg-blue-200 text-black font-semibold px-4 py-2 rounded-lg shadow transition"
            >
            Received Rewards Students ({rewardedStudents.length})
            </button>

            {openDropdown === "rewards" && (
            <ul className="mt-2 border border-gray-200 rounded-lg p-4 bg-gray-50">
                {rewardedStudents.map((s, idx) => (
                <li key={idx} className="text-sm text-gray-800 py-2 border-b">
                    <div><b>{s.displayName}</b> – <i>{s.email}</i></div>
                    <div className="text-xs text-gray-600">Rewarded: {s.timestamp}</div>

                    {s.receivedRewards && (
                    <ul className="mt-1 ml-4 text-xs">
                        {[5, 8, 13, 18].map((booth) => (
                        <li
                            key={booth}
                            className={s.receivedRewards[booth] ? "text-green-600" : "text-gray-400"}
                        >
                            {booth} booths: {s.receivedRewards[booth] ? "✅" : "❌"}
                        </li>
                        ))}
                    </ul>
                    )}
                </li>
                ))}
            </ul>
            )}
        </div>

        <h2 className="text-xl font-bold mt-10 mb-4 text-center">All Organizer Tasks</h2>
        <div className="mb-6">
            <button
            onClick={() => toggleDropdown("tasks")}
            className="w-full text-left bg-orange-100 hover:bg-orange-200 text-black font-semibold px-4 py-2 rounded-lg shadow transition"
            >
            Organizer Tasks ({Object.keys(organizerTasks).length})
            </button>

            {openDropdown === "tasks" && (
            <div className="mt-2 border border-gray-200 rounded-lg p-4 bg-white">
                {Object.entries(organizerTasks).map(([code, user]) => (
                <div key={code} className="mb-6 border-b pb-4">
                    <div className="font-semibold text-md mb-1 text-blue-700">{code} – {user.name}</div>
                    <table className="w-full table-fixed text-sm bg-gray-50">
                    <thead className="bg-gray-200">
                        <tr>
                        <th className="p-2 w-1/4 text-left">Role</th>
                        <th className="p-2 w-1/4 text-left">Time</th>
                        <th className="p-2 w-1/2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.tasks.map((task, idx) => (
                        <tr key={idx} className="border-t">
                            <td className="p-2 align-top">{task.Role}</td>
                            <td className="p-2 align-top">{task["Start-End"]}</td>
                            <td className="p-2 align-top">
                            {task.status ? (
                                <span className="text-green-600 font-semibold">Done</span>
                            ) : (
                                <span className="text-red-600 font-semibold">Not yet</span>
                            )}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                ))}
            </div>
            )}
        </div>
        </div>
    );
};

export default AdminDisplay;
