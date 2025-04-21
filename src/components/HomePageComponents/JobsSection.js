import React, { useState } from 'react';
import '../../App.css';
import LazyImage from '../EffectComponents/LazyImage'; // thêm ở đầu file (chính xác đường dẫn)

// Replace these imports with your actual arrays
import { engineeringJobs, econMgmtJobs, urbanEnvJobs, itJobs } from './JobData';

const categories = [
  { key: 'engineering', label: 'Engineering' },
  { key: 'econ', label: 'Economics and Management' },
  { key: 'urban', label: 'Urban and Environmental Technology' },
  { key: 'it', label: 'Information Technology' },
];

const jobDataMap = {
  engineering: engineeringJobs,
  econ: econMgmtJobs,
  urban: urbanEnvJobs,
  it: itJobs,
};

function JobsSection() {
  const [activeTab, setActiveTab] = useState('engineering');

  return (
    <div className="home-page-section bg-white min-h-screen px-4 flex flex-col items-center">
      {/* Header */}
        <div className="w-full max-w-7xl flex flex-col sm:flex-row sm:items-center sm:gap-6 pt-24 mb-8 text-center sm:text-left">
            <h1 className="text-6xl font-extrabold text-[#194d39] uppercase">
                Open Positions
            </h1>

            <div className="mt-4 sm:mt-0 sm:ml-0">
                <a 
                    href="https://forms.gle/b5ZrWNCbre2Qoghg8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-md inline-block text-center"
                    >
                    Submit Your CV Here
                </a>
            </div>
        </div>

      {/* Category Tabs */}
      <div className="w-full max-w-7xl flex flex-wrap justify-center gap-6 mb-6">
        {categories.map((cat) => (
            <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`px-6 py-2 rounded-full border-2 transition
                ${
                    activeTab === cat.key
                    ? 'border-[#194d39] text-[#194d39] text-xl font-extrabold'
                    : 'border-gray-400 text-gray-500 font-semibold text-base hover:text-[#194d39] hover:border-[#194d39]'
                }`}
            >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-t-4 border-yellow-300 w-full max-w-7xl mb-10" />

      {/* Job Cards */}
        <div className="w-full max-w-7xl grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {jobDataMap[activeTab].map((job, index) => (
            <div
            key={index}
            className="bg-white border-2 border-[#e4e4e4] text-black p-4 rounded-lg flex items-center gap-6"
            >
            {/* Logo on the left */}
            <LazyImage
              src={job.logo}
              alt={`${job.company} logo`}
              className="h-24 w-24 object-contain flex-shrink-0"
            />

            {/* Text aligned to left */}
            <div className="flex flex-col text-left flex-1">
                <p className="font-bold text-md">{job.position}</p>
                <p className="text-md">{job.company}</p>
                <p className="text-md">{job.location}</p>

                {/* JD Button */}
                <a
                    href={job.JD_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block px-4 py-1 text-sm font-semibold rounded-md max-w-[100px] text-center bg-yellow-400 hover:bg-yellow-500 text-black hover:bg-yellow-500"
                >
                    View JD
                </a>
            </div>
        </div>
    ))}
    </div>


    </div>
  );
}

export default JobsSection;
