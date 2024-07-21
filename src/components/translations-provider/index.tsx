'use client';

import { I18nextProvider } from 'react-i18next';
import initTranslations from '@/i18n';
import { createInstance, Resource } from 'i18next';
import { Locales } from '@/types/enum/locales';
import { ReactNode } from 'react';

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: {
  children: ReactNode;
  locale: Locales;
  namespaces: string[];
  resources: Resource;
}) {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
