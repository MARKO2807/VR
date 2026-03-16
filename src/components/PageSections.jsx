import React from 'react';
import SocialProof from './SocialProof';
import Features from './Features';
import About from './About';
import VRClassroom from './VRClassroom';
import Applications from './Applications';
import TrainingHubs from './TrainingHubs';
import Technology from './Technology';
import Benefits from './Benefits';
import Vision from './Vision';
import FAQ from './FAQ';
import FinalCTA from './FinalCTA';

export default function PageSections({ onRequestDemo }) {
  return (
    <>
      <SocialProof />
      <Features />
      <About />
      <VRClassroom />
      <Applications />
      <TrainingHubs onRequestDemo={onRequestDemo} />
      <Technology />
      <Benefits />
      <Vision />
      <FAQ />
      <FinalCTA onRequestDemo={onRequestDemo} />
    </>
  );
}
