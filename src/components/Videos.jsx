import React, { useState } from 'react';
import { Play, Clock } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useT } from '../i18n';
import { VIDEOS, getYouTubeId } from '../siteConfig';

/**
 * Click-to-load YouTube card: shows a poster until played, so no YouTube scripts or
 * cookies load until someone actually presses play (youtube-nocookie.com).
 */
function VideoCard({ video, item, labels }) {
  const [playing, setPlaying] = useState(false);
  const id = getYouTubeId(video.youtube);

  return (
    <article className="video-card card">
      <div className="video-card__media">
        {playing && id ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="video-card__poster"
            onClick={() => setPlaying(true)}
            disabled={!id}
            aria-label={id ? `${labels.play}: ${item.title}` : `${item.title} – ${labels.soon}`}
          >
            <img
              src={video.poster || (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '')}
              alt=""
              loading="lazy"
              decoding="async"
            />
            {id ? (
              <span className="video-card__play" aria-hidden="true"><Play size={26} fill="currentColor" /></span>
            ) : (
              <span className="video-card__soon" aria-hidden="true"><Clock size={14} /> {labels.soon}</span>
            )}
          </button>
        )}
      </div>
      <div className="video-card__body">
        <h3 className="video-card__title">{item.title}</h3>
        <p className="video-card__text">{item.text}</p>
      </div>
    </article>
  );
}

export default function Videos() {
  const t = useT();
  return (
    <section id="videos" className="videos" aria-labelledby="videos-heading">
      <div className="container">
        <span className="section-label">{t.videos.label}</span>
        <h2 id="videos-heading" className="section-title">{t.videos.title}</h2>
        <p className="videos__intro">{t.videos.intro}</p>
        <ul className="videos__grid" role="list">
          {t.videos.items.map((item, i) => (
            <ScrollReveal key={i} as="li" delay={i * 80}>
              <VideoCard video={VIDEOS[i] || {}} item={item} labels={t.videos} />
            </ScrollReveal>
          ))}
        </ul>
      </div>
      <style>{`
        .videos { padding: var(--section-padding-y) 0; }
        .videos__intro {
          color: var(--text-secondary);
          margin-bottom: var(--space-2xl);
          max-width: 65ch;
        }
        .videos__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
          gap: var(--space-lg);
        }
        .videos__grid > li { height: 100%; }
        .video-card { height: 100%; padding: 0; overflow: hidden; display: flex; flex-direction: column; }
        .video-card__media {
          position: relative;
          aspect-ratio: 16 / 9;
          background: #0a0f19;
        }
        .video-card__media iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
        .video-card__poster {
          position: absolute;
          inset: 0;
          width: 100%;
          display: block;
          overflow: hidden;
        }
        .video-card__poster:disabled { cursor: default; }
        .video-card__poster img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease, opacity 0.3s ease;
        }
        .video-card__poster::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(5, 10, 18, 0.55));
        }
        .video-card__poster:disabled img { opacity: 0.75; filter: grayscale(0.3); }
        @media (hover: hover) {
          .video-card__poster:not(:disabled):hover img { transform: scale(1.05); }
          .video-card__poster:not(:disabled):hover .video-card__play { transform: translate(-50%, -50%) scale(1.08); }
        }
        .video-card__poster:focus-visible { outline: 3px solid var(--accent-teal); outline-offset: -3px; }
        .video-card__play {
          position: absolute;
          z-index: 1;
          top: 50%;
          left: 50%;
          width: 64px;
          height: 64px;
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
        .video-card__soon {
          position: absolute;
          z-index: 1;
          left: var(--space-md);
          bottom: var(--space-md);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #fff;
          background: rgba(5, 10, 18, 0.7);
          backdrop-filter: blur(4px);
        }
        .video-card__body { padding: var(--space-lg) var(--space-xl) var(--space-xl); }
        .video-card__title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-xs);
        }
        .video-card__text { font-size: var(--text-small); color: var(--text-secondary); line-height: var(--line-relaxed); }
      `}</style>
    </section>
  );
}
