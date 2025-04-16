const BoothCell = ({ boothKey, active }) => {
    const logoPath = `/assets/logos/${boothKey}.png`;
  
    return (
      <div className="w-16 h-16 sm:w-20 sm:h-20 border rounded-md flex items-center justify-center overflow-hidden">
        <img
          src={logoPath}
          alt={boothKey}
          className={`w-full h-full object-contain transition duration-300 ${
            active ? "opacity-100" : "opacity-10"
          }`}
        />
      </div>
    );
  };
  
  export default BoothCell;
  