import React, { useState, useEffect, useRef } from 'react';
import { useT } from '../i18n';

const FORM_NAME = 'demo-request';

export default function DemoForm({ open, onClose }) {
  const t = useT();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '' });
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setSubmitting(false);
      setSubmitError(null);
      setFormData({ name: '', email: '', organization: '', message: '' });
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeydown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab') return;
      const focusable = modalRef.current?.querySelectorAll?.(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [open, onClose]);

  useEffect(() => {
    if (open && modalRef.current) {
      const focusable = modalRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const toFocus = focusable || modalRef.current;
      const timer = requestAnimationFrame(() => {
        requestAnimationFrame(() => toFocus?.focus?.());
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const payload = new URLSearchParams({
        'form-name': FORM_NAME,
        name: formData.name,
        email: formData.email,
        organization: formData.organization,
        message: formData.message,
        'bot-field': '', // honeypot for Netlify spam filtering
      });
      // Use Netlify Function so POST is never 404 (SPA redirect can block POST to /)
      const formAction = `${window.location.origin}/.netlify/functions/submit-demo`;
      const response = await fetch(formAction, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });
      if (!response.ok) {
        throw new Error('Submission failed');
      }
      setSubmitted(true);
      setTimeout(() => onClose(), 2000);
    } catch {
      setSubmitError(t.form.error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!open) return null;

  return (
    <div
      className="demo-form__backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-form-title"
    >
      <div ref={modalRef} className="demo-form__modal" onClick={(e) => e.stopPropagation()} tabIndex={-1}>
        <button
          type="button"
          className="demo-form__close"
          onClick={onClose}
          aria-label={t.form.close}
        >
          ×
        </button>
        {submitted ? (
          <div className="demo-form__success">
            <span className="demo-form__success-icon" aria-hidden="true">✓</span>
            <h2 id="demo-form-title" className="demo-form__success-title">{t.form.successTitle}</h2>
            <p className="demo-form__success-text">{t.form.successText}</p>
          </div>
        ) : (
          <>
            <h2 id="demo-form-title" className="demo-form__title">{t.form.title}</h2>
            <p className="demo-form__subtitle">{t.form.subtitle}</p>
            <form
              name={FORM_NAME}
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="demo-form__form"
            >
              <input type="hidden" name="form-name" value={FORM_NAME} />
              <p className="demo-form__hidden" aria-hidden="true">
                <label>
                  {t.form.honeypot} <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>
              {submitError && (
                <div className="demo-form__error" role="alert">
                  {submitError}
                </div>
              )}
              <div className="demo-form__fields">
              <label className="demo-form__label">
                 <span className="demo-form__required">{t.form.name}</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="demo-form__input"
                  placeholder={t.form.namePlaceholder}
                />
              </label>
              <label className="demo-form__label">
                 <span className="demo-form__required">{t.form.email}</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="demo-form__input"
                  placeholder={t.form.emailPlaceholder}
                />
              </label>
              <label className="demo-form__label">
                {t.form.organization}
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  autoComplete="organization"
                  className="demo-form__input"
                  placeholder={t.form.organizationPlaceholder}
                />
              </label>
              <label className="demo-form__label">
                 <span className="demo-form__required">{t.form.message}</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="demo-form__input demo-form__textarea demo-form__textarea--mobile"
                  placeholder={t.form.messagePlaceholder}
                  required
                />
              </label>
              </div>
              <p className="demo-form__note">{t.form.privacyNote}</p>
              <div className="demo-form__actions">
                <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
                  {t.form.cancel}
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? t.form.sending : t.form.send}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <style>{`
        .demo-form__backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: var(--overlay);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-lg);
          animation: demoFormFadeIn 0.2s ease;
        }
        @media (max-width: 480px) {
          .demo-form__backdrop {
            align-items: center;
            padding: var(--space-sm);
            overflow: hidden;
          }
          .demo-form__modal {
            max-height: calc(100vh - var(--space-md));
            max-height: calc(100dvh - var(--space-md));
            overflow: hidden;
            display: flex;
            flex-direction: column;
            padding: var(--space-md);
            margin-bottom: var(--space-md);
          }
          .demo-form__title { font-size: var(--text-h3); margin-bottom: 0; }
          .demo-form__subtitle { margin-bottom: var(--space-md); }
          .demo-form__form {
            flex: 1;
            min-height: 0;
            display: flex; 
            flex-direction: column;
            gap: var(--space-sm);
          }
          .demo-form__fields {
            display: flex;
            flex-direction: column;
            gap: var(--space-sm);
            flex: 1;
            min-height: 0;
            overflow-y: auto;
          }
          .demo-form__input { padding: 0.5rem 0.75rem; font-size: 0.9375rem; }
          .demo-form__textarea--mobile { min-height: 56px; resize: none; }
          .demo-form__actions {
            flex-wrap: nowrap;
            gap: var(--space-sm);
            margin-top: var(--space-xs);
          }
          .demo-form__actions .btn {
            flex: 1;
            padding: 0.5rem 1rem;
          }
        }
        @keyframes demoFormFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .demo-form__modal {
          position: relative;
          width: 100%;
          max-width: 600px;
          max-height: 100vh;
          overflow-y: auto;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: var(--space-2xl);
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border);
          animation: demoFormSlideIn 0.25s ease;
        }
        @keyframes demoFormSlideIn {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .demo-form__close {
          position: absolute;
          top: var(--space-md);
          right: var(--space-md);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }
        .demo-form__close:hover { color: var(--text-primary); }
        .demo-form__close:focus-visible { outline: 2px solid var(--accent-teal); outline-offset: 2px; }
        .demo-form__title {
          font-size: var(--text-h2);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-xs);
        }
        .demo-form__subtitle {
          font-size: var(--text-small);
          color: var(--text-secondary);
          margin-bottom: var(--space-xl);
        }
        .demo-form__hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          border: 0;
        }
        .demo-form__error {
          padding: var(--space-md);
          background: var(--accent-magenta-soft);
          border: 1px solid var(--accent-magenta);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: var(--text-small);
        }
        .demo-form__form { display: flex; flex-direction: column; gap: var(--space-lg); }
        .demo-form__fields { display: contents; }
        .demo-form__label {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          font-size: var(--text-small);
          font-weight: 500;
          color: var(--text-secondary);
        }
        .demo-form__required { color: var(--accent-magenta); }
        .demo-form__input {
          width: 100%;
          padding: 0.75rem 1rem;
          font-family: inherit;
          font-size: 1rem;
          color: var(--text-primary);
          background: var(--bg-input);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-md);
          outline: none;
          transition: border-color var(--transition-fast);
        }
        .demo-form__input::placeholder { color: var(--text-muted); }
        .demo-form__input:focus { border-color: var(--accent-teal); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-teal) 18%, transparent); }
        .demo-form__textarea { resize: vertical; min-height: 80px; }
        .demo-form__note { font-size: 0.8125rem; color: var(--text-muted); }
        .demo-form__actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-md);
          margin-top: var(--space-sm);
        }
        .demo-form__actions button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .demo-form__success {
          text-align: center;
          padding: var(--space-xl) 0;
        }
        .demo-form__success-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--accent-teal);
          color: var(--on-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 auto var(--space-lg);
        }
        .demo-form__success-title {
          font-size: var(--text-h2);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
        }
        .demo-form__success-text { color: var(--text-secondary); }
      `}</style>
    </div>
  );
}
