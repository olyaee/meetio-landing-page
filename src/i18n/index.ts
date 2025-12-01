import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import enPages from './locales/en/pages.json';

const resources = {
  en: {
    common: enCommon,
    pages: enPages,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Force English
    fallbackLng: 'en',
    defaultNS: 'common',

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
