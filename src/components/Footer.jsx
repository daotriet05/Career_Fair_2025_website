import group10 from "../images/Footer/group-10.png";
import group11 from "../images/Footer/group-11.png";
import group12 from "../images/Footer/group-12.png";
import group13 from "../images/Footer/group-13.png";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#aa943d] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start">
        
        {/* Contact Info Section */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-white font-black text-xl tracking-wide mb-4">
            CONTACT INFORMATION
          </h2>
          <p className="text-white text-base leading-relaxed">
            Mrs. Vo Phan Hoang Trang <br />
            Tel: +84-(0)935664155 <br />
            Email: trang.vph@vgu.edu.vn
          </p>
        </div>

        {/* Address Section */}
        <div className="flex flex-col text-white text-base leading-relaxed">
          <div className="font-black text-xl mb-4">
            VIETNAMESE-GERMAN UNIVERSITY
          </div>
          <p className="mb-2">
            Ecolakes Mỹ Phước, Ring road 4, Quarter 4, Thới Hòa Ward, Binh Duong 
          </p>
          <p>(0274) 222 0990 - (0274) 222 0980</p>
        </div>

        {/* Social Media & Contact Icons */}
        <div className="flex gap-4 mt-6 md:mt-0">
          {/* Facebook Link */}
          <a
            href="https://www.facebook.com/Vietnamese.German.University"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={group10} alt="Facebook" className="w-10 h-10 cursor-pointer" />
          </a>

          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/vietnamesegerman.uni/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={group11} alt="Instagram" className="w-10 h-10 cursor-pointer" />
          </a>

          {/* Email Link */}
          <a
            href="mailto:info@vgu.edu.vn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={group12} alt="Email" className="w-10 h-10 cursor-pointer" />
          </a>

          {/* Map Link */}

          <a
            href="https://www.google.com/maps/place/Vietnamese%E2%80%93German+University+(VGU)/@11.107497,106.6141063,697m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3174ce286d98ddc7:0xfa362a1ccda178aa!8m2!3d11.107497!4d106.6141063!16s%252Fm%252F0g9y6j9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={group13} alt="Map" className="w-10 h-10 cursor-pointer" />
          </a>


        </div>

      </div>
    </footer>
  );
};
