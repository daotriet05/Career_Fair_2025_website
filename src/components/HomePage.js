import React, { useRef } from "react";
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
  // Refs for sections
  const introRef = useRef(null);
  const infoRef = useRef(null);
  const agendaRef = useRef(null);
  const workshopRef = useRef(null);
  const jobRef = useRef(null);
  const recapRef = useRef(null);

  return (
    <div className="Homepage">
      <HeaderBar
        scrollTo={{
          introRef,
          infoRef,
          agendaRef,
          jobRef,
          workshopRef,
          recapRef,
        }}
      />
      <div className="Sections-Homepage">
        <div ref={introRef}><IntroSection /></div>
        <div ref={infoRef}><InforSection /></div>
        <div ref={agendaRef}><AgendaSection /></div>
        <div ref={jobRef}><JobsSection /></div>
        <div ref={workshopRef}><WorkshopSection /></div>
        <div ref={recapRef}><RecapSection /></div>
      </div>
    </div>
  );
}

export default HomePage;
