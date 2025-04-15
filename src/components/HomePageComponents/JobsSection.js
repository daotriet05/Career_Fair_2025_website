import React, { useState } from 'react';
import '../../App.css';

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
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-md">
                Submit Your CV Here
                </button>
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
        <div className="w-full max-w-7xl grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobDataMap[activeTab].map((job, index) => (
                <div
                key={index}
                className="bg-[#444] text-white p-4 rounded-lg flex items-center gap-6"
                >
                {/* Logo on the left */}
                <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="h-24 w-24 object-contain flex-shrink-0"
                />

                {/* Text aligned to left */}
                <div className="flex flex-col text-left">
                    <p className="font-bold text-base">{job.position}</p>
                    <p className="text-sm">{job.company}</p>
                    <p className="text-sm">{job.location}</p>
                </div>
                </div>
            ))}
        </div>

    </div>
  );
}

export default JobsSection;
