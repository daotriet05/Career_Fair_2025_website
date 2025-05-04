import React from "react";
import Marquee from "react-fast-marquee";

import Adnovum from "../images/logo_2025/Adnovum.webp";
import SAP from "../images/logo_2025/SAP.webp";
import Bosch from "../images/logo_2025/Bosch.webp";
import EndressHauser from "../images/logo_2025/Endress Hauser.webp";
import Fischer from "../images/logo_2025/fischer.webp";
import FPTSoftware from "../images/logo_2025/FPT Software.webp";
import Indefol from "../images/logo_2025/Indefol.webp";
import Kyungbang from "../images/logo_2025/Kyungbang.webp";
import LEGO from "../images/logo_2025/LEGO.webp";
import MACZT from "../images/logo_2025/MAC ZT.webp";
import Mitek from "../images/logo_2025/mitek.webp";
import Netcompany from "../images/logo_2025/Netcompany.webp";
import Nextern from "../images/logo_2025/nextern.webp";
import Renesas from "../images/logo_2025/Renesas.webp";
import Shopee from "../images/logo_2025/shopee.webp";
import TTI from "../images/logo_2025/TTI.webp";
import Wanek from "../images/logo_2025/wanek.webp";
import ZiehlAbegg from "../images/logo_2025/Ziehl Abegg.webp";

import NTPM from "../images/logo_2025/NTPM.webp";
import Techcombank from "../images/logo_2025/Techcombank.webp";
import NamABank from "../images/logo_2025/Nam A Bank.webp";
import iTechwx from "../images/logo_2025/iTechwx.webp";

const logos = [
  { src: Adnovum, alt: "Adnovum" },
  { src: SAP, alt: "SAP" },
  { src: Bosch, alt: "Bosch" },
  { src: EndressHauser, alt: "Endress Hauser" },
  { src: Fischer, alt: "Fischer", scale: "scale-80" },
  { src: FPTSoftware, alt: "FPT Software", scale: "scale-150" },
  { src: Indefol, alt: "Indefol" },
  { src: Kyungbang, alt: "Kyungbang" },
  { src: LEGO, alt: "LEGO" },
  { src: MACZT, alt: "MAC ZT", scale: "scale-110" },
  { src: Mitek, alt: "Mitek" },
  { src: Netcompany, alt: "Netcompany", scale: "scale-90" },
  { src: Nextern, alt: "Nextern" },
  { src: Renesas, alt: "Renesas" },
  { src: Shopee, alt: "Shopee", scale: "scale-100" },
  { src: TTI, alt: "TTI" },
  { src: Wanek, alt: "Wanek Furniture" },
  { src: ZiehlAbegg, alt: "Ziehl Abegg" },
  { src: NTPM, alt: "NTPM" },
  { src: Techcombank, alt: "Techcombank", scale: "scale-150" },
  { src: NamABank, alt: "Nam A Bank" },
  { src: iTechwx, alt: "iTechwx" },
];

const MarqueeLogos = () => {
  return (
    <div className="bg-gray-100 py-4">
      <Marquee speed={100} pauseOnHover gradient={false}>
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt}
            title={logo.alt}
            className={`h-[48px] mx-10 transform transition-transform duration-300 ${logo.scale || ''}`}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeLogos;