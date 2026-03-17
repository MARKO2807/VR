import React, { useState, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import DemoForm from './components/DemoForm';
import ScrollProgress from './components/ScrollProgress';
import FloatingShapes from './components/FloatingShapes';
import FilmGrain from './components/FilmGrain';
import CursorGlow from './components/CursorGlow';
import CustomCursor from './components/CustomCursor';

const PageSections = lazy(() => import('./components/PageSections'));

export default function App() {
  const [demoFormOpen, setDemoFormOpen] = useState(false);
  const handleRequestDemo = () => setDemoFormOpen(true);

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <ScrollProgress />
      <FloatingShapes />
      <CursorGlow />
      <CustomCursor />
      <FilmGrain />
      <Header onRequestDemo={handleRequestDemo} />
      <main id="main">
        <Hero onRequestDemo={handleRequestDemo} />
        <Suspense fallback={null}>
          <PageSections onRequestDemo={handleRequestDemo} />
        </Suspense>
        <Footer onRequestDemo={handleRequestDemo} />
      </main>
      <DemoForm open={demoFormOpen} onClose={() => setDemoFormOpen(false)} />
    </>
  );
}
