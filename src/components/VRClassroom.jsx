import React from 'react';

const capabilities = [
  {
    title: 'Immersive VR environments',
    text: 'Participants are placed inside realistic environments that replicate operational conditions, enabling them to practice skills in a safe and controlled setting.',
  },
  {
    title: 'Scenario-based training',
    text: 'Training modules are built around real operational scenarios that require participants to analyze situations, make decisions, and perform procedures.',
  },
  {
    title: 'Instructor-led training sessions',
    text: 'Training can be supervised by instructors who monitor progress, guide participants, and analyze performance.',
  },
  {
    title: 'Repeatable learning environments',
    text: 'Simulations can be repeated multiple times under different conditions, allowing trainees to gradually improve their performance.',
  },
  {
    title: 'Collaborative training environments',
    text: 'Multiple participants can interact within the same virtual environment, allowing teams to train together and practice communication and coordination.',
  },
];

export default function VRClassroom() {
  return (
    <section id="platform" className="platform" aria-labelledby="platform-heading">
      <div className="container platform__container">
        <div className="platform__header">
          <span className="section-label">VR Classroom4You</span>
          <h2 id="platform-heading" className="section-title">
            VR Classroom4You – Immersive Learning Platform
          </h2>
          <p className="platform__intro">
            VR Classroom4You is a Virtual Reality platform designed to support modern education, professional training, and interactive learning environments. Instead of learning only through lectures or presentations, participants enter immersive VR environments where they can interact with virtual systems, practice procedures, and experience complex scenarios that replicate real-world conditions.
          </p>
          <p className="platform__intro">
            These environments allow learners to explore situations from a first-person perspective, improving understanding, decision-making, and memory retention.
          </p>
        </div>
        <div className="platform__capabilities">
          <h3 className="platform__cap-title">Platform capabilities</h3>
          <ul className="platform__list" role="list">
            {capabilities.map((cap) => (
              <li key={cap.title} className="platform__item card">
                <h4 className="platform__item-title">{cap.title}</h4>
                <p className="platform__item-text">{cap.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="platform__deploy">
          VR Classroom4You can be deployed in training centers, educational institutions, corporate learning environments, and dedicated VR hubs.
        </p>
      </div>
      <style>{`
        .platform { padding: var(--section-padding-y) 0; background: var(--bg-secondary); }
        .platform__intro {
          color: var(--text-secondary);
          margin-bottom: var(--space-lg);
          line-height: var(--line-relaxed);
          max-width: 72ch;
        }
        .platform__capabilities { margin-top: var(--space-3xl); }
        .platform__cap-title {
          font-size: var(--text-h3);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-xl);
        }
        .platform__list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-xl);
        }
        .platform__item {
          padding: var(--space-xl);
        }
        .platform__item-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--accent-teal);
          margin-bottom: var(--space-md);
        }
        .platform__item-text {
          font-size: var(--text-small);
          color: var(--text-secondary);
          line-height: var(--line-relaxed);
        }
        .platform__deploy {
          margin-top: var(--space-2xl);
          color: var(--text-muted);
          font-size: var(--text-small);
          font-style: italic;
        }
      `}</style>
    </section>
  );
}
