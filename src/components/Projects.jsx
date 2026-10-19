import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useT } from '../i18n';

function Lightbox({ images, index, onClose, onNavigate, labels }) {
  const closeRef = useRef(null);
  const image = images[index];

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus?.();
    };
  }, [onClose, onNavigate]);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={image.alt} onClick={onClose}>
      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.alt} className="lightbox__img" />
        <figcaption className="lightbox__caption">
          {image.alt} <span className="lightbox__count">{index + 1} / {images.length}</span>
        </figcaption>
      </figure>
      <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label={labels.close}>
        <X size={22} />
      </button>
      {images.length > 1 && (
        <>
          <button type="button" className="lightbox__btn lightbox__prev" onClick={(e) => { e.stopPropagation(); onNavigate(-1); }} aria-label={labels.prev}>
            <ChevronLeft size={26} />
          </button>
          <button type="button" className="lightbox__btn lightbox__next" onClick={(e) => { e.stopPropagation(); onNavigate(1); }} aria-label={labels.next}>
            <ChevronRight size={26} />
          </button>
        </>
      )}
    </div>,
    document.body
  );
}

const MAX_THUMBS = 4;

function ProjectCard({ project, onOpen, openLabel }) {
  const thumbs = project.images.slice(0, MAX_THUMBS);
  const hidden = project.images.length - thumbs.length;

  return (
    <article className="card project">
      <div className="project__gallery">
        {thumbs.map((img, i) => (
          <button key={img.src} type="button" className="project__shot" onClick={() => onOpen(i)} aria-label={`${openLabel}: ${img.alt}`}>
            <img src={img.src} alt="" loading="lazy" decoding="async" />
            {i === thumbs.length - 1 && hidden > 0 && <span className="project__more" aria-hidden="true">+{hidden}</span>}
          </button>
        ))}
      </div>
      <div className="project__body">
        <span className="project__tag">{project.tag}</span>
        <h3 className="project__title">{project.title}</h3>
        <p className="project__text">{project.text}</p>
        <dl className="project__stats">
          {project.stats.map((s) => (
            <div key={s.label} className="project__stat">
              <dt className="project__stat-value">{s.value}</dt>
              <dd className="project__stat-label">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export default function Projects() {
  const t = useT();
  const [open, setOpen] = useState(null); // { project, index }

  const close = useCallback(() => setOpen(null), []);
  const navigate = useCallback((step) => {
    setOpen((cur) => {
      if (!cur) return cur;
      const count = t.projects.items[cur.project].images.length;
      return { ...cur, index: (cur.index + step + count) % count };
    });
  }, [t]);

  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading">
      <div className="container">
        <span className="section-label">{t.projects.label}</span>
        <h2 id="projects-heading" className="section-title">{t.projects.title}</h2>
        <p className="projects__intro">{t.projects.intro}</p>
        <div className="projects__grid">
          {t.projects.items.map((project, p) => (
            <ScrollReveal key={p} delay={p * 100}>
              <ProjectCard project={project} openLabel={t.projects.openImage} onOpen={(index) => setOpen({ project: p, index })} />
            </ScrollReveal>
          ))}
        </div>
      </div>
      {open && (
        <Lightbox
          images={t.projects.items[open.project].images}
          index={open.index}
          onClose={close}
          onNavigate={navigate}
          labels={t.projects}
        />
      )}
      <style>{`
        .projects { padding: var(--section-padding-y) 0; background: var(--bg-secondary); }
        .projects__intro {
          color: var(--text-secondary);
          margin-bottom: var(--space-2xl);
          max-width: 65ch;
        }
        .projects__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 440px), 1fr));
          gap: var(--space-lg);
        }
        .projects__grid > div { height: 100%; }
        .project {
          height: 100%;
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .project:hover { transform: none; }
        .project__gallery {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4px;
          padding: 4px;
        }
        .project__shot {
          position: relative;
          display: block;
          overflow: hidden;
          border-radius: calc(var(--radius-lg) - 6px);
          aspect-ratio: 4 / 3;
          background: var(--bg-secondary);
        }
        .project__shot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        @media (hover: hover) {
          .project__shot:hover img { transform: scale(1.05); }
        }
        .project__shot:focus-visible { outline: 2px solid var(--accent-teal); outline-offset: 2px; }
        .project__more {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(11, 26, 42, 0.55);
          color: #fff;
          font-weight: 700;
          font-size: 1.125rem;
        }
        .project__body { padding: var(--space-lg) var(--space-xl) var(--space-xl); flex: 1; display: flex; flex-direction: column; align-items: flex-start; }
        .project__stats { align-self: stretch; }
        .project__tag {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--accent-teal);
          background: color-mix(in srgb, var(--accent-teal) 10%, transparent);
          margin-bottom: var(--space-sm);
        }
        .project__title {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.3;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
        }
        .project__text {
          font-size: var(--text-small);
          color: var(--text-secondary);
          line-height: var(--line-relaxed);
          margin-bottom: var(--space-lg);
          flex: 1;
        }
        .project__stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
          gap: var(--space-sm);
        }
        .project__stat {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 14px 14px 12px;
          border-radius: 14px;
          background: color-mix(in srgb, var(--accent-teal) 7%, var(--bg-card));
          border: 1px solid color-mix(in srgb, var(--accent-teal) 14%, transparent);
          overflow: hidden;
        }
        .project__stat::before {
          content: "";
          position: absolute;
          top: 0;
          left: 14px;
          width: 28px;
          height: 3px;
          border-radius: 0 0 3px 3px;
          background: var(--gradient-brand);
        }
        .project__stat-value {
          font-size: 1.625rem;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          white-space: nowrap;
          background: var(--gradient-brand);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .project__stat-label {
          font-size: 0.8125rem;
          line-height: 1.3;
          color: var(--text-secondary);
        }
        @media (max-width: 480px) {
          .project__body { padding: var(--space-md) var(--space-lg) var(--space-lg); }
        }

        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1rem, 5vw, 4rem);
          background: rgba(5, 10, 18, 0.92);
          animation: lightboxIn 0.2s ease;
        }
        @keyframes lightboxIn { from { opacity: 0; } to { opacity: 1; } }
        .lightbox__figure { max-width: min(1100px, 100%); max-height: 100%; display: flex; flex-direction: column; gap: var(--space-sm); }
        .lightbox__img {
          max-width: 100%;
          max-height: calc(100dvh - 9rem);
          object-fit: contain;
          border-radius: var(--radius-md);
          margin-inline: auto;
        }
        .lightbox__caption { color: #e6edf3; font-size: var(--text-small); text-align: center; }
        .lightbox__count { color: #9cadbc; margin-left: var(--space-sm); white-space: nowrap; }
        .lightbox__btn {
          position: absolute;
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #fff;
          background: rgba(255, 255, 255, 0.12);
          transition: background var(--transition-fast);
        }
        .lightbox__btn:hover { background: rgba(255, 255, 255, 0.24); }
        .lightbox__btn:focus-visible { outline: 2px solid #00c9d4; outline-offset: 2px; }
        .lightbox__close { top: var(--space-md); right: var(--space-md); }
        .lightbox__prev { left: var(--space-md); top: 50%; transform: translateY(-50%); }
        .lightbox__next { right: var(--space-md); top: 50%; transform: translateY(-50%); }
        @media (max-width: 640px) {
          .lightbox__prev, .lightbox__next { top: auto; bottom: var(--space-md); transform: none; }
        }
      `}</style>
    </section>
  );
}
