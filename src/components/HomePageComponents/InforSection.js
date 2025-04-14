import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import email from '../../icons/email.png';
import facebook from '../../icons/facebook-app-symbol.png';
import location from '../../icons/location.png';
import www from '../../icons/world-wide-web.png';

function InforSection() {
  return (
    <>
      <div className='home-page-section' style={{ backgroundColor: 'white', height: '100vh'}}>
        <section className="pt-10 py-8 lg:px-20 flex items-center justify-center max-h-screen">
          <div className="main-sm:max-w-xs md:max-w-lg lg:max-w-7xl mx-auto flex flex-col md:flex-col lg:flex-row gap-8;">
            {/* Left Section */}
            <div className="lg:w-1/2" style={{fontFamily:"Montserrat"}}> {/* Left Section Container */}
              <div className="w-11/12 lg:w-full h-5 lg:h-7 lg:mt-8 mb-8 lg:mb-20 mx-auto" style={{backgroundColor: "#145f48"}}></div> {/* Teal divider */}
              <p className="px-5 lg:text-xl text-justify leading-7 leading-relaxed text-gray-700 tracking-normal">
              VGU Career Fair and Industry Exploration Day 2025 is a flagship event to foster collaboration, 
              innovation, and career exploration. CFIED25 aims to:
              </p>
              <ul className="px-14 lg:text-xl text-justify  mt-4 list-disc list-outside space-y-2 text-gray-700 tracking-normal italic">
                <li>Connect VGU students with industry partners for careers and internships. </li>
                <li>Provide a platform for companies to showcase technologies and opportunities.</li>
                <li>Build and strengthen VGU-industry partnerships for collaboration and knowledge exchange.</li>
                <li>Highlight VGU as a hub for industry-ready graduates with German-Vietnamese expertise.</li>
              </ul>
            </div>

            {/* Right Section */}
            <div className="lg:w-1/2 text-right">
              <h2 className="text-yellow-500 text-5xl lg:text-7xl font-bold leading-tight px-5" style={{fontFamily:"IntroRust"}}> {/* Text with gradient and Intro Rust font */}
                INFORMATION ABOUT THE EVENT
              </h2>
              <div className="w-3/5 lg:w-auto px-5 lg:pl-0 lg:mt-6 text-2xl lg:text-3xl text-right place-self-end lg:place-self-start">
                <p className="px-0 mt-2 lg:pl-14 italic" style={{fontFamily:"Montserrat"}}>a promising and impressing CFIE <strong>is coming</strong></p> 
              </div>
            </div>
          </div>
        </section>
        <div className="lg:pl-36 float-left pl-10 lg:mt-10">
          <strong className="text-3xl">Contact Information</strong>
          <p className="text-lg">Mrs. Vo Phan Hoang Trang - Tel. - Email:</p>
        </div>
        <div>
        <div className="w-11/12 mt-20 lg:w-8/12 h-2 lg:h-4 lg:mt-4 lg:mb-8 lg:mb-5 mx-auto lg:float-right" style={{backgroundColor:"#145f48"}}></div> {/* Teal footer */}
          <div className="float-right flex gap-6 mr-12 h-10 mt-6 lg:mt-0">
              <img src={email}></img>
              <img src={facebook}></img>
              <img src={location}></img>
              <img src={www}></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default InforSection;