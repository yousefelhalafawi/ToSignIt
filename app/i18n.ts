import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslation from "./_localization/en.json";
import frTranslation from "./_localization/fr.json";

i18n
  .use(LanguageDetector) // Detects language from localStorage (and other sources)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
    },
    detection: {
      // Order and from where user language should be detected
      order: ["localStorage", "navigator"],
      // Keys or params to lookup language from
      lookupLocalStorage: "i18nextLng",
      // Cache user language on
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    // Removed the 'lng' option to allow language detection
  });

export default i18n;
