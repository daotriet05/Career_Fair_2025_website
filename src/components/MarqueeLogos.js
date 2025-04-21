import React from "react";
import Marquee from "react-fast-marquee";
import Adnovum from "../images/logo_2025/Adnovum.png";
import SAP from "../images/logo_2025/SAP.png";
import Bosch from "../images/logo_2025/Bosch.png";
import EndressHauser from "../images/logo_2025/Endress Hauser.png";
import Fischer from "../images/logo_2025/fischer.png";
import FPTSoftware from "../images/logo_2025/FPT Software.png";
import Indefol from "../images/logo_2025/Indefol.png";
import Kyungbang from "../images/logo_2025/Kyungbang.png";
import LEGO from "../images/logo_2025/LEGO.png";
import MACZT from "../images/logo_2025/MAC ZT.png";
import Mitek from "../images/logo_2025/mitek.png";
import Netcompany from "../images/logo_2025/Netcompany.png";
import Nextern from "../images/logo_2025/nextern.png";
import Renesas from "../images/logo_2025/Renesas.png";
import ShopeeExpress from "../images/logo_2025/Shopee Express.png";
import TTI from "../images/logo_2025/TTI.png";
import Wanek from "../images/logo_2025/wanek.png";
import ZiehlAbegg from "../images/logo_2025/Ziehl Abegg.png";






const MarqueeLogos = () => {
    return (
        <div className="bg-gray-100 py-4">
            <Marquee speed={50} pauseOnHover>
            <img src={Adnovum} alt="Adnovum" className="h-12 mx-10" />
            <img src={SAP} alt="SAP" className="h-16 mx-10" />
            <img src={Bosch} alt="Bosch" className="h-12 mx-10" />
            <img src={EndressHauser} alt="Endress Hauser" className="h-12 mx-10" />
            <img src={Fischer} alt="fischer" className="h-12 mx-10" />
            <img src={FPTSoftware} alt="FPT Software" className="h-12 mx-10" />
            <img src={Indefol} alt="Indefol" className="h-12 mx-10" />
            <img src={Kyungbang} alt="Kyungbang" className="h-12 mx-10" />
            <img src={LEGO} alt="LEGO" className="h-12 mx-10" />
            <img src={MACZT} alt="MAC ZT" className="h-12 mx-10" />
            <img src={Mitek} alt="Mitek" className="h-12 mx-10" />
            <img src={Netcompany} alt="Netcompany" className="h-12 mx-10" />
            <img src={Nextern} alt="Nextern" className="h-12 mx-10" />
            <img src={Renesas} alt="Renesas" className="h-12 mx-10" />
            <img src={ShopeeExpress} alt="Shopee Express" className="h-12 mx-10" />
            <img src={TTI} alt="TTI" className="h-12 mx-10" />
            <img src={Wanek} alt="Wanek Furniture" className="h-12 mx-10" />
            <img src={ZiehlAbegg} alt="Ziehl Abegg" className="h-12 mx-10" />

            </Marquee>
        </div>
    );
};

export default MarqueeLogos;
