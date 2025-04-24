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
import ShopeeExpress from "../../images/logo_2025/Shopee Express.webp";
import TTI from "../../images/logo_2025/TTI.webp";
import Wanek from "../../images/logo_2025/wanek.webp";
import ZiehlAbegg from "../../images/logo_2025/Ziehl Abegg.webp";

const logoOrder = [
    { image: Wanek, alt: "Wanek Furniture", url: "https://www.facebook.com/VGU.CFIED" },
    { image: LEGO, alt: "LEGO" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: Indefol, alt: "Indefol" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: ZiehlAbegg, alt: "Ziehl Abegg" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: Bosch, alt: "Bosch" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: EndressHauser, alt: "Endress Hauser" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: SAP, alt: "SAP" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: Fischer, alt: "Fischer" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: MACZT, alt: "MAC ZT" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: Renesas, alt: "Renesas" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: Mitek, alt: "Mitek" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: Kyungbang, alt: "Kyungbang" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: Netcompany, alt: "Netcompany" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: FPTSoftware, alt: "FPT Software" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: Nextern, alt: "Nextern" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: TTI, alt: "TTI" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: ShopeeExpress, alt: "Shopee Express" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: Adnovum, alt: "Adnovum" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: Wanek, alt: "Wanek Furniture", url: "https://www.facebook.com/VGU.CFIED" },
    { image: LEGO, alt: "LEGO" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: Indefol, alt: "Indefol" , url: "https://www.facebook.com/VGU.CFIED"},
    { image: ZiehlAbegg, alt: "Ziehl Abegg" , url: "https://www.facebook.com/VGU.CFIED"},

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
        <div className="w-[250px] sm:w-[200px] flex justify-self-center">
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
            <div className="py-16 grid grid-cols-1 sm:grid-cols-4 gap-x-[100px] gap-y-[70px]">
                {logoOrder.slice(4, 8).map((image, idx) => (
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
             {/* Exhibitors Sponser lv2 (4 items / rows) */}
             <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-4 gap-x-[100px] gap-y-[70px]">
                {logoOrder.slice(8, 16).map((image, idx) => (
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
             {/* Exhibitors lv3 (3 items / rows) */}
             <div className="py-[70px] grid grid-cols-1 sm:grid-cols-3 gap-x-[100px] gap-y-[70px]">
                {logoOrder.slice(16, 19).map((image, idx) => (
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
            {/* Exhibitors lv4 (3 items / rows) */}
            <div className="py-[70px] grid grid-cols-1 sm:grid-cols-3 gap-x-[100px] gap-y-[70px]">
                {logoOrder.slice(19, 22).map((image, idx) => (
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
