import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import '../../App.css';

const agendas = [
  { time: "8:30 - 9:30", title: "Check-in, Exhibitors - Industries Booth Setup" },
  { time: "9:30 - 9:40", title: "Music Performance" },
  { time: "9:40 - 9:45", title: "Welcoming Speech" },
  { time: "9:45 - 10:00", title: "Keynote Speech" },
  { time: "10:00 - 10:15", title: "Appreciation Ceremony" },
  { time: "10:15 - 12:30", title: "Booth Exhibition, Mock & Real Interview" },
  { time: "12:30 - 13:30", title: "Booth Exhibition, Lunch, Lucky Draw & Closing" },
];

const AgendaCard = ({ time, title }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="bg-white w-[230px] h-[140px]"></div>
    <div className="text-center font-bold text-base max-w-[200px]">{title}</div>
    <div className="inline-flex items-center gap-1 bg-cus-color text-white px-3 py-1 rounded-lg font-bold text-base">
      <Clock size={16} className="text-cus-color custom-clock" />
      {time}
    </div>
  </div>
);

const EventAgenda = () => {
  return (
    <div className="flex flex-col py-10 px-4 gap-10 bg-agenda-color min-h-screen">
      <h1 className="text-center md:text-left text-5xl sm:text-6xl md:text-7xl font-extrabold text-cus-color px-10 agenda">
        EVENT AGENDA
      </h1>

      {/* Hàng trên 4 ô */}
      <div className="flex flex-row justify-evenly">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-20">
          {agendas.slice(0, 4).map((agenda, idx) => (
            <AgendaCard key={idx} {...agenda} />
          ))}
        </div>
      </div>

      {/* Hàng dưới 3 ô */}
      <div className="flex flex-row justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20">
          {agendas.slice(4).map((agenda, idx) => (
            <AgendaCard key={idx} {...agenda} />
          ))}
        </div>
      </div>
    </div>
  );
};

function AgendaSection() {
  return (
    <div className='home-page-section' style={{ backgroundColor: '#ffe98e', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <EventAgenda />
    </div>
  );
}

export default AgendaSection;