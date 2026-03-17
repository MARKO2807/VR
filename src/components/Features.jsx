import React from 'react';
import ScrollReveal from './ScrollReveal';
import {
  Glasses,
  ClipboardList,
  Presentation,
  Repeat,
  Users,
  Network,
} from 'lucide-react';

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

const iconMap = {
  vr: Glasses,
  scenario: ClipboardList,
  instructor: Presentation,
  repeat: Repeat,
  collab: Users,
  hub: Network,
};

const Icon = ({ name }) => {
  const LucideIcon = iconMap[name] ?? iconMap.vr;
  return (
    <span className="features__icon" aria-hidden>
      <LucideIcon size={44} strokeWidth={1.75} />
    </span>
  );
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
          {features.map((f, i) => (
            <ScrollReveal key={f.title} as="li" delay={i * 70}>
              <article className="card features__card">
                <Icon name={f.icon} />
                <h3 className="features__card-title">{f.title}</h3>
                <p className="features__card-desc">{f.description}</p>
                <a href="#platform" className="features__link">
                  Read more →
                </a>
              </article>
            </ScrollReveal>
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
          width: 44px;
          height: 44px;
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
