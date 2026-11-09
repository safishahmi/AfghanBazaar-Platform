import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Lang, LocalizedText } from '@/types/marketplace';
import { loadStoredValue, saveStoredValue } from '@/lib/storage';
import { LanguageContext, type LanguageContextValue } from './languageContext';

const STORAGE_KEY = 'afghanbazaar-language';

function parseLang(raw: unknown): Lang | null {
  return raw === 'prs' || raw === 'en' ? raw : null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => loadStoredValue(STORAGE_KEY, parseLang, 'prs'));
  const isRtl = lang === 'prs';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = isRtl ? 'fa-AF' : 'en';
  }, [isRtl]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    saveStoredValue(STORAGE_KEY, next);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      isRtl,
      setLang,
      t: (en: string, prs: string) => (lang === 'prs' ? prs : en),
      tx: (text: LocalizedText) => text[lang],
    }),
    [lang, isRtl, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
