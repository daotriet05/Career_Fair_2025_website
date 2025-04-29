import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const VolunteerTaskManagement = () => {
  const [tasksByTime, setTasksByTime] = useState({});

  const fetchTasks = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "volunteerManagement"));
      const data = {};

      querySnapshot.forEach((docSnap) => {
        const time = docSnap.id;
        const volunteers = docSnap.data();

        const tasks = [];

        for (const [code, task] of Object.entries(volunteers)) {
          tasks.push({
            code: code,
            name: task.Name,
            position: task.Position,
            describeTask: task["Describe Task"],
            change: task.Change,
            status: task.Status,
            reports: Array.isArray(task.Reports) ? task.Reports : [],
          });
        }

        // Sort tasks inside each block
        tasks.sort((a, b) => {
          const aNum = parseInt(a.code.replace(/\D/g, ""), 10);
          const bNum = parseInt(b.code.replace(/\D/g, ""), 10);
          return aNum - bNum;
        });

        data[time] = tasks;
      });

      setTasksByTime(data);
    } catch (error) {
      console.error("Error fetching volunteer tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="flex flex-col items-center px-4 py-8">
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
        .map((time) => (
          <div key={time} className="mb-12 p-6 border rounded-lg shadow-lg">
            {/* Time Header */}
            <div className="bg-gray-800 text-white py-2 px-6 rounded-full mb-6 font-bold text-lg inline-block">
              {time}
            </div>

            {/* Table */}
            <table className="table-fixed text-left">
              <thead>
                <tr>
                  <th className="p-2 w-[6rem]">Code</th>
                  <th className="p-2 w-[10rem]">Name</th>
                  <th className="p-2 w-[12rem]">Position</th>
                  <th className="p-2 w-[16rem]">Describe Task</th>
                  <th className="p-2 w-[10rem]">Change</th>
                  <th className="p-2 w-[8rem]">Status</th>
                  <th className="p-2 w-[18rem]">Reports</th>
                </tr>
              </thead>
              <tbody>
                {tasksByTime[time].map((task, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-100 transition"
                  >
                    <td className="p-2 break-words">{task.code}</td>
                    <td className="p-2 break-words">{task.name}</td>
                    <td className="p-2 break-words">{task.position}</td>
                    <td className="p-2 break-words">{task.describeTask}</td>
                    <td className="p-2 break-words">{task.change}</td>
                    <td className="p-2">
                      {task.status ? (
                        <span className="text-green-600 font-bold">Done</span>
                      ) : (
                        <span className="text-red-600 font-bold">Not yet</span>
                      )}
                    </td>
                    <td className="p-2 break-words">
                      {task.reports.length > 0 ? (
                        task.reports.map((report, idx) => (
                          <div key={idx}>
                            <b>{report.time?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</b>: {report.issue}
                          </div>
                        ))
                      ) : (
                        ":"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};

export default VolunteerTaskManagement;
