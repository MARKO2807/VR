import React from 'react';
import ScrollReveal from './ScrollReveal';

const applications = [
  {
    title: 'Nautical Education and Training',
    image: '/SailingBoat.jpg',
    imageAlt: 'Immersive maritime and nautical VR training',
    intro: 'Virtual Reality offers powerful opportunities for training future skippers, crew members, and maritime professionals. Through immersive simulations, trainees can practice complex maritime procedures before performing them on real vessels.',
    items: [
      'Navigation and route planning',
      'Docking and harbor maneuvers',
      'Anchoring procedures',
      'Wind and weather interpretation',
      'Vessel handling and maneuvering',
      'Collision avoidance',
      'Emergency response situations',
      'Crew coordination and leadership',
    ],
    closing: 'These simulations allow trainees to gain practical knowledge and experience without the risks associated with real-world training conditions.',
  },
 
  {
    title: 'Professional Emergency and Safety Training',
    image: '/Firefighter.jpg',
    imageAlt: 'Professional safety and emergency response VR training',
    intro: 'Many professions require preparation for situations that are dangerous, unpredictable, or difficult to simulate in real life. Virtual Reality allows professionals to safely practice such situations.',
    items: [
      'Firefighting services',
      'First aid responders',
      'Search and rescue operations',
      'Mountain rescue services (HGSS)',
      'Security and safety personnel',
    ],
    closing: 'Through immersive simulations, trainees develop situational awareness, communication skills, and decision-making abilities in complex environments. Repeated practice in simulated conditions helps improve operational readiness and response effectiveness.',
  },
  {
    title: 'VR Education in Schools and Universities',
    image: '/University2.jpg',
    imageAlt: 'VR education in schools and universities',
    intro: 'Educational institutions increasingly adopt immersive technologies to support modern learning methods. VR Classroom4You enables schools and universities to create interactive educational environments where students can explore concepts through experience.',
    items: [
      'Technical and vocational education',
      'Maritime and engineering education',
      'STEM programs',
      'Research and experimental learning environments',
    ],
    closing: 'Immersive learning encourages curiosity, improves understanding of complex concepts, and increases student engagement.',
  },
  {
    title: 'VR Promotion and Digital Experiences',
    image: '/Tourism.jpg',
    imageAlt: 'VR promotion and digital experiences',
    intro: 'Virtual Reality can also transform how products, services, and destinations are presented. Organizations can use immersive VR experiences to showcase products or environments in ways that traditional media cannot replicate.',
    items: [
      'Presenting vessels and yachts',
      'Promoting charter services',
      'Showcasing tourism destinations',
      'Immersive travel experiences',
    ],
    closing: 'Potential customers can explore environments virtually, creating stronger emotional engagement and more informed purchasing decisions.',
  },
];

export default function Applications() {
  return (
    <section id="applications" className="applications" aria-labelledby="applications-heading">
      <div className="container">
        <span className="section-label">Areas of application</span>
        <h2 id="applications-heading" className="section-title">
          Applications of VR Classroom4You
        </h2>
        <p className="applications__intro">
          Immersive technologies can transform how organizations train professionals, educate students, and present experiences. VR Classroom4You supports a wide range of applications.
        </p>
        <ul className="applications__list" role="list">
          {applications.map((app, i) => (
            <ScrollReveal key={app.title} as="li" delay={i * 80} className="applications__card card">
              <div className="applications__card-body">
                <h3 className="applications__card-title">{app.title}</h3>
                <p className="applications__card-intro">{app.intro}</p>
                <ul className="applications__items" role="list">
                  {app.items.map((item) => (
                    <li key={item}>
                      <span className="applications__bullet" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="applications__closing">{app.closing}</p>
              </div>
              {app.image && (
                <div className="applications__card-image-wrap">
                  <div className="dotted-frame applications__card-frame">
                    <img
                      src={app.image}
                      alt={app.imageAlt || ''}
                      className="applications__card-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              )}
            </ScrollReveal>
          ))}
        </ul>
      </div>
      <style>{`
        .applications { padding: var(--section-padding-y) 0; }
        .applications__intro {
          color: var(--text-secondary);
          margin-bottom: var(--space-2xl);
          max-width: 65ch;
        }
        .applications__list { display: flex; flex-direction: column; gap: var(--space-xl); }
        .applications__card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .applications__card-image-wrap {
          order: -1;
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 1;
          overflow: visible;
        }
        .applications__card-image-wrap .dotted-frame {
          width: 100%;
          height: 100%;
          border-radius: var(--radius-lg);
        }
        .applications__card-image-wrap .dotted-frame::before {
          z-index: 1;
        }
        .applications__card-image {
          position: relative;
          z-index: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          border-radius: calc(var(--radius-lg) - 6px);
          transition: transform var(--transition-normal);
        }
        .applications__card:hover .applications__card-image {
          transform: scale(1.03);
        }
        .applications__card-body { padding: var(--space-2xl); }
        .applications__card-title {
          font-size: var(--text-h2);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-md);
        }
        .applications__card-intro {
          color: var(--text-secondary);
          margin-bottom: var(--space-lg);
          line-height: var(--line-relaxed);
        }
        .applications__items { margin-bottom: var(--space-md); }
        .applications__items li {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          color: var(--text-secondary);
          font-size: var(--text-small);
          margin-bottom: var(--space-xs);
        }
        .applications__bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent-teal);
          flex-shrink: 0;
        }
        .applications__closing {
          color: var(--text-muted);
          font-size: var(--text-small);
          line-height: var(--line-relaxed);
        }
        @media (min-width: 720px) {
          .applications__card {
            display: grid;
            grid-template-columns: 1fr minmax(220px, 28%);
            align-items: start;
          }
          .applications__card-image-wrap {
            order: unset;
            aspect-ratio: 4 / 3;
          }
        }
      `}</style>
    </section>
  );
}
