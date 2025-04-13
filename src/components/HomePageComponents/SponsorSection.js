import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function SponsorSection() {
  return (
    <div className="home-page-section text-white overflow-x-hidden" style={{ backgroundColor: '#145f48', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      {/* Main Container */}
      <div className="flex flex-col justify-center items-center text-center w-full h-full px-4">

        {/* Title */}
        <h1 className="text-4xl md:text-8xl font-extrabold break-words">VGU CFIED24 SUCCESS</h1>

        {/* Sections Container */}
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-36 space-y-10 md:space-y-0 mt-16 md:mt-24 mb-12 w-full">

          {/* Collaborating Businesses */}
          <div className="w-10/12 md:w-3/12">
            <h2 className="text-2xl md:text-4xl font-bold" style={{ color: '#ffe98e' }}>19 Collaborating</h2>
            <div className="mt-4 bg-white h-60 p-6 rounded-lg shadow-lg text-black">
              <div className="space-x-6">
                da
              </div>
            </div>
          </div>

          {/* Sponsorships */}
          <div className="w-10/12 md:w-3/12">
            <h2 className="text-2xl md:text-4xl font-bold" style={{ color: '#ffe98e' }}>9 Sponsorships</h2>
            <div className="mt-4 bg-white h-60 p-6 rounded-lg shadow-lg text-black">
              <div className="space-x-6">
                da
              </div>
            </div>
          </div>

        </div>

        {/* Scrolling Text Section */}
        <div className="bg-white py-8 w-full">
          <p className="text-center text-lg font-semibold text-black w-full whitespace-nowrap overflow-hidden animate-marquee">
            Code sao cho hình chạy ngang qua đi, t mời m đồ ML
          </p>
        </div>
      </div>

    </div>
  );
}

export default SponsorSection;
