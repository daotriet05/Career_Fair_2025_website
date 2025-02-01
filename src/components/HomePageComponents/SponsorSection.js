import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function SponsorSection() {
  return (
    <div className='home-page-section text-white' style={{ backgroundColor: '#145f48', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* <!-- Main Container --> */}
        <div class="flex flex-col justify-center text-center w-full h-full">

            {/* <!-- Title --> */}
            <h1 class="text-8xl font-extrabold">VGU CFIED24 SUCCESS</h1>

            {/* <!-- Sections Container --> */}
            <div class="flex justify-center space-x-36 mt-24 mb-12">
                
                {/* <!-- Collaborating Businesses --> */}
                <div class="w-3/12">
                    <h2 class="text-4xl font-bold" style={{color: '#ffe98e'}}>19 Collaborating</h2>
                    <div class="mt-4 bg-white h-60 p-6 rounded-lg shadow-lg">
                        <div class="space-x-6">
                            da
                        </div>
                    </div>
                </div>

                {/* <!-- Sponsorships --> */}
                <div class="w-3/12">
                    <h2 class="text-4xl font-bold" style={{color: '#ffe98e'}}>9 Sponsorships</h2>
                    <div class="mt-4 bg-white h-60 p-6 rounded-lg shadow-lg">
                        <div class="space-x-6">
                            da
                        </div>
                    </div>
                </div>

            </div>
            
            {/* <!-- Scrolling Text Section --> */}
            <div class="bg-white py-20 marquee">
                <p class="marquee-content text-center text-lg font-semibold text-black w-full">
                    Code sao cho hình chạy ngang qua đi, t mời m đồ ML
                </p>
            </div>
        </div>

    </div>
  );
}

export default SponsorSection;