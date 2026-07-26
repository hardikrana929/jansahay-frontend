// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

// import enCommon from "./locales/en/common.json";
// import hiCommon from "./locales/hi/common.json";
// import guCommon from "./locales/gu/common.json";

// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: { common: enCommon },
//       hi: { common: hiCommon },
//       gu: { common: guCommon },
//     },
//     fallbackLng: "en",
//     ns: ["common"],
//     defaultNS: "common",
//     interpolation: {
//       escapeValue: false,
//     },
//     detection: {
//       order: ["localStorage", "navigator"],
//       caches: ["localStorage"],
//     },
//   });

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import gu from "./locales/gu.json";

i18n
  // detects the user's language: checks localStorage first,
  // then falls back to the browser's language, then <html lang>
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      gu: { translation: gu },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "hi", "gu"],

    detection: {
      // where to look for a saved language, in order
      order: ["localStorage", "navigator", "htmlTag"],
      // where to persist the user's choice
      caches: ["localStorage"],
      lookupLocalStorage: "jansahay_language",
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;