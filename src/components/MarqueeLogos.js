import React from "react";
import Marquee from "react-fast-marquee";
import logo1 from "../images/logo-ang.png";
import logo2 from "../images/logo-anv.png";
import logo3 from "../images/logo-bh.jpg";
import logo4 from "../images/logo-eh.png";
import logo5 from "../images/logo-faraday.png";
import logo6 from "../images/logo-fischer.png";
import logo7 from "../images/logo-mitek.png";
import logo8 from "../images/logo-netcpn.png";





const MarqueeLogos = () => {
    return (
        <div className="bg-gray-100 py-4">
            <Marquee speed={50} pauseOnHover>
                <img src={logo1} alt="Logo Asia New Generation" className="h-12 mx-10" />
                <img src={logo2} alt="Logo Adnovum" className="h-12 mx-10" />
                <img src={logo3} alt="Logo Baker Hughes" className="h-12 mx-10" />
                <img src={logo4} alt="Logo Endress+Hauser" className="h-12 mx-10" />
                <img src={logo5} alt="Logo Faraday" className="h-12 mx-10" />
                <img src={logo6} alt="Logo Fischer" className="h-12 mx-10" />
                <img src={logo7} alt="Logo Mitek" className="h-12 mx-10" />
                <img src={logo8} alt="Logo Netcompany" className="h-12 mx-10" />
            </Marquee>
        </div>
    );
};

export default MarqueeLogos;
