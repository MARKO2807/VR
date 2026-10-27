import React from 'react';
import ScrollReveal from './ScrollReveal';
import SocialProof from './SocialProof';
import Features from './Features';
import About from './About';
import VRClassroom from './VRClassroom';
import Applications from './Applications';
import Projects from './Projects';
import TrainingHubs from './TrainingHubs';
import Technology from './Technology';
import Benefits from './Benefits';
import Vision from './Vision';
import FAQ from './FAQ';
import FinalCTA from './FinalCTA';

export default function PageSections({ onRequestDemo }) {
  return (
    <>
      <ScrollReveal><SocialProof /></ScrollReveal>
      <ScrollReveal><Features /></ScrollReveal>
      <ScrollReveal><About /></ScrollReveal>
      <ScrollReveal><VRClassroom /></ScrollReveal>
      <ScrollReveal><Applications /></ScrollReveal>
      <ScrollReveal><Projects /></ScrollReveal>
      <ScrollReveal><TrainingHubs onRequestDemo={onRequestDemo} /></ScrollReveal>
      <ScrollReveal><Technology /></ScrollReveal>
      <ScrollReveal><Benefits /></ScrollReveal>
      <ScrollReveal><Vision /></ScrollReveal>
      <ScrollReveal><FAQ /></ScrollReveal>
      <ScrollReveal><FinalCTA onRequestDemo={onRequestDemo} /></ScrollReveal>
    </>
  );
}
