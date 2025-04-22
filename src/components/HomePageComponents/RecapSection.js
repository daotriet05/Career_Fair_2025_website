import React from 'react';
import '../../App.css';
import MarqueeLogosRecap from './MarqueeLogosRecap';
import businessesImage from '../../images/recap_2024/collaboration.webp';
import sponsorshipsImage from '../../images/recap_2024/sponsorships.webp'; // ✅ Make sure this path is correct

function RecapSection() {
  return (
    <div
      className="home-page-section overflow-x-hidden"
      style={{
        backgroundColor: '#145f48',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Content block WITH padding */}
      <div className="w-full max-w-7xl mx-auto text-center flex-1 flex flex-col px-8 py-1 sm:pt-28 sm:pb-4 sm:py-0">

        {/* Title */}
        <h1 className="text-6xl font-extrabold uppercase text-[#ffffff] mb-6">
          VGU CFIED24 SUCCESS
        </h1>

        {/* Recap Buttons */}
        <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
            <a
                href="https://www.youtube.com/watch?v=AKjRGArpgMo" // replace this with the real URL
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-[#194d39] px-4 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition"
            >
                ▶️ 2024 VGU CFIE Recap
            </a>
        </div>

        {/* Business + Sponsor Logos */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mb-10">
          <div>
            <h3 className="text-2xl font-bold text-[#e5ea98] text-600 mb-2">
              19 Collaborating Businesses
            </h3>
            <div className="bg-white p-2 rounded-xl shadow-md max-w-md mx-auto">
              <img
                src={businessesImage}
                alt="19 Collaborating Businesses"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#e5ea98] text-600 mb-2">
              9 Sponsorships
            </h3>
            <div className="bg-white p-2 rounded-xl shadow-md max-w-md mx-auto">
              <img
                src={sponsorshipsImage}
                alt="9 Sponsorships"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Stats Text */}
        <p className="text-xl sm:text-2xl font-medium text-white">
        <span className="text-2xl text-[#e5ea98] font-extrabold">9</span> Professional{' '}
        <span className="text-2xl text-[#e5ea98] font-extrabold"> Interviewers</span> and{' '}
        <span className="text-2xl text-[#e5ea98] font-extrabold">over 1,000 Students</span>
        <br />
        attended the event, and many unique activities
        </p>

      </div>

      {/* Marquee section with NO container padding above it */}
      <div className="w-screen">
        <MarqueeLogosRecap />
      </div>
    </div>
  );
}

export default RecapSection;
