/* eslint-disable @typescript-eslint/camelcase */

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  en_US: {
    translation: {
      play: "Play Battle Chess"
    }
  },
  pl_PL: {
    translation: {
      play: "Zagraj w Battle Chess"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain"
      ]
    },
    fallbackLng: "en_US",

    keySeparator: true,

    interpolation: {
      escapeValue: false
    }
  });
export default i18n;
