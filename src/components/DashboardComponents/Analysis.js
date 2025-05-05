import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analysis = ({ data, refetchUserData }) => {
  // ====== MAJOR ANALYSIS ======
  const majors = ["CSE", "ECE", "MEN", "BCE", "ARC", "SME", "SPE", "BBA", "BFA", "Other"];
  const majorAnnotations = {
    'CSE': 'Computer Science and Engineering',
    'ECE': 'Electronics and Computer Engineering',
    'MEN': 'Mechanical Engineering',
    'BCE': 'Construction Engineering',
    'ARC': 'Architecture',
    'SME': 'Smart Mobility Engineering',
    'SPE': 'Sustainable Product Engineering',
    'BBA': 'Business Administration',
    'BFA': 'Business Finance and Accounting',
    'Other': 'Other Majors',
  };
  const majorCounts = majors.map((major) => data.studentAnalysisMajor?.[major] ?? 0);
  const totalStudentsByMajor = majorCounts.reduce((sum, count) => sum + count, 0);

  const chartDataMajor = {
    labels: majors,
    datasets: [
      {
        label: 'Number of Students by Major',
        data: majorCounts,
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      }
    ]
  };

  // ====== INTAKE ANALYSIS ======
  const intakeYears = ["Before 2018", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];
  const intakeCounts = intakeYears.map((year) => data.studentAnalysisIntake?.[year] ?? 0);
  const totalStudentsByIntake = intakeCounts.reduce((sum, count) => sum + count, 0);
  
  const chartDataIntake = {
    labels: intakeYears,
    datasets: [
      {
        label: 'Number of Students by Intake',
        data: intakeCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 25
        }
      }
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">

      {/* 🔁 Refresh Button */}
      <div className="mb-8">
        <button
          onClick={refetchUserData}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-md transition duration-200"
        >
          Refresh Data
        </button>
      </div>
      <div className="mt-2 text-gray-700 font-semibold text-4xl text-center pb-8">
        Total Students: {totalStudentsByMajor}
      </div>
      {/* MAJOR CHART */}
      <h3 className="text-lg font-semibold mb-2">By Major</h3>
      <Bar data={chartDataMajor} options={options} />

      {/* INTAKE CHART */}
      <h3 className="text-lg font-semibold mt-10 mb-2">By Intake</h3>
      <Bar data={chartDataIntake} options={options} />
      

      {/* Major Descriptions */}
      <div className="mt-6 text-sm text-gray-600">
        <h3 className="text-center font-semibold mb-2">Major Annotations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-w-3xl mx-auto text-left">
          {majors.map((major) => (
            <div key={major} className="flex items-start gap-2">
              <span className="font-semibold w-14">{major}:</span>
              <span>{majorAnnotations[major]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
