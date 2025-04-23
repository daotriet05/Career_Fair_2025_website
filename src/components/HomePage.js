import { useEffect } from "react";
import "../App.css";
import IntroSection from "./HomePageComponents/IntroSection";
import InforSection from "./HomePageComponents/InforSection";
import AgendaSection from "./HomePageComponents/AgendaSection";
import RecapSection from "./HomePageComponents/RecapSection";
import WorkshopSection from "./HomePageComponents/WorkshopSection";
import JobsSection from "./HomePageComponents/JobsSection";
import SponserNowSection from "./HomePageComponents/SponserNowSection";

function HomePage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
  
    const scrollToHashElement = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        setTimeout(scrollToHashElement, 100);
      }
    };
  
    requestAnimationFrame(() => {
      setTimeout(scrollToHashElement, 500);
    });
  }, []);

  return (
    <div className="Homepage scroll-smooth">
      <div className="Sections-Homepage">
        <div id="intro"><IntroSection /></div>
        <div id="info"><InforSection /></div>
        <div id="agenda"><AgendaSection /></div>
        <div id="jobs"><JobsSection /></div>
        <div id="workshop"><WorkshopSection /></div>
        <div id="recap"><RecapSection /></div>
        <div id="sponser"><SponserNowSection/></div>
      </div>
    </div>
  );
}

export default HomePage;
