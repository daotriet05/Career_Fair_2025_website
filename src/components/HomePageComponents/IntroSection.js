import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function IntroSection() {
  return (
    <div className="home-page-section text-white" style={{ backgroundColor: '#145f48', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    
        {/* <!-- Main Container --> */}
        <div className="flex w-full h-screen px-10 py-5">
            
            {/* <!-- Left Section (7/12) --> */}
            <div className="w-7/12 flex flex-col justify-center">
                
                {/* <!-- Career Fair Header --> */}
                <div className=" p-3 inline-block text-left mb-12">
                    <p className="text-4xl text-lg font-light uppercase tracking-wide">
                        & Career Fair <br/> Industry Exploration Day 2025
                    </p>
                </div>

                {/* <!-- Main Heading --> */}
                <h1 className="text-7xl font-extrabold leading-tight relative mb-12">
                    SPARK <br/> 
                    FUTURE
                    <span className="absolute left-[280px] -top-6 text-yellow-400 font-semibold italic text-6xl">your</span>
                </h1>

                {/* <!-- Organizers Section --> */}
                <div className="mt-24">
                    <h2 className="text-3xl text-left font-semibold mb-10">Organizers</h2>
                    <div className="flex items-start mt-3 space-x-5">
                        {/* <!-- Left Organizer --> */}
                        <div className="w-1/2 flex items-start space-x-3">
                            <img src="https://placehold.co/60x60" alt="Career Services Logo"></img>
                            <p className="text-left text-3x1 text-gray-200">
                                Vietnamese-German University's Career Services helps students achieve their career goals by providing resources, guidance, and opportunities in career development, internships, and employment.
                            </p>
                        </div>
                        {/* <!-- Right Organizer --> */}
                        <div className="w-1/2 flex items-start space-x-3">
                            <div className="bg-white text-black p-2 font-bold text-lg">VGU </div>
                            <p className="text-left text-3x1 text-gray-200">
                                VGU, a leading research university, collaborates with industries through the IRTTC to advance knowledge, technology, innovation, and entrepreneurship, supported by the Center for Entrepreneurship and Innovation (CEI).
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* <!-- Right Section (5/12) --> */}
            <div className="w-5/12 flex justify-center items-center text-right">
                <p className="text-lg font-semibold leading-relaxed">
                    tuanh sẽ vẽ 1 cái bóng đèn ở đây <br/>
                    vì ML quá đen nên cần đèn chiếu sáng
                </p>
            </div>

        </div>

    </div>
  );
}

export default IntroSection;
