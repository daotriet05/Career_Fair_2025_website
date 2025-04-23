import { useEffect, useState } from "react";
import "../App.css";
import * as Reveal from "react-awesome-reveal";
import IntroSection from "./HomePageComponents/IntroSection";
import InforSection from "./HomePageComponents/InforSection";
import AgendaSection from "./HomePageComponents/AgendaSection";
import RecapSection from "./HomePageComponents/RecapSection";
import WorkshopSection from "./HomePageComponents/WorkshopSection";
import JobsSection from "./HomePageComponents/JobsSection";

function HomePage() {
  const [showMarquee, setShowMarquee] = useState(false);

  useEffect(() => {
    // Trigger marquee after 3s (or match your animation duration)
    const timer = setTimeout(() => setShowMarquee(true), 2000);
    return () => clearTimeout(timer);
  }, []);

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
        <Reveal.Fade direction="right" duration={2000} triggerOnce>
          <div id="intro">
            <IntroSection showMarquee={showMarquee} />
          </div>
        </Reveal.Fade>
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
