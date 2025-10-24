// src/contexts/LanguageContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { translations, DecisionMakerSlug } from '@/lib/translations';

export type Language = 'ru' | 'en';

// Ключи корневого уровня (без секции decisionMakers)
type TranslationKey = Exclude<keyof typeof translations.ru, 'decisionMakers'>;

// Вспомогательный тип для получения типа поля decision maker
type DecisionMakerField<T extends DecisionMakerSlug> = keyof typeof translations.ru.decisionMakers[T];

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  tDecisionMaker: <T extends DecisionMakerSlug>(
    slug: T,
    field: DecisionMakerField<T>
  ) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ru');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language | null;
    if (saved === 'ru' || saved === 'en') {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  const tDecisionMaker = <T extends DecisionMakerSlug>(
    slug: T,
    field: DecisionMakerField<T>
  ): string => {
    // Пытаемся взять на текущем языке
    const currentDecisionMaker = translations[lang].decisionMakers[slug];
    if (currentDecisionMaker && field in currentDecisionMaker) {
      return currentDecisionMaker[field as keyof typeof currentDecisionMaker] as string;
    }

    // Fallback на английский
    const enDecisionMaker = translations['en'].decisionMakers[slug];
    if (enDecisionMaker && field in enDecisionMaker) {
      return enDecisionMaker[field as keyof typeof enDecisionMaker] as string;
    }

    // Fallback на русский
    const ruDecisionMaker = translations['ru'].decisionMakers[slug];
    if (ruDecisionMaker && field in ruDecisionMaker) {
      return ruDecisionMaker[field as keyof typeof ruDecisionMaker] as string;
    }

    return field as string;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tDecisionMaker }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}