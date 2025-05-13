import React from 'react';
import speakerImg from '../../images/speaker.png'; // Placeholder image, replace with actual image path

const KeynoteSpeech = () => {
  return (
    <div className="bg-[#275f48] text-white py-12 px-4 w-full flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-[#ffde59]">
        KEYNOTE SPEECH
      </h1>
      <div className="text-5xl font-extrabold mb-12 text-center text-[#ffde59]">Guest Speaker</div>

      {/* Flex container for image + text */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-8">
        {/* Left side: Image, Name, and Role */}
        <div className="flex flex-col items-center text-center lg:text-center w-full lg:w-1/3">
          {/* Image container for desktop view with larger size */}
          <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-full overflow-hidden mb-6">
            <img
              src={speakerImg}
              alt="Speaker"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-xl font-bold mb-4 text-[#ffde59] font-extrabold">Mr. Erick Contreras</div>
          <div className="text-lg mb-6 text-[#ffde59] font-bold">
            Managing Director and Head of Performance Materials, BASF Vietnam
          </div>
        </div>

        {/* Right side: Bio Text */}
        <div className="text-lg space-y-6 lg:w-2/3 max-w-3xl text-left px-4">
          <p>
            He currently serves as Vice-Chairman of EuroCham Vietnam and Board Member of the German Business Association. He served as Co-Chairman of EuroCham’s Green Growth Sector Committee since 2023 and Vice Chairman since 2019 leading the advocacy on Circular Economy, Renewable Energy, Sustainable Buildings, and Water management.
          </p>
          <p>
            He played an active role in organizing the conference panels of the Green Economy Forum and Exhibition from 2022 to 2024 and represented EuroCham in the Steering Committee of the Vietnam Business Forum (VBF) Environment Working Group. He also served in the Technical Advisory board of the Alliance to End Plastic Waste Vietnam Flagship Project since 2022.
          </p>
          <p>
            He also raises funds for Saigon Children Charity and Think Playgrounds’ educational projects. He periodically performs with the International Choir and Orchestra of HCMC raising funds for charity.
          </p>
          <p>
            He studied Chemical Engineering from the University of the Philippines and MBA from the University of Manchester. He is also a Registered Financial Planner in The Philippines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeynoteSpeech;
