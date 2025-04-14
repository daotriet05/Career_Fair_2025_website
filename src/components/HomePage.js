import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "../App.css";
import IntroSection from "./HomePageComponents/IntroSection";
import InforSection from "./HomePageComponents/InforSection";
import AgendaSection from "./HomePageComponents/AgendaSection";
import SponsorSection from "./HomePageComponents/SponsorSection";
import RecapSection from "./HomePageComponents/RecapSection";
import HeaderBar from "./HeaderBar";
import WorkshopSection from "./HomePageComponents/WorkshopSection";
import JobsSection from "./HomePageComponents/JobsSection";
import CoreteamSection from "./HomePageComponents/CoreteamSection";

function HomePage() {
    return (
        <div className="Homepage">
            <HeaderBar />
            <div className="Sections-Homepage">
                <IntroSection />
                <InforSection />
                <AgendaSection />
                <JobsSection />
                <WorkshopSection />
                <RecapSection />
                <CoreteamSection />
            </div>
        </div>
    );
}

export default HomePage;
