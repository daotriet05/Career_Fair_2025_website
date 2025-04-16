import React from 'react';
import { Clock } from 'lucide-react';
import '../../App.css';

import img1 from '../../images/agenda/1_checkin.JPG';
import img2 from '../../images/agenda/2_music.jpg';
import img3 from '../../images/agenda/3_welcoming speech.png';
import img4 from '../../images/agenda/4_keynote.jpg';
import img5 from '../../images/agenda/5_appreciation.jpg';
import img6 from '../../images/agenda/6_booth.JPG';
import img7 from '../../images/agenda/7_lucky draw.jpg';

const agendas = [
    { time: "8:30 - 9:30", title: "Check-in, Exhibitors - Industries Booth Setup", image: img1 },
    { time: "9:30 - 9:40", title: "Music Performance", image: img2 },
    { time: "9:40 - 9:45", title: "Welcoming Speech", image: img3 },
    { time: "9:45 - 10:00", title: "Keynote Speech", image: img4 },
    { time: "10:00 - 10:15", title: "Appreciation Ceremony", image: img5 },
    { time: "10:15 - 12:30", title: (
        <>
          Booth Exhibition,<br />
          Job & Internship Interview
        </>
      ), image: img6 },
    { time: "12:30 - 13:30", title: "Booth Exhibition, Lunch, Lucky Draw & Closing", image: img7 },
];

const AgendaCard = ({ time, title, image }) => (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white w-[230px] h-[140px] rounded-xl shadow-md overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="text-center font-extrabold text-lg max-w-[220px]">{title}</div>
      <div className="inline-flex items-center gap-2 bg-[#184A45] text-white px-4 py-1.5 rounded-lg font-extrabold text-base">
        <Clock size={18} className="text-white" />
        {time}
      </div>
    </div>
  );

const EventAgenda = () => {
  return (
    <div className="flex flex-col py-12 px-4 gap-12 bg-[#EFF18F] min-h-screen w-full items-center">
      <h1 className="text-6xl md:text-7xl font-extrabold text-[#184A45]">
        EVENT AGENDA
      </h1>

      {/* Top row (4 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-10">
        {agendas.slice(0, 4).map((agenda, idx) => (
          <AgendaCard key={idx} {...agenda} />
        ))}
      </div>

      {/* Bottom row (3 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-10">
        {agendas.slice(4).map((agenda, idx) => (
          <AgendaCard key={idx} {...agenda} />
        ))}
      </div>
    </div>
  );
};

function AgendaSection() {
  return (
    <div className="w-full bg-[#EFF18F]">
      <EventAgenda />
    </div>
  );
}

export default AgendaSection;
