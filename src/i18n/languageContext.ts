import { createContext } from 'react';
import type { Lang, LocalizedText } from '@/types/marketplace';

export interface LanguageContextValue {
  lang: Lang;
  isRtl: boolean;
  setLang: (lang: Lang) => void;
  t: (en: string, prs: string) => string;
  tx: (text: LocalizedText) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
