import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import hr from './hr';
import en from './en';

const dictionaries = { hr, en };
export const LANGS = ['hr', 'en'];
const DEFAULT_LANG = 'hr';
const STORAGE_KEY = 'lang';

function readStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return LANGS.includes(stored) ? stored : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

const LangContext = createContext({ lang: DEFAULT_LANG, setLang: () => {}, t: dictionaries[DEFAULT_LANG] });

export function LangProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang);

  useEffect(() => {
    const t = dictionaries[lang];
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* storage unavailable */ }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
export const useT = () => useContext(LangContext).t;
