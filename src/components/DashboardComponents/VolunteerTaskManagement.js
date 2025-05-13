// import { useEffect, useState, useCallback } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebase-config";

// const VolunteerTaskManagement = () => {
//   const [organizerTasks, setOrganizerTasks] = useState({});

//   // Set your head team prefix here (e.g., "T" for Team Technical)
//   const headTeamPrefix = "T";

//   const fetchTasks = useCallback(async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "volunteerManagement"));
//       const data = {};

//       querySnapshot.forEach((docSnap) => {
//         const teamData = docSnap.data();

//         for (const [code, userData] of Object.entries(teamData)) {
//           const isOrganizer = userData.RoleType === "Organizer";
//           const isInMyTeam = code.startsWith(headTeamPrefix);

//           if (isOrganizer && isInMyTeam) {
//             data[code] = {
//               name: userData.Name,
//               tasks: userData.Tasks || [],
//             };
//           }
//         }
//       });

//       setOrganizerTasks(data);
//     } catch (error) {
//       console.error("Error fetching organizer tasks:", error);
//     }
//   }, [headTeamPrefix]);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   return (
//     <div className="flex flex-col items-center px-4 py-8">
//       <div className="mb-6">
//         <button
//           onClick={fetchTasks}
//           className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-md"
//         >
//           Refresh Organizer Tasks
//         </button>
//       </div>

//       {Object.entries(organizerTasks).map(([code, user]) => (
//         <div key={code} className="mb-12 p-6 border rounded-lg shadow-lg w-full max-w-5xl">
//           <div className="font-bold mb-4 text-lg text-center">
//             {code} – {user.name}
//           </div>
//           <table className="table-fixed text-left w-full">
//             <thead>
//               <tr>
//                 <th className="p-2 w-[16rem]">Role</th>
//                 <th className="p-2 w-[10rem]">Time</th>
//                 <th className="p-2 w-[8rem]">Status</th>
//                 <th className="p-2 w-[18rem]">Reports</th>
//               </tr>
//             </thead>
//             <tbody>
//               {user.tasks.map((task, idx) => (
//                 <tr key={idx} className="border-t hover:bg-gray-100 transition">
//                   <td className="p-2">{task.Role}</td>
//                   <td className="p-2">{task["Start-End"]}</td>
//                   <td className="p-2">
//                     {task.status ? (
//                       <span className="text-green-600 font-bold">Done</span>
//                     ) : (
//                       <span className="text-red-600 font-bold">Not yet</span>
//                     )}
//                   </td>
//                   <td className="p-2 break-words">
//                     {Array.isArray(task.Reports) && task.Reports.length > 0 ? (
//                       task.Reports.map((r, i) => (
//                         <div key={i}>
//                           <b>
//                             {r.time?.toDate?.().toLocaleTimeString([], {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </b>
//                           : {r.issue}
//                         </div>
//                       ))
//                     ) : (
//                       ":"
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default VolunteerTaskManagement;


import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const TEAM_MAP = {
  H1: "I", H2: "L", H3: "B", H4: "T", H5: "S", H6: "L", H7: "S", H8: "G",
  H9: "C", H10: "J", H11: "C", H12: "C", H13: "T"
};

const VolunteerTaskManagement = ({ data }) => {
  const [organizerTasks, setOrganizerTasks] = useState({});
  const leaderCode = data?.identificationNumCode || "";
  const isTeamLeader = leaderCode.startsWith("H") && TEAM_MAP[leaderCode];
  const teamPrefix = isTeamLeader ? TEAM_MAP[leaderCode] : leaderCode.charAt(0);

  const fetchTasks = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "volunteerManagement"));
      const data = {};

      querySnapshot.forEach((docSnap) => {
        const teamData = docSnap.data();

        for (const [code, userData] of Object.entries(teamData)) {
          const isOrganizer = userData.RoleType === "Organizer";
          const isInMyTeam = code.startsWith(teamPrefix);

          if (isOrganizer && isInMyTeam) {
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

      setOrganizerTasks(Object.fromEntries(sortedEntries));
    } catch (error) {
      console.error("Error fetching organizer tasks:", error);
    }
  }, [teamPrefix]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div className="mb-6">
        <button
          onClick={fetchTasks}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-md"
        >
          Refresh Organizer Tasks
        </button>
      </div>

      {Object.entries(organizerTasks).map(([code, user]) => (
        <div key={code} className="mb-12 p-6 border rounded-lg shadow-lg w-full max-w-5xl">
          <div className="font-bold mb-4 text-lg text-center">
            {code} – {user.name}
          </div>
          <table className="table-fixed text-left w-full">
            <thead>
              <tr>
                <th className="p-2 w-[16rem]">Role</th>
                <th className="p-2 w-[10rem]">Time</th>
                <th className="p-2 w-[8rem]">Status</th>
                <th className="p-2 w-[18rem]">Reports</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(user.tasks) &&
              user.tasks.map((task, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-100 transition">
                  <td className="p-2">{task.Role}</td>
                  <td className="p-2">{task["Start-End"]}</td>
                  <td className="p-2">
                    {task.status ? (
                      <span className="text-green-600 font-bold">Done</span>
                    ) : (
                      <span className="text-red-600 font-bold">Not yet</span>
                    )}
                  </td>
                  <td className="p-2 break-words">
                    {Array.isArray(task.Reports) && task.Reports.length > 0 ? (
                      task.Reports.map((r, i) => (
                        <div key={i}>
                          <b>
                            {r.time?.toDate?.().toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </b>
                          : {r.issue}
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
