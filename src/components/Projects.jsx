import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, ExternalLink, Play, Video, X } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useT } from '../i18n';
import { PROJECT_VIDEOS, getYouTubeId } from '../siteConfig';

/** Photos + YouTube videos of one project as a single list for the card and the viewer. */
function buildMedia(project) {
  const videos = (PROJECT_VIDEOS[project.id] || [])
    .map((entry, i) => {
      const id = getYouTubeId(typeof entry === 'string' ? entry : entry?.url);
      if (!id) return null;
      const title = (typeof entry === 'object' && entry.title) || `${project.title} – video ${i + 1}`;
      return { type: 'video', id, alt: title, thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` };
    })
    .filter(Boolean);
  const images = project.images.map((img) => ({ type: 'image', ...img, thumb: img.thumb || img.src }));
  return [...videos, ...images];
}

function Lightbox({ items, index, onClose, onNavigate, labels }) {
  const closeRef = useRef(null);
  const item = items[index];

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
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <figure className={`lightbox__figure ${item.type === 'video' ? 'lightbox__figure--video' : ''}`} onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <div className="lightbox__video">
            <iframe
              key={item.id}
              src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0&modestbranding=1`}
              title={item.alt}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <img src={item.src} alt={item.alt} className="lightbox__img" />
        )}
        <figcaption className="lightbox__caption">
          {item.alt} <span className="lightbox__count">{index + 1} / {items.length}</span>
          {item.type === 'video' && (
            <a className="lightbox__yt" href={`https://www.youtube.com/watch?v=${item.id}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} aria-hidden="true" /> {labels.watchOnYoutube}
            </a>
          )}
        </figcaption>
      </figure>
      <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label={labels.close}>
        <X size={22} />
      </button>
      {items.length > 1 && (
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

function ProjectCard({ project, media, onOpen, labels }) {
  const thumbs = media.slice(0, MAX_THUMBS);
  const hidden = media.length - thumbs.length;
  const hasVideo = media.some((m) => m.type === 'video');

  return (
    <article className="card project">
      <div className="project__gallery">
        {thumbs.map((m, i) => (
          <button
            key={m.thumb}
            type="button"
            className="project__shot"
            onClick={() => onOpen(i)}
            aria-label={`${m.type === 'video' ? labels.openVideo : labels.openImage}: ${m.alt}`}
          >
            <img src={m.thumb} alt="" loading="lazy" decoding="async" />
            {m.type === 'video' && (
              <span className="project__play" aria-hidden="true"><Play size={18} fill="currentColor" /></span>
            )}
            {i === thumbs.length - 1 && hidden > 0 && <span className="project__more" aria-hidden="true">+{hidden}</span>}
          </button>
        ))}
      </div>
      <div className="project__body">
        <div className="project__meta">
          <span className="project__tag">{project.tag}</span>
          {!hasVideo && (
            <span className="project__soon"><Video size={13} aria-hidden="true" /> {labels.videoSoon}</span>
          )}
        </div>
        <h3 className="project__title">{project.title}</h3>
        <p className="project__text">{project.text}</p>
        <dl className="project__stats" data-count={project.stats.length}>
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
  const media = useMemo(() => t.projects.items.map(buildMedia), [t]);

  const close = useCallback(() => setOpen(null), []);
  const navigate = useCallback((step) => {
    setOpen((cur) => {
      if (!cur) return cur;
      const count = media[cur.project].length;
      return { ...cur, index: (cur.index + step + count) % count };
    });
  }, [media]);

  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading">
      <div className="container">
        <span className="section-label">{t.projects.label}</span>
        <h2 id="projects-heading" className="section-title">{t.projects.title}</h2>
        <p className="projects__intro">{t.projects.intro}</p>
        <div className="projects__grid">
          {t.projects.items.map((project, p) => (
            <ScrollReveal key={project.id} delay={(p % 2) * 100}>
              <ProjectCard project={project} media={media[p]} labels={t.projects} onOpen={(index) => setOpen({ project: p, index })} />
            </ScrollReveal>
          ))}
        </div>
      </div>
      {open && (
        <Lightbox
          items={media[open.project]}
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
        .project__play {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 2px;
          border-radius: 50%;
          color: #fff;
          background: rgba(233, 30, 140, 0.92);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
          transform: translate(-50%, -50%);
        }
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
        .project__meta { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-sm); }
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
        }
        .project__soon {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
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
          align-self: stretch;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
          gap: var(--space-sm);
        }
        /* Phones: 4 tiles as 2×2; 2–3 tiles as a compact list (number + label per row) */
        @media (max-width: 520px) {
          .project__stats { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
          .project__stats:not([data-count="4"]) { grid-template-columns: 1fr; }
          .project__stats:not([data-count="4"]) .project__stat {
            flex-direction: row;
            align-items: baseline;
            gap: var(--space-md);
            padding: 10px 14px;
          }
          .project__stats:not([data-count="4"]) .project__stat::before { top: 50%; left: 0; width: 3px; height: 20px; border-radius: 0 3px 3px 0; transform: translateY(-50%); }
          .project__stats:not([data-count="4"]) .project__stat-value { min-width: 5.2em; font-size: 1.25rem; }
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
          font-size: 1.5rem;
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
          .project__stat-value { font-size: 1.3rem; }
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
        .lightbox__figure--video { width: min(1100px, 100%); }
        .lightbox__img {
          max-width: 100%;
          max-height: calc(100dvh - 9rem);
          object-fit: contain;
          border-radius: var(--radius-md);
          margin-inline: auto;
        }
        .lightbox__video {
          position: relative;
          width: 100%;
          max-height: calc(100dvh - 10rem);
          aspect-ratio: 16 / 9;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #000;
        }
        .lightbox__video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
        .lightbox__caption { color: #e6edf3; font-size: var(--text-small); text-align: center; }
        .lightbox__count { color: #9cadbc; margin-left: var(--space-sm); white-space: nowrap; }
        .lightbox__yt {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-left: var(--space-md);
          color: #00c9d4;
          font-weight: 600;
          white-space: nowrap;
        }
        .lightbox__yt:hover { text-decoration: underline; }
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
          .lightbox__yt { display: flex; justify-content: center; margin: var(--space-xs) 0 0; }
        }
      `}</style>
    </section>
  );
}
