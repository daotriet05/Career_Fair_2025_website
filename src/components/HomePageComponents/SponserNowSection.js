import React, {useState} from 'react';
import img1 from "../../logo/Wanek Furniture.png";
import img2 from "../../logo/LEGO.png";
import img3 from "../../logo/Indefol.png";
import img4 from "../../logo/Ziehl Abegg.png";
import img5 from "../../logo/Bosch.png";
import img6 from "../../logo/Endress Hauser.png";
import img7 from "../../logo/Techcombank.png";
import img8 from "../../logo/Baker Hughes.png";
import img9 from "../../logo/fischer.png";
import img10 from "../../logo/MAC ZT.png";
import img11 from "../../logo/NTPM.png";
import img12 from "../../logo/Renesas.png";
import img13 from "../../logo/Mitek.png";
import img14 from "../../logo/Kyungbang.png";
import img15 from "../../logo/Netcompany.png";
import img16 from "../../logo/FPT Software.png";
import img17 from "../../logo/Nextern.png";
import img18 from "../../logo/TTI.png";
import img19 from "../../logo/Shopee Express.png";
import img20 from "../../logo/Adnovum.png";

const images = [
    {image: img1, title: "Wanek Furniture", url: "https://www.facebook.com/VGU.CFIED" },  
    {image: img2, title: "LEGO", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img3, title: "Indefol", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img4, title: "Ziehl Abegg", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img5, title: "Bosch", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img6, title: "Endress Hauser", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img7, title: "Techcombank", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img8, title: "Baker Hughes", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img9, title: "fischer", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img10, title: "MAC ZT", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img11, title: "NTPM", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img12, title: "Renesas", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img13, title: "Mitek", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img14, title: "Kyungbang", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img15, title: "Netcompany", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img16, title: "FPT Software", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img17, title: "Nextern", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img18, title: "TTI", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img19, title: "Shopee Express", url: "https://www.facebook.com/VGU.CFIED" },
    {image: img20, title: "Adnovum", url: "https://www.facebook.com/VGU.CFIED" },
]

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

const BronzeCard = ({ image, title }) => {
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
                {images.slice(0, 2).map((image, idx) => (
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
                {images.slice(2, 4).map((image, idx) => (
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

            <h1 className="text-xl p-2 font-bold">Bronze Sponsers</h1>
            <div className="w-full" style={{border:"3px solid black"}}></div>
            {/* Bronze Sponser lv1 (5 items) */}
            <div className="py-16 grid grid-cols-1 sm:grid-cols-5 gap-x-[100px] gap-y-[70px]">
                {images.slice(4, 9).map((image, idx) => (
                    <a 
                    key={idx} 
                    href={image.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition hover:scale-110">
                        <BronzeCard key={idx} {...image} />
                    </a>
                ))}
            </div>
             {/* Bronze Sponser lv2 (4 items / rows) */}
             <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-4 gap-x-[100px] gap-y-[70px]">
                {images.slice(9, 17).map((image, idx) => (
                    <a 
                    key={idx} 
                    href={image.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition hover:scale-110">
                        <BronzeCard key={idx} {...image} />
                    </a>
                ))}
            </div>
             {/* Bronze Sponser lv3 (3 items / rows) */}
             <div className="py-[70px] grid grid-cols-1 sm:grid-cols-3 gap-x-[100px] gap-y-[70px]">
                {images.slice(17, 21).map((image, idx) => (
                    <a
                    key={idx} 
                    href={image.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition hover:scale-110">
                        <BronzeCard key={idx} {...image} />                        
                    </a>
                ))}
            </div>
        </div>
    </div>
    )
}
export default SponserNowSection;
