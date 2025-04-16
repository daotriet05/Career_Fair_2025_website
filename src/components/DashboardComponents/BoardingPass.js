import BoothCell from "./BoothCell";
import { boothsStatus, user } from "./BoothData.js";

const BoardingPass = () => {
  const collected = Object.values(boothsStatus).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto px-4 text-center">
      {/* Info Block */}
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
            {user.name}
          </div>
        </div>
        <div>
          <div className="text-gray-500 font-medium">Booths Collected:</div>
          <div className="font-bold">{collected}</div>
        </div>
      </div>

      {/* Booths Grid with Equal Side Gap */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
        {Object.entries(boothsStatus).map(([key, isActive]) => (
          <div className="w-20"> {/* ✅ Fixed width = equal spacing */}
            <BoothCell key={key} boothKey={key} active={isActive} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardingPass;
