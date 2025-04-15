import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import email from '../../icons/email.png';
import facebook from '../../icons/facebook-app-symbol.png';
import instagram from '../../icons/instagram-symbol.png';

function InforSection() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row gap-10">
        {/* Left Column */}
        <div className="lg:w-1/2 font-montserrat">
          <div className="h-5 w-11/12 bg-[#145f48] mb-6"></div>
          <p className="text-gray-800 text-justify text-lg">
            VGU Career Fair and Industry Exploration Day 2025 is a flagship event to foster collaboration, innovation, and career exploration. CFIED25 aims to:
          </p>
          <ul className="mt-5 text-left text-gray-700 italic space-y-3 list-disc list-inside">
            <li><em>Connect VGU students with industry partners for careers and internships.</em></li>
            <li><em>Provide a platform for companies to showcase technologies and opportunities.</em></li>
            <li><em>Build and strengthen VGU-industry partnerships for collaboration and knowledge exchange.</em></li>
            <li><em>Highlight VGU as a hub for industry-ready graduates with German-Vietnamese expertise.</em></li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2 text-right">
          <h2 className="text-yellow-500 text-5xl lg:text-7xl font-bold leading-tight font-intro-rust">
            INFORMATION<br />ABOUT THE<br />EVENT
          </h2>
          <p className="mt-6 text-2xl italic font-montserrat">
            a promising and impressing CFIE <strong>is coming</strong>
          </p>
        </div>
      </div>

        {/* Footer section with contact + icons */}
        <div className="w-2/3 h-3 bg-[#145f48] my-6 ml-auto"></div>
        <div className="max-w-7xl mx-auto px-4 pt-2 pb-16 flex flex-col lg:flex-row justify-between items-start gap-8">
            {/* Left: Contact Info */}
            <div className="text-left lg:w-1/2">
                <h3 className="text-2xl font-bold">Contact Information</h3>
                <p className="text-lg">Mrs. Vo Phan Hoang Trang</p>
                <p className="text-lg">Tel: +84-(0)935664155</p>
                <p className="text-lg">Email: trang.vph@vgu.edu.vn</p>
            </div>

            {/* Right: Icons aligned to bottom */}
            <div className="flex flex-col justify-end items-end lg:w-1/2 h-full">
                <div className="flex gap-6 mt-auto">
                    {[
                    { icon: facebook, url: "https://www.facebook.com/VGU.CFIED" },
                    { icon: instagram, url: "https://www.instagram.com/vgu.cfied" },
                    { icon: email, url: "mailto:irttc@vgu.edu.vn" },
                    ].map((item, idx) => (
                    <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 rounded-full bg-[#184A45] flex items-center justify-center transition hover:scale-110"
                    >
                        <img src={item.icon} alt="icon" className="w-8 h-8 invert" />
                    </a>
                    ))}
                </div>
            </div>

        </div>
    </div>
  );
}

export default InforSection;
