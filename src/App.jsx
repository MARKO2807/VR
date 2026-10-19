import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import DemoForm from './components/DemoForm';
import LegalModal from './components/LegalModal';
import ScrollProgress from './components/ScrollProgress';
import FloatingShapes from './components/FloatingShapes';
import CustomCursor from './components/CustomCursor';
import { useT } from './i18n';

const PageSections = lazy(() => import('./components/PageSections'));

// Shareable links to the legal pages, e.g. https://…/#privatnost
const LEGAL_HASHES = { '#privatnost': 'privacy', '#privacy': 'privacy', '#uvjeti': 'terms', '#terms': 'terms' };
const legalFromHash = () => LEGAL_HASHES[window.location.hash] || null;

export default function App() {
  const t = useT();
  const [demoFormOpen, setDemoFormOpen] = useState(false);
  const [legalPage, setLegalPage] = useState(legalFromHash);
  const handleRequestDemo = () => setDemoFormOpen(true);

  useEffect(() => {
    const onHash = () => setLegalPage(legalFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const closeLegal = useCallback(() => {
    setLegalPage(null);
    if (legalFromHash()) history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">{t.common.skipToContent}</a>
      <ScrollProgress />
      <FloatingShapes />
      <CustomCursor />
      <Header onRequestDemo={handleRequestDemo} />
      <main id="main">
        <Hero onRequestDemo={handleRequestDemo} />
        <Suspense fallback={null}>
          <PageSections onRequestDemo={handleRequestDemo} />
        </Suspense>
        <Footer />
      </main>
      <DemoForm open={demoFormOpen} onClose={() => setDemoFormOpen(false)} />
      <LegalModal page={legalPage} onClose={closeLegal} />
    </>
  );
}
