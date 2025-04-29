import React, {useState} from 'react';

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
    { image: LEGO, alt: "LEGO" , url: "https://www.lego.com"},
    { image: Indefol, alt: "Indefol" , url: "https://www.indefol.com/"},
    { image: ZiehlAbegg, alt: "Ziehl Abegg" , url: "https://www.ziehl-abegg.com/en/"},
    { image: Bosch, alt: "Bosch" , url: "https://www.bosch.com.vn/"},
    { image: EndressHauser, alt: "Endress Hauser" , url: "https://www.apsc.endress.com/"},
    { image: SAP, alt: "SAP" , url: "https://www.sap.com/"},
    { image: Fischer, alt: "Fischer" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: MACZT, alt: "MAC ZT" , url: "https://www.linkedin.com/company/maczt-asia/"},
    { image: Renesas, alt: "Renesas" , url: "https://www.renesas.com/en"},
    { image: Mitek, alt: "Mitek" , url: "https://mitekvietnam.com.vn/"},
    { image: Kyungbang, alt: "Kyungbang" , url: "https://kyungbangvn.com/"},
    { image: Netcompany, alt: "Netcompany" , url: "http://netcompany.com"},
    { image: FPTSoftware, alt: "FPT Software" , url: "https://fsoft-academy.edu.vn/"},
    { image: Nextern, alt: "Nextern" , url: "https://nextern.com/"},
    { image: TTI, alt: "TTI" , url: "https://www.ttigroup.com.vn/"},
    { image: Shopee, alt: "Shopee" , url: "https://shopee.vn/"},
    { image: Adnovum, alt: "Adnovum" , url: "http://www.adnovum.com"},
    { image: Wanek, alt: "Wanek Furniture", url: "https://www.wanekcareer.com/" },
    { image: LEGO, alt: "LEGO" , url: "https://www.lego.com"},
    { image: Indefol, alt: "Indefol" , url: "https://www.indefol.com/"},
    { image: ZiehlAbegg, alt: "Ziehl Abegg" , url: "https://www.ziehl-abegg.com/en/"},
    { image: NTPM, alt: "NTPM" , url: "http://www.ntpm.com.vn"},
    { image: Techcombank, alt: "Techcombank" , url: "http://wwww.techcombank.com.vn"},
    { image: NamABank, alt: "Nam A Bank" , url: ""},
    { image: iTechwx, alt: "iTechwx" , url: "https://www.itechwx.com/Home"},
  ];


const GnSCard = ({ image, title }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return(
        <div className="w-[300px] flex justify-self-center">
            <div className="bg-white w-full h-[140px] rounded-xl overflow-hidden relative">
            {/* Lazy load animation */}
            {!isLoaded && <div className="absolute inset-0 bg-gray-300 animate-pulse" />}
            <img
                src={image}
                alt={title}
                className={`w-full h-full object-contain transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
            />
      </div>
        </div>
    )
}

const ExhiCard = ({ image, title }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return(
        <div className="w-[100px] sm:w-[200px] flex justify-self-center">
            <div className="bg-white w-full h-[140px] rounded-xl overflow-hidden relative">
            {/* Lazy load animation */}
            {!isLoaded && <div className="absolute inset-0 bg-gray-300 animate-pulse" />}
            <img
                src={image}
                alt={title}
                className={`w-full h-full object-contain transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
            />
            </div>
        </div>
    )
}
function SponserNowSection(){
    return(
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
            <h1 className="text-xl p-2 font-bold">Gold Sponsers</h1>
            <div className="w-full" style={{border:"3px solid black"}}></div>
            {/* Gold Sponser (2 items) */}
            <div className="py-16 grid grid-cols-1 sm:grid-cols-2 gap-x-[390px] gap-y-[70px]">
                {logoOrder.slice(0, 2).map((image, idx) => (
                    <a 
                    key={idx} 
                    href={image.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition hover:scale-110">
                        <GnSCard {...image} />
                    </a>
                ))}
            </div>

            <h1 className="text-xl p-2 font-bold">Silver Sponsers</h1>
            <div className="w-full" style={{border:"3px solid black"}}></div>
            {/* Silver Sponser (2 items) */}
            <div className="py-16 grid grid-cols-1 sm:grid-cols-2 gap-x-[390px] gap-y-[70px]">
                {logoOrder.slice(2, 4).map((image, idx) => (
                    <a                     
                    key={idx} 
                    href={image.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition hover:scale-110">
                        <GnSCard key={idx} {...image} />
                    </a>
                ))}
            </div>

            <h1 className="text-xl p-2 font-bold">Exhibitors</h1>
            <div className="w-full" style={{border:"3px solid black"}}></div>
            {/* Exhibitors lv1 (5 items) */}
            <div className="py-8 grid grid-cols-3 sm:grid-cols-4 gap-x-[100px] gap-y-[10px] sm:gap-y-[50px]">
                {logoOrder.slice(4, 26).map((image, idx) => (
                    <a 
                    key={idx} 
                    href={image.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition hover:scale-110">
                        <ExhiCard key={idx} {...image} />
                    </a>
                ))}
            </div>
             
        </div>
    </div>
    )
}
export default SponserNowSection;
