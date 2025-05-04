import React, { useState, useRef, useEffect } from 'react';
import '../../App.css';
import LazyImage from '../EffectComponents/LazyImage';
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
  const [visibleJobs, setVisibleJobs] = useState(15); // default: 5 rows × 3 jobs
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const bottomRef = useRef(null);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setVisibleJobs(isMobile ? 7 : 15); // reset job count
  };

  const jobs = jobDataMap[activeTab];
  const jobsToShow = jobs.slice(0, visibleJobs);
  const hasMore = jobs.length > jobsToShow.length;

  const handleLoadMore = () => {
    setVisibleJobs((prev) => prev + (isMobile ? 7 : 15));
  };

  return (
    <div className="home-page-section bg-white min-h-screen px-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-7xl flex flex-col sm:flex-row sm:items-center sm:gap-6 pt-24 mb-8 text-center sm:text-left">
        <h1 className="text-6xl font-extrabold text-[#194d39] uppercase">
          JOB INTERVIEW
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
            onClick={() => handleTabChange(cat.key)}
            className={`px-6 py-2 rounded-full border-2 transition ${
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
        {jobsToShow.map((job, index) => (
          <div
            key={index}
            className="bg-white border-2 border-[#e4e4e4] text-black p-4 rounded-lg flex items-center gap-6"
          >
            <LazyImage
              src={job.logo}
              alt={`${job.company} logo`}
              className="h-24 w-24 object-contain flex-shrink-0"
            />
            <div className="flex flex-col text-left flex-1">
              <p className="font-bold text-md">{job.position}</p>
              <p className="text-md">{job.company}</p>
              <p className="text-md">{job.location}</p>
              <a
                href={job.JD_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block px-4 py-1 text-sm font-semibold rounded-md max-w-[100px] text-center bg-yellow-400 hover:bg-yellow-500 text-black"
              >
                View JD
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <button
          onClick={handleLoadMore}
          className="mt-6 px-6 py-2 rounded-full border-2 border-[#194d39] text-[#194d39] text-lg font-bold hover:bg-[#194d39] hover:text-white transition"
        >
          More
        </button>
      )}

      <div ref={bottomRef} className="h-4" />
    </div>
  );
}

export default JobsSection;
