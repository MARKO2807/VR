import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useT } from '../i18n';
import { CONTACT_EMAIL, COMPANY } from '../siteConfig';

/** Replaces {company}, {oib} and {email} placeholders; {email} becomes a mailto link. */
function fill(text) {
  return text
    .replaceAll('{company}', COMPANY.name)
    .replaceAll('{oib}', COMPANY.oib)
    .split('{email}')
    .flatMap((part, i) => (i === 0 ? [part] : [<a key={i} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, part]));
}

export default function LegalModal({ page, onClose }) {
  const t = useT();
  const dialogRef = useRef(null);
  const doc = page ? t.legal[page] : null;

  useEffect(() => {
    if (!doc) return undefined;
    const previous = document.activeElement;
    dialogRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus?.();
    };
  }, [doc, onClose]);

  if (!doc) return null;

  return (
    <div className="legal" onClick={onClose}>
      <div
        ref={dialogRef}
        className="legal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="legal__head">
          <div>
            <h2 id="legal-title" className="legal__title">{doc.title}</h2>
            <p className="legal__updated">{t.legal.updated}</p>
          </div>
          <button type="button" className="legal__close" onClick={onClose} aria-label={t.common.close}>
            <X size={22} />
          </button>
        </div>
        <div className="legal__body">
          {doc.sections.map((s, i) => (
            <section key={s.h} className="legal__section">
              <h3>{i + 1}. {s.h}</h3>
              {s.p.map((p, j) => <p key={j}>{fill(p)}</p>)}
            </section>
          ))}
        </div>
      </div>
      <style>{`
        .legal {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-md);
          background: var(--overlay);
          animation: legalIn 0.2s ease;
        }
        @keyframes legalIn { from { opacity: 0; } to { opacity: 1; } }
        .legal__dialog {
          width: 100%;
          max-width: 760px;
          max-height: calc(100dvh - 2rem);
          display: flex;
          flex-direction: column;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25);
          outline: none;
        }
        .legal__head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-md);
          padding: var(--space-xl) var(--space-xl) var(--space-md);
          border-bottom: 1px solid var(--border);
        }
        .legal__title { font-size: var(--text-h2); line-height: 1.2; color: var(--text-primary); }
        .legal__updated { margin-top: var(--space-xs); font-size: 0.8125rem; color: var(--text-muted); }
        .legal__close {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--text-secondary);
          background: var(--bg-secondary);
        }
        .legal__close:hover { color: var(--text-primary); }
        .legal__close:focus-visible { outline: 2px solid var(--accent-teal); outline-offset: 2px; }
        .legal__body { overflow-y: auto; padding: var(--space-lg) var(--space-xl) var(--space-xl); }
        .legal__section + .legal__section { margin-top: var(--space-lg); }
        .legal__section h3 { font-size: 1.0625rem; color: var(--text-primary); margin-bottom: var(--space-xs); }
        .legal__section p { font-size: var(--text-small); color: var(--text-secondary); line-height: var(--line-relaxed); }
        .legal__section a { color: var(--accent-teal); font-weight: 600; }
        @media (max-width: 480px) {
          .legal { padding: var(--space-sm); }
          .legal__head { padding: var(--space-lg) var(--space-lg) var(--space-md); }
          .legal__body { padding: var(--space-md) var(--space-lg) var(--space-lg); }
        }
      `}</style>
    </div>
  );
}
