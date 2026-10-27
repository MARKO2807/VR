import React, { useMemo, useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';
import { useT } from '../i18n';
import { PROJECT_VIDEOS, getYouTubeId } from '../siteConfig';

/** YouTube videos configured for a project in src/siteConfig.js (PROJECT_VIDEOS). */
function projectVideos(project) {
  return (PROJECT_VIDEOS[project.id] || [])
    .map((entry, i) => {
      const id = getYouTubeId(typeof entry === 'string' ? entry : entry?.url);
      if (!id) return null;
      const title = (typeof entry === 'object' && entry.title) || `${project.title} – video ${i + 1}`;
      return { id, title };
    })
    .filter(Boolean);
}

/**
 * Click-to-load YouTube player: shows the video thumbnail until played,
 * so no YouTube scripts or cookies load until someone presses play (youtube-nocookie.com).
 */
function VideoPlayer({ video, labels }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="project-video">
      <div className="project-video__frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button type="button" className="project-video__poster" onClick={() => setPlaying(true)} aria-label={`${labels.openVideo}: ${video.title}`}>
            <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
            <span className="project-video__play" aria-hidden="true"><Play size={24} fill="currentColor" /></span>
          </button>
        )}
      </div>
      <a className="project-video__yt" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
        <ExternalLink size={13} aria-hidden="true" /> {labels.watchOnYoutube}
      </a>
    </div>
  );
}

function ProjectCard({ project, videos, labels }) {
  const photos = project.images.slice(0, 4);

  return (
    <article className="card project">
      <div className="project__photos">
        {photos.map((img) => (
          <figure key={img.src} className="project__photo">
            <img
              src={img.src}
              srcSet={img.thumb ? `${img.thumb} 480w, ${img.src} 1600w` : undefined}
              sizes="(max-width: 520px) 46vw, (max-width: 960px) 45vw, 300px"
              alt={img.alt}
              loading="lazy"
              decoding="async"
            />
          </figure>
        ))}
      </div>
      <div className="project__body">
        <span className="project__tag">{project.tag}</span>
        <h3 className="project__title">{project.title}</h3>
        <p className="project__text">{project.text}</p>
        <dl className="project__stats" data-count={project.stats.length}>
          {project.stats.map((s) => (
            <div key={s.label} className="project__stat">
              <CountUp as="dt" className="project__stat-value" value={s.value} />
              <dd className="project__stat-label">{s.label}</dd>
            </div>
          ))}
        </dl>
        <div className="project__videos">
          {videos.length > 0 ? (
            videos.map((v) => <VideoPlayer key={v.id} video={v} labels={labels} />)
          ) : (
            <div className="project__video-soon">
              <span className="project__video-soon-icon" aria-hidden="true"><Play size={16} fill="currentColor" /></span>
              <span>
                <strong>{labels.videoSoon}</strong>
                <span className="project__video-soon-text">{labels.videoSoonText}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const t = useT();
  const videos = useMemo(() => t.projects.items.map(projectVideos), [t]);

  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading">
      <div className="container">
        <span className="section-label">{t.projects.label}</span>
        <h2 id="projects-heading" className="section-title">{t.projects.title}</h2>
        <p className="projects__intro">{t.projects.intro}</p>
        <div className="projects__grid">
          {t.projects.items.map((project, p) => (
            <ScrollReveal key={project.id} delay={(p % 2) * 100}>
              <ProjectCard project={project} videos={videos[p]} labels={t.projects} />
            </ScrollReveal>
          ))}
        </div>
      </div>
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

        /* 2×2 photo grid (not clickable) */
        .project__photos {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          padding: 6px;
        }
        .project__photo {
          margin: 0;
          overflow: hidden;
          border-radius: calc(var(--radius-lg) - 6px);
          aspect-ratio: 4 / 3;
          background: var(--bg-secondary);
        }
        .project__photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (hover: hover) {
          .project__photo:hover img { transform: scale(1.04); }
        }

        .project__body { padding: var(--space-lg) var(--space-xl) var(--space-xl); flex: 1; display: flex; flex-direction: column; align-items: flex-start; }
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
          font-variant-numeric: tabular-nums;
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

        /* Videos: inline players, or a placeholder until links are added */
        .project__videos {
          align-self: stretch;
          display: grid;
          gap: var(--space-md);
          margin-top: var(--space-md);
        }
        .project__video-soon {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: 12px 16px;
          border-radius: 14px;
          border: 1px dashed color-mix(in srgb, var(--accent-teal) 40%, transparent);
          background: linear-gradient(110deg,
            color-mix(in srgb, var(--accent-teal) 6%, transparent),
            color-mix(in srgb, var(--accent-magenta) 6%, transparent));
          font-size: 0.8125rem;
          line-height: 1.35;
          color: var(--text-secondary);
        }
        .project__video-soon strong { display: block; color: var(--text-primary); font-size: 0.875rem; }
        .project__video-soon-text { display: block; }
        .project__video-soon-icon {
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding-left: 2px;
          border-radius: 50%;
          color: #fff;
          background: var(--gradient-brand);
          opacity: 0.85;
        }
        .project-video__frame {
          position: relative;
          aspect-ratio: 16 / 9;
          border-radius: 14px;
          overflow: hidden;
          background: #0a0f19;
        }
        .project-video__frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
        .project-video__poster { position: absolute; inset: 0; width: 100%; display: block; }
        .project-video__poster img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
        .project-video__poster::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(5, 10, 18, 0.5)); }
        @media (hover: hover) {
          .project-video__poster:hover img { transform: scale(1.04); }
          .project-video__poster:hover .project-video__play { transform: translate(-50%, -50%) scale(1.08); }
        }
        .project-video__poster:focus-visible { outline: 3px solid var(--accent-teal); outline-offset: -3px; }
        .project-video__play {
          position: absolute;
          z-index: 1;
          top: 50%;
          left: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 4px;
          border-radius: 50%;
          color: #fff;
          background: rgba(233, 30, 140, 0.92);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          transform: translate(-50%, -50%);
          transition: transform var(--transition-fast);
        }
        .project-video__yt {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--accent-teal);
        }
        .project-video__yt:hover { text-decoration: underline; }

        @media (max-width: 480px) {
          .project__body { padding: var(--space-md) var(--space-lg) var(--space-lg); }
          .project__photos { gap: 4px; padding: 4px; }
        }
      `}</style>
    </section>
  );
}
