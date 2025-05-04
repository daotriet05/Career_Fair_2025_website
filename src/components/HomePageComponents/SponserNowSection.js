import React, { useState } from 'react';

import Adnovum from "../../images/logo_2025/Adnovum.webp";
import SAP from "../../images/logo_2025/SAP.webp";
import Bosch from "../../images/logo_2025/Bosch.webp";
import EndressHauser from "../../images/logo_2025/Endress Hauser.webp";
import Fischer from "../../images/logo_2025/fischer.webp";
import FPTSoftware from "../../images/logo_2025/FPT Software.webp";
import Indefol from "../../images/logo_2025/Indefol.webp";
import Kyungbang from "../../images/logo_2025/Kyungbang.webp";
import LEGO from "../../images/logo_2025/LEGO.webp";
import MACZT from "../../images/logo_2025/MAC ZT.webp";
import Mitek from "../../images/logo_2025/mitek.webp";
import Netcompany from "../../images/logo_2025/Netcompany.webp"; 
import Nextern from "../../images/logo_2025/nextern.webp";
import Renesas from "../../images/logo_2025/Renesas.webp";
import Shopee from "../../images/logo_2025/shopee.webp";
import TTI from "../../images/logo_2025/TTI.webp";
import Wanek from "../../images/logo_2025/wanek.webp";
import ZiehlAbegg from "../../images/logo_2025/Ziehl Abegg.webp";
import NTPM from "../../images/logo_2025/NTPM.webp";
import Techcombank from "../../images/logo_2025/Techcombank.webp";
import NamABank from "../../images/logo_2025/Nam A Bank.webp";
import iTechwx from "../../images/logo_2025/iTechwx.webp";

const logoOrder = [
  { image: Wanek, alt: "Wanek Furniture", url: "https://www.wanekcareer.com/" },
  { image: LEGO, alt: "LEGO", url: "https://www.lego.com" },
  { image: Indefol, alt: "Indefol", url: "https://www.indefol.com/" },
  { image: ZiehlAbegg, alt: "Ziehl Abegg", url: "https://www.ziehl-abegg.com/en/" },
  { image: Bosch, alt: "Bosch", url: "https://www.bosch.com.vn/" },
  { image: EndressHauser, alt: "Endress Hauser", url: "https://www.apsc.endress.com/" },
  { image: SAP, alt: "SAP", url: "https://www.sap.com/" },
  { image: Fischer, alt: "Fischer", url: "https://www.facebook.com/VGU.CFIED", scale: "scale-90" },
  { image: MACZT, alt: "MAC ZT", url: "https://www.linkedin.com/company/maczt-asia/", scale: "scale-110" },
  { image: Renesas, alt: "Renesas", url: "https://www.renesas.com/en" },
  { image: Mitek, alt: "Mitek", url: "https://mitekvietnam.com.vn/" },
  { image: Kyungbang, alt: "Kyungbang", url: "https://kyungbangvn.com/" },
  { image: Netcompany, alt: "Netcompany", url: "http://netcompany.com" },
  { image: FPTSoftware, alt: "FPT Software", url: "https://fsoft-academy.edu.vn/", scale: "scale-125" },
  { image: Nextern, alt: "Nextern", url: "https://nextern.com/" },
  { image: TTI, alt: "TTI", url: "https://www.ttigroup.com.vn/" },
  { image: Shopee, alt: "Shopee", url: "https://shopee.vn/", scale: "scale-90" },
  { image: Adnovum, alt: "Adnovum", url: "http://www.adnovum.com" },
  { image: NTPM, alt: "NTPM", url: "http://www.ntpm.com.vn" },
  { image: Techcombank, alt: "Techcombank", url: "http://www.techcombank.com.vn", scale: "scale-125" },
  { image: NamABank, alt: "Nam A Bank", url: "" },
  { image: iTechwx, alt: "iTechwx", url: "https://www.itechwx.com/Home" },
];

const LogoCard = ({ image, title, scale }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="w-full max-w-[300px] mx-auto flex justify-center">
      <div className="bg-white w-full h-[140px] rounded-xl overflow-hidden relative flex items-center justify-center shadow-lg transition-transform transform hover:scale-105">
        {!isLoaded && <div className="absolute inset-0 bg-gray-300 animate-pulse" />}
        <img
          src={image}
          alt={title}
          title={title}
          className={`h-[100px] object-contain p-4 transform transition-transform duration-700 ${scale || ''} ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      </div>
    </div>
  );
};

function SponserNowSection() {
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
      <div className="w-full max-w-7xl mx-auto py-10">
        <h1 className="text-xl p-2 font-bold">Gold Sponsors</h1>
        <div className="w-full border-[3px] border-black"></div>

        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 gap-x-[390px] gap-y-[70px]">
          {logoOrder.slice(0, 2).map((logo) => (
            <a
              key={logo.alt}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110"
            >
              <LogoCard {...logo} title={logo.alt} />
            </a>
          ))}
        </div>

        <h1 className="text-xl p-2 font-bold">Silver Sponsors</h1>
        <div className="w-full border-[3px] border-black"></div>

        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 gap-x-[390px] gap-y-[70px]">
          {logoOrder.slice(2, 4).map((logo) => (
            <a
              key={logo.alt}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110"
            >
              <LogoCard {...logo} title={logo.alt} />
            </a>
          ))}
        </div>

        <h1 className="text-xl p-2 font-bold">Exhibitors</h1>
        <div className="w-full border-[3px] border-black"></div>

        <div className="py-8 grid grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {logoOrder.slice(0).map((logo) => (
            <a
            key={logo.alt}
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:scale-110"
            >
            <LogoCard image={logo.image} title={logo.alt} scale={logo.scale}/>
            </a>
        ))}
        </div>
      </div>
    </div>
  );
}

export default SponserNowSection;