import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translations_en from "./translations/en.json";
import translations_ja from "./translations/ja.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init<{}>({
    detection: {
      order: ["querystring", "navigator"],
    },
    fallbackLng: "en",
    defaultNS: "interface",
    resources: {
      en: translations_en,
      ja: translations_ja,
    },
  });

export default i18n;
