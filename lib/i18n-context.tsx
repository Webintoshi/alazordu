'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import tr from '@/messages/tr.json';
import en from '@/messages/en.json';

export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'tr';

const messages = { tr, en };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string | string[] | Record<string, string>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj as unknown);
}

export function I18nProvider({ 
  children, 
  initialLocale = defaultLocale 
}: { 
  children: ReactNode; 
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    // Update URL without page reload
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(tr|en)/, `/${newLocale}`);
    if (currentPath !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  };

  const t = (key: string): string | string[] | Record<string, string> => {
    const value = getNestedValue(messages[locale], key);
    return (value as string | string[] | Record<string, string>) || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Hook for typed translations
export function useTranslations(namespace?: string) {
  const { t, locale } = useI18n();
  
  return {
    t: (key: string): string => {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      const value = t(fullKey);
      return typeof value === 'string' ? value : String(value);
    },
    locale,
  };
}

export function useLocale() {
  const { locale } = useI18n();
  return locale;
}
