const BoothCell = ({ boothKey, logoPath, active }) => {
    return (
      <div className="flex flex-col items-center w-16 sm:w-20">
        <div className="w-full h-16 sm:h-20 border rounded-md flex items-center justify-center overflow-hidden">
          <img
            src={logoPath}
            alt={boothKey}
            className={`w-full h-full object-contain transition duration-300 ${
              active ? "opacity-100" : "opacity-30"
            }`}
          />
        </div>
        <span className="mt-1 text-xs sm:text-sm text-center text-gray-500 font-semibold">
          {boothKey}
        </span>
      </div>
    );
  };
  
  export default BoothCell;
  