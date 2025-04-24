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
    }
    const counts = majors.map((major) => data.studentAnalysis[major] ?? 0);
    const totalStudents = counts.reduce((sum, count) => sum + count, 0);

  const chartData = {
    labels: majors,
    datasets: [
      {
        label: 'Number of Students',
        data: counts,
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: false,
        text: 'Students per Major',
      }
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
      <h2 className="text-xl font-semibold mb-4">Student Major Distribution</h2>
      {/* 🔁 Refresh Button */}
        <div className="mb-8">
                <button
                onClick={refetchUserData}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-md transition duration-200"
                >
                Refresh Data
                </button>
        </div>
      <Bar data={chartData} options={options} />
        <div className="mt-4 text-gray-700 font-semibold text-sm text-center">
            Total Students Visited: {totalStudents}
        </div>
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
