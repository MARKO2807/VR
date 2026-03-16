import React, { useState, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import DemoForm from './components/DemoForm';

const PageSections = lazy(() => import('./components/PageSections'));

export default function App() {
  const [demoFormOpen, setDemoFormOpen] = useState(false);
  const handleRequestDemo = () => setDemoFormOpen(true);

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
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
