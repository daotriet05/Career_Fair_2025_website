import React from 'react';
import '../../App.css';
import MarqueeLogos from "../MarqueeLogos";
import introSection from "../../images/intro-section.png";

function IntroSection() {
    return (
      <div className="home-page-section text-white relative" style={{ backgroundColor: '#275F48', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
          {/* <!-- Main Container --> */}
          <div className="flex w-full h-screen px-10 py-5">
              
              {/* <!-- Left Section (7/12) --> */}
              <div className="w-7/12 flex flex-col justify-center pl-10">
                  
                  {/* <!-- Replace text with Image --> */}
                  <div className="relative mb-12">
                      <img src={introSection} alt="Spark Your Future" className="w-full" />
                  </div>
              </div>
  
              {/* <!-- Right Section (5/12) --> */}
              <div className="w-5/12 flex flex-col justify-center items-start text-left space-y-12 pr-10 h-full">
                  
                  {/* <!-- Event Details --> */}
                  <div className="text-2xl font-semibold bg-gray-200 bg-opacity-75 p-8 rounded-md text-black border border-black ml-10">
    <p className="text-[#275F48]"><strong>Date:</strong> <span className="text-black">14th May 2025</span></p>
    <p className="mt-6 text-[#275F48]"><strong>Time:</strong> <span className="text-black">8:30 - 13:30</span></p>
    <p className="mt-6 text-[#275F48]"><strong>Venue:</strong> <span className="text-black">VGU Convention Hall - Ben Cat Campus</span></p>
                </div>

              </div>
          </div>
  
          {/* <!-- Marquee Logos Section --> */}
          <div className="absolute bottom-0 w-full">
              <MarqueeLogos />
          </div>
      </div>
    );
  }
  
  export default IntroSection;
  