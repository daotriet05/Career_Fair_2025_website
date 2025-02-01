import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import WorldWideWeb from '../../icons/world-wide-web.png';
import Facebook from '../../icons/facebook-app-symbol.png';
import Email from '../../icons/email.png';
import Location from '../../icons/location.png';

function RecapSection() {
  return (
    <div className='home-page-section' style={{ backgroundColor: '#e5ea98', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* <!-- Main Wrapper --> */}
        <div class="text-green-900 flex flex-col justify-center text-center w-full h-full">               
            {/* <!-- Recap Button --> */}
            <div class="flex justify-center mb-8">
                <button class="flex items-center gap-2 bg-green-900 text-white px-10 py-4 rounded-full text-4xl font-bold shadow-lg border-2 border-white">
                    <span>▶️</span> 2024 VGU CFIE Recap
                </button>
            </div>

            {/* <!-- Main Content --> */}
            <div class="grid grid-cols-12 mt-24">

                {/* <!-- Left Section --> */}
                <div class="col-span-2 flex flex-col items-end">
                    <div class="flex items-center gap-3 h-36">
                        <span class="text-9xl font-bold">9</span>
                    </div>

                    <div class="flex items-center gap-3 h-36">
                        <span class="text-9xl font-bold">9</span>
                    </div>
                </div>

                <div class="col-span-4 flex flex-col items-start ml-5">
                    <div class="flex items-center gap-3 h-36">
                        <div>
                            <p class="text-3xl">Professional</p>
                            <p class="text-5xl font-bold">Interviewers</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 h-36">
                        <div>
                            <p class="text-5xl font-bold">Sponsorships</p>
                        </div>
                    </div>
                </div>

                {/* <!-- Right Section --> */}
                <div class="col-span-3 flex flex-col items-end mr-5">
                    <div class="flex items-center gap-3 h-36">
                        <span class="text-9xl font-bold">19</span>
                    </div>

                    <div class="flex items-center gap-3 h-36">
                        <span class="text-9xl font-bold">>1000</span>
                    </div>
                </div>

                <div class="col-span-3 flex flex-col items-start">
                    <div class="flex items-center gap-3 h-36">
                        <div>
                            <p class="text-3xl">Collaborating</p>
                            <p class="text-5xl font-bold">Businesses</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 h-36">
                        <div>
                            <p class="text-5xl font-bold">Students</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* <!-- Divider Line --> */}
            <div class="w-full flex items-center mt-12 mb-12">
                <p class="w-4/12 italic text-5xl">and many unique activities</p>

                <div class="w-8/12 bg-white h-4" style={{backgroundColor: '#145f48'}}></div>
            </div>
            
            

            {/* <!-- Social Icons --> */}
            <div class="flex justify-center space-x-5">
                <div class="w-16 h-16 flex justify-center items-center bg-green-900 rounded-full text-white text-2xl">
                    <img src={WorldWideWeb} alt="Career Services official website" style={{height: '50%'}}></img>
                </div>
                <div class="w-16 h-16 flex justify-center items-center bg-green-900 rounded-full text-white text-2xl">
                    <img src={Facebook} alt="Career Services official Facebook page" style={{height: '50%'}}></img>
                </div>
                <div class="w-16 h-16 flex justify-center items-center bg-green-900 rounded-full text-white text-2xl">
                    <img src={Email} alt="Career Services official email" style={{height: '50%'}}></img>
                </div>
                <div class="w-16 h-16 flex justify-center items-center bg-green-900 rounded-full text-white text-2xl">
                    <img src={Location} alt="Career Services location at VGU" style={{height: '50%'}}></img>
                </div>
            </div>

        </div>

    </div>
  );
}

export default RecapSection;