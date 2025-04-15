import React from 'react';
import Marquee from 'react-fast-marquee';
import '../../App.css';

// Load converted recap_2024 images
const marqueeImages = [
    require('../../images/recap_2024/Copy of _MG_3146_result.jpg'),
    require('../../images/recap_2024/Copy of _MG_3225_result.jpg'),
    require('../../images/recap_2024/Copy of _MG_3233_result.jpg'),
    require('../../images/recap_2024/Copy of _MG_3308_result.png'),
    //require('../../images/recap_2024/Copy of 929330a8967a35246c6b.jpg'),
    require('../../images/recap_2024/Copy of Canon EOS 750D 6096x4056_001563_result.jpg'),
    require('../../images/recap_2024/Copy of DSC02353.JPG'),
    require('../../images/recap_2024/Copy of DSC02386.JPG'),
    //require('../../images/recap_2024/Copy of DSC02492.JPG'),
    require('../../images/recap_2024/Copy of IMGP1903.JPG'),
    require('../../images/recap_2024/Copy of IMGP2017_result.png'),
    require('../../images/recap_2024/Copy of IMGP2022_result.png'),
    require('../../images/recap_2024/Copy of VGU_0089_result.png'),
    //require('../../images/recap_2024/Copy of VGU_4247_result.png'),
    require('../../images/recap_2024/Copy of VGU_8507_result.png'),
    require('../../images/recap_2024/Copy of VGU_9403_result.png'),
];

const MarqueeLogosRecap = () => {
    return (
    <div className="bg-[#e5ea98] py-2 w-screen overflow-hidden">
        <Marquee speed={50} pauseOnHover gradient={false}>
          {marqueeImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`recap-${index}`}
              className="h-28 w-auto mx-1 object-contain"
            />
          ))}
        </Marquee>
    </div>
    );
  };
  

export default MarqueeLogosRecap;
