import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { LANGS, useLang } from '../i18n';

const THEME_KEY = 'theme';

function currentTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export default function HeaderControls() {
  const { lang, setLang, t } = useLang();
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a0f19' : '#ffffff');
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* storage unavailable */ }
  }, [theme]);

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    setTheme(isDark ? 'light' : 'dark');
    window.setTimeout(() => root.classList.remove('theme-transition'), 350);
  };

  return (
    <div className="header-controls">
      <div className="header-controls__lang" role="group" aria-label={t.header.langLabel}>
        {LANGS.map((code) => (
          <button
            key={code}
            type="button"
            className={`header-controls__lang-btn ${lang === code ? 'is-active' : ''}`}
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="header-controls__theme"
        onClick={toggleTheme}
        aria-label={isDark ? t.header.themeToLight : t.header.themeToDark}
        title={isDark ? t.header.themeToLight : t.header.themeToDark}
      >
        {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
      </button>
      <style>{`
        .header-controls {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          flex-shrink: 0;
        }
        .header-controls__lang {
          display: inline-flex;
          padding: 3px;
          border-radius: 999px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
        }
        .header-controls__lang-btn {
          min-width: 36px;
          height: 30px;
          padding: 0 var(--space-sm);
          border-radius: 999px;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--text-secondary);
          transition: background var(--transition-fast), color var(--transition-fast);
        }
        .header-controls__lang-btn:hover { color: var(--text-primary); }
        @media (pointer: coarse) {
          .header-controls__lang-btn { height: 36px; min-width: 40px; }
          .header-controls__theme { width: 42px; height: 42px; }
        }
        @media (max-width: 360px) {
          .header-controls { gap: 4px; }
          .header-controls__lang-btn { min-width: 34px; padding: 0 6px; }
          .header-controls__theme { width: 38px; height: 38px; }
        }
        .header-controls__lang-btn.is-active {
          background: var(--bg-card);
          color: var(--text-primary);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
        }
        .header-controls__theme {
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--text-secondary);
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          transition: color var(--transition-fast), border-color var(--transition-fast);
        }
        .header-controls__theme:hover { color: var(--accent-teal); border-color: var(--accent-teal); }
        .header-controls button:focus-visible { outline: 2px solid var(--accent-teal); outline-offset: 2px; }
      `}</style>
    </div>
  );
}
