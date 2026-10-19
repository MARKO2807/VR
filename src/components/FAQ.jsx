import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { useT } from '../i18n';

function AccordionItem({ item, index, isOpen, onToggle }) {
  const id = `faq-${index}`;
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
        <span className="faq__icon" aria-hidden="true">+</span>
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
  const t = useT();
  const [openId, setOpenId] = useState(0);

  return (
    <section id="faq" className="faq" aria-labelledby="faq-heading">
      <div className="container faq__container">
        <span className="section-label">{t.faq.label}</span>
        <h2 id="faq-heading" className="section-title">{t.faq.title}</h2>
        <ul className="faq__list" role="list">
          {t.faq.items.map((item, i) => (
            <ScrollReveal key={i} as="li" delay={i * 50}>
              <AccordionItem
                item={item}
                index={i}
                isOpen={openId === i}
                onToggle={() => setOpenId(openId === i ? -1 : i)}
              />
            </ScrollReveal>
          ))}
        </ul>
      </div>
      <style>{`
        .faq { padding: var(--section-padding-y) 0; background: var(--bg-secondary); }
        .faq__container { max-width: 960px; }
        .faq__list { display: flex; flex-direction: column; gap: var(--space-sm); }
        .faq__item { padding: 0; overflow: hidden; }
        .faq__item:hover { transform: none; }
        .faq__question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-md);
          padding: var(--space-lg) var(--space-xl);
          text-align: left;
          font-size: 1.0625rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .faq__question:focus-visible { outline: 2px solid var(--accent-teal); outline-offset: -2px; }
        .faq__icon {
          font-size: 1.5rem;
          line-height: 1;
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
        .faq__answer-inner { min-height: 0; overflow: hidden; }
        .faq__answer {
          padding: 0 var(--space-xl) var(--space-lg);
          color: var(--text-secondary);
          font-size: var(--text-small);
          line-height: var(--line-relaxed);
          opacity: 0;
          transition: opacity 0.25s ease 0.05s;
        }
        .faq__answer-wrapper--open .faq__answer { opacity: 1; }
        @media (max-width: 480px) {
          .faq__question { padding: var(--space-md) var(--space-lg); font-size: 1rem; }
          .faq__answer { padding: 0 var(--space-lg) var(--space-md); }
        }
      `}</style>
    </section>
  );
}
