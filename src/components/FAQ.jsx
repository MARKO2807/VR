import React, { useState } from 'react';

const faqs = [
  {
    question: 'What is VR Classroom4You?',
    answer: 'VR Classroom4You is a Virtual Reality platform designed to support modern education, professional training, and interactive learning environments. Participants enter immersive VR environments where they can interact with virtual systems, practice procedures, and experience complex scenarios that replicate real-world conditions.',
  },
  {
    question: 'Who can use VR Classroom4You?',
    answer: 'The platform is designed for organizations, educational institutions, and professional services—including maritime training, emergency and safety training, schools and universities, and businesses that want to present products or experiences through immersive VR.',
  },
  {
    question: 'What support does Horvat Innovative Labs provide for VR training hubs?',
    answer: 'Support may include VR hardware installation, simulation software setup, instructor and operator training, development of specialized training scenarios, and system integration and technical support. Such hubs can become regional centers for maritime training, professional safety education, and immersive learning programs.',
  },
  {
    question: 'Why choose immersive VR training over traditional methods?',
    answer: 'Immersive technologies let participants learn by doing rather than only observing or memorizing. Benefits include higher engagement and motivation, improved knowledge retention, faster skill development, safe training for complex or dangerous procedures, and repeatable learning environments.',
  },
  {
    question: 'How do I get started?',
    answer: 'Request a demo to see VR Classroom4You in action and discuss how it can be tailored to your organization. You can also explore the platform section on this page to understand capabilities and areas of application.',
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  const id = `faq-${item.question.slice(0, 20).replace(/\s/g, '-')}`;
  return (
    <div className={`faq__item card ${isOpen ? 'faq__item--open' : ''}`}>
      <button
        type="button"
        className="faq__question"
        aria-expanded={isOpen}
        aria-controls={id}
        id={`${id}-q`}
        onClick={onToggle}
      >
        <span>{item.question}</span>
        <span className="faq__icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      <div
        id={id}
        role="region"
        aria-labelledby={`${id}-q`}
        aria-hidden={!isOpen}
        className={`faq__answer-wrapper ${isOpen ? 'faq__answer-wrapper--open' : ''}`}
      >
        <div className="faq__answer-inner">
          <p className="faq__answer">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(0);

  return (
    <section id="faq" className="faq" aria-labelledby="faq-heading">
      <div className="container">
        <span className="section-label">FAQ</span>
        <h2 id="faq-heading" className="section-title">
          Frequently Asked Questions
        </h2>
        <ul className="faq__list" role="list">
          {faqs.map((item, i) => (
            <li key={item.question}>
              <AccordionItem
                item={item}
                isOpen={openId === i}
                onToggle={() => setOpenId(openId === i ? -1 : i)}
              />
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .faq { padding: var(--section-padding-y) 0; background: var(--bg-secondary);padding-bottom: 0; }
        .faq__list { display: flex; flex-direction: column; gap: var(--space-md); }
        .faq__item { padding: 0; overflow: hidden; }
        .faq__question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-md);
          padding: var(--space-xl);
          text-align: left;
          font-size: 1.0625rem;
          font-weight: 600;
          color: var(--text-primary);
          transition: background var(--transition-fast);
        }
        .faq__question:hover { background: var(--bg-card-hover); }
        .faq__question:focus-visible { outline: 2px solid var(--accent-teal); outline-offset: -2px; }
        .faq__icon {
          font-size: 1.5rem;
          color: var(--accent-teal);
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .faq__item--open .faq__icon { transform: rotate(45deg); }
        .faq__answer-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s ease;
        }
        .faq__answer-wrapper--open { grid-template-rows: 1fr; }
        .faq__answer-inner {
          min-height: 0;
          overflow: hidden;
        }
        .faq__answer-wrapper .faq__answer {
          padding: 0 var(--space-xl) var(--space-xl);
          opacity: 0;
          transition: opacity 0.25s ease 0.05s;
        }
        .faq__answer-wrapper--open .faq__answer { opacity: 1; }
        .faq__answer {
          color: var(--text-secondary);
          font-size: var(--text-small);
          line-height: var(--line-relaxed);
          padding-top: var(--space-sm);
          margin: 0;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
      `}</style>
    </section>
  );
}
