import "../App.css";
import IntroSection from "./HomePageComponents/IntroSection";
import InforSection from "./HomePageComponents/InforSection";
import AgendaSection from "./HomePageComponents/AgendaSection";
import RecapSection from "./HomePageComponents/RecapSection";
import HeaderBar from "./HeaderBar";
import WorkshopSection from "./HomePageComponents/WorkshopSection";
import JobsSection from "./HomePageComponents/JobsSection";
import CoreteamSection from "./HomePageComponents/CoreteamSection";

function HomePage() {
  return (
    <div className="Homepage scroll-smooth">
      {/* <HeaderBar /> */}

      <div className="Sections-Homepage">
        <div id="intro"><IntroSection /></div>
        <div id="info"><InforSection /></div>
        <div id="agenda"><AgendaSection /></div>
        <div id="jobs"><JobsSection /></div>
        <div id="workshop"><WorkshopSection /></div>
        <div id="recap"><RecapSection /></div>
      </div>
    </div>
  );
}

export default HomePage;
