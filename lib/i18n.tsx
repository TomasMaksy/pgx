"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { LT } from "./translations";

export type Lang = "lt" | "en";

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string) => string;
};

const I18nContext = createContext<I18nCtx | null>(null);

const STORAGE_KEY = "genolink-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // По умолчанию литовский (совпадает с SSR, чтобы не было гидрации-mismatch).
  const [lang, setLangState] = useState<Lang>("lt");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "lt") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const t = useCallback(
    (en: string) => (lang === "lt" ? (LT[en] ?? en) : en),
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nCtx {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return { lang: "en", setLang: () => {}, t: (s: string) => s };
  }
  return ctx;
}
