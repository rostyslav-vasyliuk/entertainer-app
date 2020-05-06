import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import engLocale from './translations/en.json';
import ukrLocale from './translations/ua.json';

const resources = {
  en: {
    translation: engLocale
  },
  ua: {
    translation: ukrLocale
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
