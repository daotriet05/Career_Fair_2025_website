// import { useEffect, useState, useCallback } from "react";
// import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
// import { db } from "../../firebase-config";
// import { Timestamp } from "firebase/firestore";

// const VolunteerTask = ({ data, refetchUserData }) => {
//   const [tasksByTime, setTasksByTime] = useState({});
//   const [reporting, setReporting] = useState({});
//   const [reportTexts, setReportTexts] = useState({});
//   const identifyCode = data?.identifyVolunteerCode;

//   const fetchTasks = useCallback(async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "volunteerManagement"));
//       const dataByTime = {};

//       querySnapshot.forEach((docSnap) => {
//         const time = docSnap.id;
//         const volunteers = docSnap.data();

//         if (volunteers[identifyCode]) {
//           dataByTime[time] = {
//             ...volunteers[identifyCode],
//             code: identifyCode,
//             firestoreId: docSnap.id,
//           };
//         }
//       });

//       setTasksByTime(dataByTime);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   }, [identifyCode]);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   const handleSubmit = async (time) => {
//     try {
//       const taskDoc = doc(db, "volunteerManagement", time);
//       await updateDoc(taskDoc, {
//         [`${identifyCode}.Status`]: true,
//       });
//       console.log("✅ Status updated to true");
//       fetchTasks(); // 🔥 Auto refresh after submitting
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const handleStartReport = (time) => {
//     setReporting((prev) => ({ ...prev, [time]: true }));
//   };

//   const handleCancelReport = (time) => {
//     setReporting((prev) => ({ ...prev, [time]: false }));
//     setReportTexts((prev) => ({ ...prev, [time]: "" }));
//   };

//   const handleSendReport = async (time) => {
//     const reportText = reportTexts[time]?.trim();
//     if (!reportText) return;

//     try {
//       const taskDoc = doc(db, "volunteerManagement", time);
//       const newReport = {
//         time: Timestamp.now(),
//         issue: reportText,
//       };
//       await updateDoc(taskDoc, {
//         [`${identifyCode}.Reports`]: arrayUnion(newReport),
//       });

//       console.log("✅ Report sent.");
//       setReporting((prev) => ({ ...prev, [time]: false }));
//       setReportTexts((prev) => ({ ...prev, [time]: "" }));
//       fetchTasks(); // 🔥 Auto refresh after sending report
//     } catch (error) {
//       console.error("Error sending report:", error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-0 sm:px-4 text-center">
//         <div className="flex justify-center items-center mb-6">
//         {/* 🔁 Refresh Button */}
//         <div className="mb-8">
//             <button
//             onClick={fetchTasks}
//             className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-md transition duration-200"
//             >
//             Refresh Data
//             </button>
//         </div>
//         </div>

//       {Object.keys(tasksByTime)
//         .sort((a, b) => {
//           const [aHour, aMinute] = a.split(":").map(Number);
//           const [bHour, bMinute] = b.split(":").map(Number);
//           return aHour !== bHour ? aHour - bHour : aMinute - bMinute;
//         })
//         .map((time) => {
//           const task = tasksByTime[time];
//           return (
//             <div
//                 key={time}
//                 className="mb-6 p-2 sm:p-4 border rounded-xl shadow flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto overflow-hidden"
//             >
//                 {/* Time */}
//                 <div className="bg-gray-800 text-white py-2 px-6 rounded-full mb-6 font-bold text-lg">
//                     {time}
//                 </div>

//                 {/* Task Info */}
//                 <div className="w-full overflow-x-auto">
//                     <table className="w-full table-fixed mb-6 text-sm">
//                     <thead>
//                         <tr>
//                         <th className="px-1 py-2 w-[25%] min-w-[4rem] break-words">Code</th>
//                         <th className="px-1 py-2 w-[25%] min-w-[6rem] break-words">Position</th>
//                         <th className="px-1 py-2 w-[30%] min-w-[8rem] break-words">Describe Task</th>
//                         <th className="px-1 py-2 w-[20%] min-w-[4rem] break-words">Change</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                         <td className="px-1 py-2 break-words whitespace-normal">{task.code}</td>
//                         <td className="px-1 py-2 break-words whitespace-normal">{task.Position}</td>
//                         <td className="px-1 py-2 break-words whitespace-normal">{task["Describe Task"]}</td>
//                         <td className="px-1 py-2 break-words whitespace-normal">{task.Change}</td>
//                         </tr>
//                     </tbody>
//                     </table>
//                 </div>

//               {/* Buttons */}
//               <div className="flex flex-wrap justify-center gap-4">
//                 {!task.Status ? (
//                   <button
//                     onClick={() => handleSubmit(time)}
//                     className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700"
//                   >
//                     Submit
//                   </button>
//                 ) : (
//                   <button
//                     className="border-2 border-green-600 text-green-600 font-bold py-2 px-6 rounded-lg cursor-default"
//                     disabled
//                   >
//                     Checked
//                   </button>
//                 )}

//                 {!reporting[time] ? (
//                   <button
//                     onClick={() => handleStartReport(time)}
//                     className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600"
//                   >
//                     Report
//                   </button>
//                 ) : (
//                   <div className="flex flex-wrap justify-center gap-2">
//                     <button
//                       onClick={() => handleSendReport(time)}
//                       className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700"
//                     >
//                       Send
//                     </button>
//                     <button
//                       onClick={() => handleCancelReport(time)}
//                       className="bg-red-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-500"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Report Input */}
//               {reporting[time] && (
//                 <div className="mt-4 w-full flex justify-center">
//                   <input
//                     type="text"
//                     placeholder="Fill your issue"
//                     value={reportTexts[time] || ""}
//                     onChange={(e) =>
//                       setReportTexts((prev) => ({ ...prev, [time]: e.target.value }))
//                     }
//                     className="border-2 w-full max-w-xs rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
//                   />
//                 </div>
//               )}

//               {/* Past Reports */}
//               {task.Reports && task.Reports.length > 0 && (
//                 <div className="mt-6 w-full max-w-xs text-left break-words">
//                   <h2 className="text-lg font-bold mb-2">Previous Reports:</h2>
//                   {task.Reports.map((report, idx) => (
//                     <div key={idx} className="mb-2">
//                       {report.time ? (
//                         <span className="font-semibold">
//                           {report.time?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </span>
//                       ) : (
//                         <span className="font-semibold">Unknown time</span>
//                       )}
//                       : {report.issue}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//     </div>
//   );
// };

// export default VolunteerTask;


import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "../../firebase-config";

const VolunteerTask = ({ data }) => {
  const [tasks, setTasks] = useState([]);
  const [reporting, setReporting] = useState({});
  const [reportTexts, setReportTexts] = useState({});

  const identifyCode = data?.identifyVolunteerCode;

  const fetchTasks = useCallback(async () => {
    if (!identifyCode) return;

    try {
      const querySnapshot = await getDocs(collection(db, "volunteerManagement"));
      const allTasks = [];

      querySnapshot.forEach((docSnap) => {
        const docId = docSnap.id;
        const teamData = docSnap.data();
        const user = teamData[identifyCode];

        if (user && Array.isArray(user.Tasks)) {
          user.Tasks.forEach((task, idx) => {
            allTasks.push({
              ...task,
              firestoreId: docId,
              taskIndex: idx,
              code: identifyCode,
            });
          });
        }
      });

      setTasks(allTasks);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
    }
  }, [identifyCode]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleStatusSubmit = async (firestoreId, index) => {
    const path = `${identifyCode}.Tasks.${index}.status`;
    try {
      await updateDoc(doc(db, "volunteerManagement", firestoreId), {
        [path]: true,
      });
      fetchTasks();
    } catch (error) {
      console.error("❌ Error updating status:", error);
    }
  };

  const handleSendReport = async (firestoreId, index) => {
    const issue = reportTexts[index]?.trim();
    if (!issue) return;

    const path = `${identifyCode}.Tasks.${index}.Reports`;
    const newReport = {
      time: Timestamp.now(),
      issue,
    };

    try {
      await updateDoc(doc(db, "volunteerManagement", firestoreId), {
        [path]: arrayUnion(newReport),
      });
      setReporting((prev) => ({ ...prev, [index]: false }));
      setReportTexts((prev) => ({ ...prev, [index]: "" }));
      fetchTasks();
    } catch (error) {
      console.error("❌ Error sending report:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 text-center">
      <button
        onClick={fetchTasks}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-md my-4"
      >
        Refresh My Tasks
      </button>

      {tasks.length === 0 && (
        <div className="text-gray-500 mt-4">No tasks found for your code: {identifyCode}</div>
      )}

      {tasks.map((task, idx) => (
        <div
          key={idx}
          className="mb-6 p-4 border rounded-xl shadow flex flex-col items-center w-full max-w-2xl mx-auto"
        >
          <div className="bg-gray-800 text-white py-2 px-6 rounded-full mb-4 font-bold text-lg">
            {task["Start-End"] || "Time not set"}
          </div>

          <table className="w-full table-fixed mb-4 text-sm">
            <thead>
              <tr>
                <th className="px-2 py-2 w-[25%]">Code</th>
                <th className="px-2 py-2 w-[25%]">Role</th>
                <th className="px-2 py-2 w-[25%]">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-2">{task.code}</td>
                <td className="px-2 py-2">{task.Role}</td>
                <td className="px-2 py-2">
                  {task.status ? (
                    <span className="text-green-600 font-bold">Done</span>
                  ) : (
                    <span className="text-red-600 font-bold">Not yet</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {!task.status && (
            <button
              onClick={() => handleStatusSubmit(task.firestoreId, task.taskIndex)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold mb-2"
            >
              Submit Task
            </button>
          )}

          {/* Report buttons */}
          {reporting[idx] ? (
            <div className="w-full flex flex-col items-center gap-2 mt-2">
              <input
                type="text"
                value={reportTexts[idx] || ""}
                onChange={(e) =>
                  setReportTexts((prev) => ({ ...prev, [idx]: e.target.value }))
                }
                placeholder="Describe your issue..."
                className="w-full max-w-md p-2 border rounded"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => handleSendReport(task.firestoreId, task.taskIndex)}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
                >
                  Send Report
                </button>
                <button
                  onClick={() => {
                    setReporting((prev) => ({ ...prev, [idx]: false }));
                    setReportTexts((prev) => ({ ...prev, [idx]: "" }));
                  }}
                  className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setReporting((prev) => ({ ...prev, [idx]: true }))}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold mt-2"
            >
              Report Issue
            </button>
          )}

          {/* Past Reports */}
          {Array.isArray(task.Reports) && task.Reports.length > 0 && (
            <div className="mt-4 w-full max-w-md text-left">
              <h3 className="font-bold mb-2">Previous Reports:</h3>
              {task.Reports.map((r, ridx) => (
                <div key={ridx} className="mb-1">
                  <b>
                    {r.time?.toDate?.().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }) || "Unknown"}
                  </b>
                  : {r.issue}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VolunteerTask;
