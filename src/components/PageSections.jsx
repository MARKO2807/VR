import React from 'react';
import ScrollReveal from './ScrollReveal';
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
      <ScrollReveal><SocialProof /></ScrollReveal>
      <ScrollReveal delay={60}><Features /></ScrollReveal>
      <ScrollReveal delay={120}><About /></ScrollReveal>
      <ScrollReveal delay={80}><VRClassroom /></ScrollReveal>
      <ScrollReveal delay={100}><Applications /></ScrollReveal>
      <ScrollReveal delay={60}><TrainingHubs onRequestDemo={onRequestDemo} /></ScrollReveal>
      <ScrollReveal delay={80}><Technology /></ScrollReveal>
      <ScrollReveal delay={100}><Benefits /></ScrollReveal>
      <ScrollReveal delay={60}><Vision /></ScrollReveal>
      <ScrollReveal delay={80}><FAQ /></ScrollReveal>
      <ScrollReveal><FinalCTA onRequestDemo={onRequestDemo} /></ScrollReveal>
    </>
  );
}
