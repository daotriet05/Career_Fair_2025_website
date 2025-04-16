import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import bulb from '../../images/light_bulb.png'; // ✅ Make sure this path is correct

function WorkshopSection() {
  return (
    <div
      className="home-page-section overflow-x-hidden"
      style={{
        backgroundColor: 'white',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="relative flex justify-center mb-10">
          {/* Light bulb image – large and close to title */}
          <img
            src={bulb}
            alt="Lightbulb"
            className="hidden sm:block w-48 h-48 -rotate-45 absolute left-[calc(25%-16rem)] top-1/2 -translate-y-1/2 pointer-events-none select-none"
          />

          {/* Title block */}
          <div className="text-center px-4">
            <h1 className="text-6xl font-extrabold tracking-tight uppercase text-[#194d39] leading-tight">
              Pre-Event Activities
            </h1>
            <div className="text-2xl font-bold text-yellow-600 mt-2">
              Exclusive Talkshow-Workshop
            </div>
          </div>
        </div>

        {/* Event Cards */}
        <div className="flex flex-col sm:flex-row gap-6 w-full px-2">
          {/* Left Card */}
          <div className="flex-1 w-full bg-[#0a4f3c] text-white rounded-3xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-center mb-1">ỨNG VIÊN VƯỢT NGÀN CV</h3>
            <p className="text-center text-sm mb-4">21/04/2025</p>
            <a
                href="https://forms.gle/vqN49fBzX8dvoywH6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-sm underline block mb-6"
                >
                (Click here to register)
            </a>

            <div className="bg-white text-[#194d39] rounded-xl p-4 mb-4">
              <h4 className="font-bold text-lg mb-1">📄 1:1 CV Screening</h4>
              <p className="text-sm">🕘 9:00 – 16:00 | 📅 April 21, 2025 | 📍 Library</p>
              <p className="text-sm mt-2 break-words">
                Drop in for a one-on-one CV review with career consultants. Receive tailored feedback to help your application stand out and improve your chances with potential employers.
              </p>
            </div>

            <div className="bg-white text-[#194d39] rounded-xl p-4">
              <h4 className="font-bold text-lg mb-1">🎤 Talkshow: CV Consulting from HR experts</h4>
              <p className="text-sm">🕟 16:30 – 18:00 | 📅 April 21, 2025 | 📍 Reading Theatre</p>
              <p className="text-sm mt-2 break-words">
                Join our interactive session with career experts to explore how to craft an impressive CV. Learn to avoid common mistakes, analyze real examples, and get your questions answered.
              </p>
            </div>
          </div>

          {/* Right Card */}
          <div className="flex-1 w-full bg-[#0a4f3c] text-white rounded-3xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-center mb-1">Ơn Giời, Đậu Interview Rồi</h3>
            <p className="text-center text-sm mb-4">28/04/2025</p>
            <a
                href="https://forms.gle/5ifURXtAvjdpEgrq7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-sm underline block mb-6"
                >
                (Click here to register)
            </a>

            <div className="bg-white text-[#194d39] rounded-xl p-4 mb-4">
              <h4 className="font-bold text-lg mb-1">🤝 1:1 Mock Interview (English)</h4>
              <p className="text-sm">🕝 14:30 – 16:00 | 📅 April 28, 2025 | 📍 Library</p>
              <p className="text-sm mt-2 break-words">
                Experience a simulated job interview in English with industry professionals. Practice your responses and receive constructive feedback to boost your confidence and performance.
              </p>
            </div>

            <div className="bg-white text-[#194d39] rounded-xl p-4">
              <h4 className="font-bold text-lg mb-1">🎤 Talskhow: Interview Insights from HR Experts</h4>
              <p className="text-sm">🕟 16:30 – 17:30 | 📅 April 28, 2025 | 📍 Ceremony Hall</p>
              <p className="text-sm mt-2 break-words">
                Hear from recruiters and hiring managers about what truly matters in interviews. Get insider advice on mindset, preparation, and how to tackle challenging questions effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkshopSection;
