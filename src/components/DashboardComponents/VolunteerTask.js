import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Timestamp } from "firebase/firestore";

const VolunteerTask = ({ data, refetchUserData }) => {
  const [tasksByTime, setTasksByTime] = useState({});
  const [reporting, setReporting] = useState({});
  const [reportTexts, setReportTexts] = useState({});
  const identifyCode = data?.identifyVolunteerCode;

  const fetchTasks = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "volunteerManagement"));
      const dataByTime = {};

      querySnapshot.forEach((docSnap) => {
        const time = docSnap.id;
        const volunteers = docSnap.data();

        if (volunteers[identifyCode]) {
          dataByTime[time] = {
            ...volunteers[identifyCode],
            code: identifyCode,
            firestoreId: docSnap.id,
          };
        }
      });

      setTasksByTime(dataByTime);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [identifyCode]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = async (time) => {
    try {
      const taskDoc = doc(db, "volunteerManagement", time);
      await updateDoc(taskDoc, {
        [`${identifyCode}.Status`]: true,
      });
      console.log("✅ Status updated to true");
      fetchTasks(); // 🔥 Auto refresh after submitting
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleStartReport = (time) => {
    setReporting((prev) => ({ ...prev, [time]: true }));
  };

  const handleCancelReport = (time) => {
    setReporting((prev) => ({ ...prev, [time]: false }));
    setReportTexts((prev) => ({ ...prev, [time]: "" }));
  };

  const handleSendReport = async (time) => {
    const reportText = reportTexts[time]?.trim();
    if (!reportText) return;

    try {
      const taskDoc = doc(db, "volunteerManagement", time);
      const newReport = {
        time: Timestamp.now(),
        issue: reportText,
      };
      await updateDoc(taskDoc, {
        [`${identifyCode}.Reports`]: arrayUnion(newReport),
      });

      console.log("✅ Report sent.");
      setReporting((prev) => ({ ...prev, [time]: false }));
      setReportTexts((prev) => ({ ...prev, [time]: "" }));
      fetchTasks(); // 🔥 Auto refresh after sending report
    } catch (error) {
      console.error("Error sending report:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center mb-6">
        {/* 🔁 Refresh Button */}
        <div className="mb-8">
            <button
            onClick={fetchTasks}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-md transition duration-200"
            >
            Refresh Data
            </button>
        </div>
        </div>

      {Object.keys(tasksByTime)
        .sort((a, b) => {
          const [aHour, aMinute] = a.split(":").map(Number);
          const [bHour, bMinute] = b.split(":").map(Number);
          return aHour !== bHour ? aHour - bHour : aMinute - bMinute;
        })
        .map((time) => {
          const task = tasksByTime[time];
          return (
            <div
              key={time}
              className="mb-8 p-6 border rounded-2xl shadow-lg flex flex-col items-center w-full max-w-lg mx-auto"
            >
              {/* Time */}
              <div className="bg-gray-800 text-white py-2 px-6 rounded-full mb-6 font-bold text-lg">
                {time}
              </div>

              {/* Task Info */}
              <table className="w-full table-fixed mb-6">
                <thead>
                  <tr>
                    <th className="px-1 py-2 text-sm w-[5rem]">Code</th>
                    <th className="px-1 py-2 text-sm w-[8rem]">Position</th>
                    <th className="px-1 py-2 text-sm w-[10rem]">Describe Task</th>
                    <th className="px-1 py-2 text-sm w-[6rem]">Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-1 py-2 break-words break-normal">{task.code}</td>
                    <td className="px-1 py-2 break-words break-normal">{task.Position}</td>
                    <td className="px-1 py-2 break-words break-normal">{task["Describe Task"]}</td>
                    <td className="px-1 py-2 break-words break-normal">{task.Change}</td>
                  </tr>
                </tbody>
              </table>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                {!task.Status ? (
                  <button
                    onClick={() => handleSubmit(time)}
                    className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className="border-2 border-green-600 text-green-600 font-bold py-2 px-6 rounded-lg cursor-default"
                    disabled
                  >
                    Checked
                  </button>
                )}

                {!reporting[time] ? (
                  <button
                    onClick={() => handleStartReport(time)}
                    className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600"
                  >
                    Report
                  </button>
                ) : (
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => handleSendReport(time)}
                      className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700"
                    >
                      Send
                    </button>
                    <button
                      onClick={() => handleCancelReport(time)}
                      className="bg-red-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Report Input */}
              {reporting[time] && (
                <div className="mt-4 w-full flex justify-center">
                  <input
                    type="text"
                    placeholder="Fill your issue"
                    value={reportTexts[time] || ""}
                    onChange={(e) =>
                      setReportTexts((prev) => ({ ...prev, [time]: e.target.value }))
                    }
                    className="border-2 w-full max-w-xs rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              )}

              {/* Past Reports */}
              {task.Reports && task.Reports.length > 0 && (
                <div className="mt-6 w-full max-w-xs text-left break-words">
                  <h2 className="text-lg font-bold mb-2">Previous Reports:</h2>
                  {task.Reports.map((report, idx) => (
                    <div key={idx} className="mb-2">
                      {report.time ? (
                        <span className="font-semibold">
                          {report.time?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      ) : (
                        <span className="font-semibold">Unknown time</span>
                      )}
                      : {report.issue}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default VolunteerTask;
