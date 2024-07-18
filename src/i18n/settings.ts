import { Locales } from "@/types/enum/locales";

export const fallbackLng = Locales.zhHant;
export const languages = [fallbackLng, Locales.enUS];
export const cookieName = 'i18next';
export const defaultNS = "translation";

// lng = 採用的語言, ns = 採用的 name space
export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}