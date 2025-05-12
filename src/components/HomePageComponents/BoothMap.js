import React from 'react';
// import { Link } from 'react-router-dom';
import '../../App.css';
import BoothMapImage from '../../images/Boothmap.png';

function BoothMap() {
  const boothNames = [
    "SAP Labs Vietnam",
    "LEGO Manufacturing Vietnam",
    "Techtronic Industries Vietnam - TTI",
    "fischer Production",
    "Ngân Hàng Kỹ Thương Việt Nam - Techcombank",
    "Bosch Vietnam",
    "Indefol Solar",
    "Adnovum Vietnam",
    "FPT",
    "Shopee",
    "Ziehl Abegg Vietnam",
    "Ngân Hàng TMCP Nam Á - Nam A Bank",
    "MAC ZT Vietnam",
    "NTPM Vietnam",
    "Endress+Hauser",
    "Wanek Furniture",
    "iTechwx",
    "Nextern Vietnam",
    "Netcompany Vietnam",
    "Renesas Design Vietnam",
    "Kyungbang Vietnam",
    "MiTek Vietnam",
    "Vietcombank"
  ];

  return (
    <div className="w-full bg-[#275F48] min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-16 text-center">
        BOOTH MAP
      </h1>

      {/* Side-by-side on laptop and above, stacked on mobile */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={BoothMapImage}
            alt="Booth Map"
            className="w-full max-w-[600px] h-auto object-contain"
          />
        </div>

        {/* List Section */}
        <div className="w-full lg:w-1/2 max-w-lg text-left">
          <ol className="list-decimal pl-5 space-y-1 text-sm md:text-lg">
            {boothNames.map((name, index) => (
              <li
                key={index}
                className={`font-bold ${index % 2 === 0 ? 'text-white' : 'text-[#e5ea98]'}`}
              >
                {name}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default BoothMap;
