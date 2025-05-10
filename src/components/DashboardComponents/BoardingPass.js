import BoothCell from "./BoothCell";

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
import Vietcombank from "../../images/logo_2025/Vietcombank.webp";

const logos = {
    "Adnovum": Adnovum,
    "SAP": SAP,
    "Bosch": Bosch,
    "Endress Hauser": EndressHauser,
    "Fischer": Fischer,
    "FPT Software": FPTSoftware,
    "Indefol": Indefol,
    "Kyungbang": Kyungbang,
    "LEGO": LEGO,
    "MAC ZT": MACZT,
    "Mitek": Mitek,
    "Netcompany": Netcompany,
    "Nextern": Nextern,
    "Renesas": Renesas,
    "Shopee": Shopee,
    "TTI": TTI,
    "Wanek": Wanek,
    "Ziehl Albegg": ZiehlAbegg,
    "NTPM": NTPM,
    "Techcombank": Techcombank,
    "Nam A Bank": NamABank,
    "iTechwx": iTechwx,
    "Vietcombank": Vietcombank,
}

const BoardingPass = ({ data, refetchUserData }) => {
  const collected = Object.values(data.boothCollected).filter(Boolean).length;
  const booths = [
    "Adnovum", "Bosch", "Endress Hauser", "Fischer",
    "FPT Software", "Indefol", "Kyungbang", "LEGO", "MAC ZT", "Mitek",
    "Netcompany", "Nextern", "Renesas", "SAP", "Shopee", "TTI",
    "Wanek", "Ziehl Albegg",   "NTPM", "Techcombank", "Nam A Bank", "iTechwx", "Vietcombank"
    ];
  return (
    <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-sm mb-10">
            <div>
            <div className="text-gray-500 font-medium">Flight:</div>
            <div className="text-orange-600 font-bold">CFIED2025</div>
            </div>
            <div>
            <div className="text-gray-500 font-medium">Boarding Time:</div>
            <div className="font-bold">8:00, 14/05</div>
            </div>
            <div>
            <div className="text-gray-500 font-medium">Passenger:</div>
            <div className="text-green-600 font-bold whitespace-nowrap">
                {data.displayName}
            </div>
            </div>
            <div>
            <div className="text-gray-500 font-medium">Booths Collected:</div>
            <div className="font-bold">{collected}</div>
            </div>
        </div>

        {/* 🔁 Refresh Button */}
        <div className="mb-8">
            <button
            onClick={refetchUserData}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-md transition duration-200"
            >
            Refresh Data
            </button>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
            {booths.map((key) => {
                const isActive = data.boothCollected[key];
                const logoPath = logos[key];
                return (
                    <div className="w-20" key={key}>
                        <BoothCell boothKey={key} logoPath={logoPath} active={isActive} />
                    </div>
                );
            })}
        </div>
    </div>
  );
};

export default BoardingPass;
