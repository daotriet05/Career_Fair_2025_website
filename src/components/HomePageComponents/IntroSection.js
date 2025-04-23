import React from 'react';
import '../../App.css';
import MarqueeLogos from "../MarqueeLogos";
import * as Reveal from "react-awesome-reveal";
import introSection from "../../images/intro-section.webp";

function IntroSection({ showMarquee }) {
  return (
    <div className="home-page-section text-white relative" style={{ backgroundColor: '#275F48', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="flex flex-col md:flex-row w-full h-auto md:h-screen px-4 md:px-10 py-5">
        
        <div className="w-full md:w-7/12 flex flex-col justify-center pl-0 md:pl-10">
          <div className="relative mb-12">
            <img src={introSection} alt="Spark Your Future" className="w-full" />
          </div>
        </div>

        <div className="w-full md:w-5/12 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-12 pr-0 md:pr-10 h-full">
          <div className="text-2xl font-semibold bg-gray-200 bg-opacity-75 p-8 rounded-md text-black border border-black ml-0 md:ml-10">
            <p className="text-[#275F48]"><strong>Date:</strong> <span className="text-black">14th May 2025</span></p>
            <p className="mt-6 text-[#275F48]"><strong>Time:</strong> <span className="text-black">8:30 - 13:30</span></p>
            <p className="mt-6 text-[#275F48]"><strong>Venue:</strong> <span className="text-black">VGU Convention Hall - Ben Cat Campus</span></p>
          </div>
        </div>
      </div>

      {/* Marquee appears only after animation */}
      {showMarquee && (
        <div className="absolute bottom-0 w-full">
            <Reveal.Fade direction="up" duration={2000} triggerOnce>
                <MarqueeLogos />
            </Reveal.Fade>
        </div>
      )}
    </div>
  );
}

export default IntroSection;
