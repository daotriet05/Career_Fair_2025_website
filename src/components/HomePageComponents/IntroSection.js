import React from 'react';
import '../../App.css';
import MarqueeLogos from "../MarqueeLogos";
import introSection from "../../images/intro-section.png";

function IntroSection() {
    return (
      <div className="home-page-section" style={styles.section}>
        
        {/* Main Container */}
        <div style={styles.mainContainer}>
          
          {/* Left Section */}
          <div style={styles.leftSection}>
            <div style={styles.imageContainer}>
              <img src={introSection} alt="Spark Your Future" style={styles.image} />
            </div>
          </div>

          {/* Right Section */}
          <div style={styles.rightSection}>
            <div style={styles.eventBox}>
              <p style={styles.label}><strong>Date:</strong> <span style={styles.value}>14th May 2025</span></p>
              <p style={{ ...styles.label, marginTop: '1.5rem' }}><strong>Time:</strong> <span style={styles.value}>8:30 - 13:30</span></p>
              <p style={{ ...styles.label, marginTop: '1.5rem' }}><strong>Venue:</strong> <span style={styles.value}>VGU Convention Hall - Ben Cat Campus</span></p>
            </div>
          </div>
        </div>

        {/* Marquee Logos */}
        <div style={styles.marqueeWrapper}>
          <MarqueeLogos />
        </div>

        {/* Internal CSS */}
        <style>{`
          .home-page-section {
            color: white;
            position: relative;
            background-color: #275F48;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    );
}

const styles = {
  section: {
    backgroundColor: '#275F48',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    position: 'relative',
  },
  mainContainer: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    padding: '1.25rem 2.5rem', // py-5 px-10
  },
  leftSection: {
    width: '58.3333%', // 7/12
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '2.5rem', // pl-10
  },
  imageContainer: {
    position: 'relative',
    marginBottom: '3rem', // mb-12
  },
  image: {
    width: '100%',
  },
  rightSection: {
    width: '41.6667%', // 5/12
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    gap: '3rem', // space-y-12
    paddingRight: '2.5rem', // pr-10
    height: '100%',
  },
  eventBox: {
    fontSize: '1.5rem', // text-2xl
    fontWeight: 600, // font-semibold
    backgroundColor: 'rgba(229, 231, 235, 0.75)', // bg-gray-200 + opacity
    padding: '2rem',
    borderRadius: '0.375rem', // rounded-md
    color: 'black',
    border: '1px solid black',
    marginLeft: '2.5rem', // ml-10
  },
  label: {
    color: '#275F48',
  },
  value: {
    color: 'black',
  },
  marqueeWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
};

export default IntroSection;
