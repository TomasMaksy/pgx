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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // По умолчанию литовский (совпадает с SSR, чтобы не было гидрации-mismatch).
  const [lang, setLangState] = useState<Lang>("lt");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
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
