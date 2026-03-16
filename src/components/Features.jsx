import React from 'react';

const features = [
  {
    title: 'Immersive VR Environments',
    description: 'Participants are placed inside realistic environments that replicate operational conditions, enabling them to practice skills in a safe and controlled setting.',
    icon: 'vr',
  },
  {
    title: 'Scenario-Based Training',
    description: 'Training modules are built around real operational scenarios that require participants to analyze situations, make decisions, and perform procedures.',
    icon: 'scenario',
  },
  {
    title: 'Instructor-Led Sessions',
    description: 'Training can be supervised by instructors who monitor progress, guide participants, and analyze performance.',
    icon: 'instructor',
  },
  {
    title: 'Repeatable Learning',
    description: 'Simulations can be repeated multiple times under different conditions, allowing trainees to gradually improve their performance.',
    icon: 'repeat',
  },
  {
    title: 'Collaborative Training',
    description: 'Multiple participants can interact within the same virtual environment, allowing teams to train together and practice communication and coordination.',
    icon: 'collab',
  },
  {
    title: 'Scalable VR Hubs',
    description: 'Deploy in training centers, educational institutions, corporate learning environments, and dedicated VR hubs.',
    icon: 'hub',
  },
];

const Icon = ({ name }) => {
  const icons = {
    vr: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16h32v20H8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 36v4M32 36v4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="26" r="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="30" cy="26" r="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    scenario: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 18h36M14 24h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    instructor: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="14" r="6" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 38c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 22l8 4v8l-8 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    repeat: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38 12L44 18l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 36L4 30l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M44 18a18 18 0 01-26 16.2M4 30a18 18 0 0126-16.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    collab: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="16" r="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="30" cy="16" r="5" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 38c0-4 2.5-8 6-10M36 38c0-4-2.5-8-6-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 28v10M20 34h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    hub: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M24 16v16M16 24h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  };
  return <span className="features__icon">{icons[name] || icons.vr}</span>;
};

export default function Features() {
  return (
    <section id="features" className="features" aria-labelledby="features-heading">
      <div className="container">
        <span className="section-label">Platform capabilities</span>
        <h2 id="features-heading" className="section-title">
          In which areas we develop VR
        </h2>
        <ul className="features__grid" role="list">
          {features.map((f) => (
            <li key={f.title}>
              <article className="card features__card">
                <Icon name={f.icon} />
                <h3 className="features__card-title">{f.title}</h3>
                <p className="features__card-desc">{f.description}</p>
                <a href="#platform" className="features__link">
                  Read more →
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .features { padding: var(--section-padding-y) 0; }
        .features__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-xl);
        }
        .features__card {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .features__icon {
          width: 56px;
          height: 56px;
          color: var(--accent-teal);
          margin-bottom: var(--space-lg);
          display: block;
        }
        .features__icon svg { width: 100%; height: 100%; }
        .features__card-title {
          font-size: var(--text-h3);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
        }
        .features__card-desc {
          font-size: var(--text-small);
          color: var(--text-secondary);
          line-height: var(--line-relaxed);
          flex: 1;
          margin-bottom: var(--space-lg);
        }
        .features__link {
          font-size: var(--text-small);
          font-weight: 600;
          color: var(--accent-magenta);
          transition: color var(--transition-fast), transform var(--transition-fast);
        }
        .features__link:hover { color: var(--accent-teal); transform: translateX(4px); }
      `}</style>
    </section>
  );
}
