import React from 'react';
import MagneticButton from './MagneticButton';

export default function FinalCTA({ onRequestDemo }) {
  return (
    <section id="contact" className="final-cta" aria-labelledby="final-cta-heading">
      <div className="final-cta__wrap">
        <div className="container">
          <div className="final-cta__card">
            <span className="section-label">Get started</span>
            <h2 id="final-cta-heading" className="final-cta__title">
              Experience the Next Generation of Learning
            </h2>
            <p className="final-cta__text">
              Virtual Reality is transforming how organizations educate, train, and communicate. Whether applied to maritime training, emergency services preparation, academic education, or immersive digital experiences, VR Classroom4You provides powerful tools for modern organizations.
            </p>
            <div className="final-cta__buttons">
              <div className="final-cta__primary-wrap">
                <MagneticButton type="button" className="btn btn-primary final-cta__btn" onClick={onRequestDemo} title="Free, no commitment">
                  Request a Demo
                </MagneticButton>
              </div>
              <span className="final-cta__or">or</span>
              <a href="mailto:contact@horvatlabs.com" className="btn btn-secondary final-cta__btn final-cta__btn--nowrap">
                Contact Horvat Innovative Labs
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .final-cta__wrap {
          padding: clamp(4.5rem, 11vw, 6rem) var(--section-padding-x);
          background: var(--bg-primary);
        }
        .final-cta__card {
          max-width: 800px;
          margin-inline: auto;
          padding: clamp(3rem, 7vw, 4.5rem) clamp(2rem, 4.5vw, 3rem);
          text-align: center;
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 201, 212, 0.08);
        }
        .final-cta .section-label { text-align: center; }
        .final-cta__title {
          font-size: var(--text-h1);
          font-weight: 700;
          line-height: var(--line-tight);
          color: var(--text-primary);
          margin-bottom: var(--space-lg);
        }
        .final-cta__text {
          color: var(--text-secondary);
          margin-bottom: var(--space-2xl);
          line-height: var(--line-relaxed);
        }
        .final-cta__buttons {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: var(--space-md);
        }
        .final-cta__primary-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .final-cta__hint {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .final-cta__or {
          color: var(--text-muted);
          font-size: var(--text-small);
        }
        .final-cta__btn--nowrap {
          white-space: nowrap;
        }
        @media (max-width: 480px) {
          .final-cta .final-cta__btn {
            padding: 0.6rem 1.1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}
